/**
 * @author Maarten Somers
 */
import { GenericConnection } from '../core/client/Connection';
import { Promise } from 'es6-promise';
import { JSEncrypt} from 'jsencrypt';
import { PubKeyService } from './PubKeyService';
import { RestException } from '../core/exceptions/CoreExceptions';

export { PinEnforcer };

const CORE_READERS = '/card-readers';

class PinEnforcer {

    // TODO figure out how to use generics to return a promise with correct type
    public static check(connection: GenericConnection,
                        readerId: string,
                        body: { pin?: string }): Promise<any> {
        return PinEnforcer.doPinCheck(connection, readerId, body).then(() => {
            return PinEnforcer.updateBodyWithEncryptedPin(body);
        });
    }

    public static checkAlreadyEncryptedPin(connection: GenericConnection,
                                           readerId: string,
                                           pin: string): Promise<any> {
        return PinEnforcer.doPinCheck(connection, readerId, { pin });
    }


    public static encryptPin(pin: string): string {
        if (pin && pin.length) {
            let pubKey = PubKeyService.getPubKey();
            // encrypt pin with pubkey
            let crypt = new JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.encrypt(pin);
        } else { return undefined; }
    }

    private static doPinCheck(connection: GenericConnection, readerId: string,
                              body: { pin?: string, pinpad?: boolean, os_dialog?: boolean }) {
        // if forceHardwarePinpad enabled,
        return new Promise((resolve, reject) => {
            body.os_dialog = connection.cfg.osPinDialog;
            connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(reader => {
                body.pinpad = reader.data.pinpad;

                // check if we need to force HW pinpad
                if (connection.cfg.forceHardwarePinpad) {
                    // need to force hw
                    if (body.pinpad) {
                        // if true, check that no pin was sent
                        if (body.pin) {
                            reject({ data: new RestException(400, '600', 'Strict pinpad enforcement is enabled.' +
                                                              ' This request was sent with a PIN,' +
                                                                         ' but the reader has a pinpad.' ), success: false });
                        } else { resolve(); }
                    } else {
                        // check if a pin was sent, or if we are using OS pin dialog
                        if (!body.pin && !body.os_dialog) {
                            reject({ data: new RestException(400, '601', 'Strict pinpad enforcement is enabled.' +
                                                              ' This request was sent without a PIN,' +
                                                              ' but the reader does not have a pinpad and' +
                                                                         ' OS PIN dialog is not enabled.'), success: false });
                        } else { resolve(); }
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
