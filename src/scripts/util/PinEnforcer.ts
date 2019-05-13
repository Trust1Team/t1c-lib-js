/**
 * @author Maarten Somers
 */
import {GenericConnection, LocalAuthConnection} from '../core/client/Connection';
import {JSEncrypt} from 'jsencrypt';
import {PubKeyService} from './PubKeyService';
import {T1CLibException} from '../core/exceptions/CoreExceptions';
import {GCLConfig} from '../core/GCLConfig';

const CORE_READERS = '/card-readers';

export class PinEnforcer {

    // TODO figure out how to use generics to return a Promise with correct type
    public static check(connection: GenericConnection,
                        readerId: string,
                        body: { pin?: string }): Promise<any> {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, body).then(() => {
            return PinEnforcer.updateBodyWithEncryptedPin(body);
        });
    }

    public static checkAlreadyEncryptedPin(connection: GenericConnection,
                                           readerId: string,
                                           body: { pin?: string }): Promise<any> {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, body);
    }


    public static encryptPin(pin: string): string {
        if (pin && pin.length) {
            let pubKey = PubKeyService.getPubKey();
            // encrypt pin with pubkey
            let crypt = new JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.encrypt(pin);
        } else {
            return '';
        }
    }

    private static doPinCheck(cfg: GCLConfig, readerId: string,
                              body: EncryptedOptionalPin) {
        // if forceHardwarePinpad enabled,
        return new Promise((resolve, reject) => {
            let connection = new LocalAuthConnection(cfg);
            body.os_dialog = connection.cfg.osPinDialog;
            // console.log('body', body);
            connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(reader => {
                body.pinpad = reader.data.pinpad || false;
                // console.log('body', body);
                // console.log('reader', reader);

                // check if we need to force HW pinpad
                if (connection.cfg.forceHardwarePinpad) {
                    // need to force hw
                    if (body.pinpad) {
                        // if true, check that no pin was sent
                        if (body.pin) {
                            reject({
                                data: new T1CLibException(400, '600', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent with a PIN,' +
                                    ' but the reader has a pinpad.'), success: false
                            });
                        } else {
                            resolve();
                        }
                    } else {
                        // check if a pin was sent, or if we are using OS pin dialog
                        if (!body.pin && !body.os_dialog) {
                            reject({
                                data: new T1CLibException(400, '601', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent without a PIN,' +
                                    ' but the reader does not have a pinpad and' +
                                    ' OS PIN dialog is not enabled.'), success: false
                            });
                        } else {
                            resolve();
                        }
                    }
                } else {
                    // don't force, can resolve now
                    resolve();
                }
            }, error => {
                reject(error);
            });
        });
    }

    private static updateBodyWithEncryptedPin(body: { pin?: string }) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        return body;
    }
}

export class EncryptedOptionalPin {
    constructor(public os_dialog?: boolean, public pinpad?: boolean, public pin?: string, public pace?: string) {
    }
}
