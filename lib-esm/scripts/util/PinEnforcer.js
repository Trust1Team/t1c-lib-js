import { LocalAuthConnection } from '../core/client/Connection';
import { JSEncrypt } from 'jsencrypt';
import { PubKeyService } from './PubKeyService';
import { T1CLibException } from '../core/exceptions/CoreExceptions';
const CORE_READERS = '/card-readers';
export class PinEnforcer {
    static check(connection, readerId, body) {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, body).then(() => {
            return PinEnforcer.updateBodyWithEncryptedPin(body);
        });
    }
    static checkAlreadyEncryptedPin(connection, readerId, pin) {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, { pin });
    }
    static encryptPin(pin) {
        if (pin && pin.length) {
            let pubKey = PubKeyService.getPubKey();
            let crypt = new JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.encrypt(pin);
        }
        else {
            return undefined;
        }
    }
    static doPinCheck(cfg, readerId, body) {
        return new Promise((resolve, reject) => {
            let connection = new LocalAuthConnection(cfg);
            body.os_dialog = connection.cfg.osPinDialog;
            connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(reader => {
                body.pinpad = reader.data.pinpad || false;
                if (connection.cfg.forceHardwarePinpad) {
                    if (body.pinpad) {
                        if (body.pin) {
                            reject({ data: new T1CLibException(400, '600', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent with a PIN,' +
                                    ' but the reader has a pinpad.'), success: false });
                        }
                        else {
                            resolve();
                        }
                    }
                    else {
                        if (!body.pin && !body.os_dialog) {
                            reject({ data: new T1CLibException(400, '601', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent without a PIN,' +
                                    ' but the reader does not have a pinpad and' +
                                    ' OS PIN dialog is not enabled.'), success: false });
                        }
                        else {
                            resolve();
                        }
                    }
                }
                else {
                    resolve();
                }
            }, error => {
                reject(error);
            });
        });
    }
    static updateBodyWithEncryptedPin(body) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        return body;
    }
}
export class EncryptedOptionalPin {
    constructor(os_dialog, pinpad, pin, pace) {
        this.os_dialog = os_dialog;
        this.pinpad = pinpad;
        this.pin = pin;
        this.pace = pace;
    }
}
//# sourceMappingURL=PinEnforcer.js.map