/**
 * @author Maarten Somers
 */
import { GenericConnection } from '../core/client/Connection';
import { Promise } from 'es6-promise';
import { JSEncrypt} from 'jsencrypt';
import { PubKeyService } from './PubKeyService';

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

    private static doPinCheck(connection: GenericConnection, readerId: string, body: { pin?: string, showDialog?: boolean }) {
        // if forceHardwarePinpad enabled,
        return new Promise((resolve, reject) => {
            if (connection.cfg.forceHardwarePinpad) {
                // check if reader has pinpad
                connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(reader => {
                    if (reader.data.pinpad) {
                        // if true, check that no pin was sent
                        if (body.pin) {
                            reject({ data: { message: 'Strict pinpad enforcement is enabled. This request was sent with a PIN, but the' +
                                                      ' reader has a pinpad.' } });
                        } else { resolve(); }
                    } else {
                        // non-pinpad reader, check if we need to trigger an OS pin dialog
                        if (connection.cfg.osPinDialog) {
                            body.showDialog = true;
                        }
                        // check if a pin was sent
                        if (!body.pin) {
                            reject({ data: { message: 'Strict pinpad enforcement is enabled. This request was sent without a PIN, but the' +
                                                      ' reader does not have a pinpad.'} });
                        } else { resolve(); }
                    }
                }, error => {
                    reject(error);
                });
            } else { resolve(); }
        });
    }

    private static updateBodyWithEncryptedPin(body: { pin?: string }) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        return body;
    }
}
