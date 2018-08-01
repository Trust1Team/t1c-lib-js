"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("../core/client/Connection");
const jsencrypt_1 = require("jsencrypt");
const PubKeyService_1 = require("./PubKeyService");
const CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
const CORE_READERS = '/card-readers';
class PinEnforcer {
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
            let pubKey = PubKeyService_1.PubKeyService.getPubKey();
            let crypt = new jsencrypt_1.JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.encrypt(pin);
        }
        else {
            return undefined;
        }
    }
    static doPinCheck(cfg, readerId, body) {
        return new Promise((resolve, reject) => {
            let connection = new Connection_1.LocalAuthConnection(cfg);
            body.os_dialog = connection.cfg.osPinDialog;
            connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(reader => {
                body.pinpad = reader.data.pinpad || false;
                if (connection.cfg.forceHardwarePinpad) {
                    if (body.pinpad) {
                        if (body.pin) {
                            reject({ data: new CoreExceptions_1.T1CLibException(400, '600', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent with a PIN,' +
                                    ' but the reader has a pinpad.'), success: false });
                        }
                        else {
                            resolve();
                        }
                    }
                    else {
                        if (!body.pin && !body.os_dialog) {
                            reject({ data: new CoreExceptions_1.T1CLibException(400, '601', 'Strict pinpad enforcement is enabled.' +
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
exports.PinEnforcer = PinEnforcer;
class EncryptedOptionalPin {
    constructor(os_dialog, pinpad, pin, pace) {
        this.os_dialog = os_dialog;
        this.pinpad = pinpad;
        this.pin = pin;
        this.pace = pace;
    }
}
exports.EncryptedOptionalPin = EncryptedOptionalPin;
//# sourceMappingURL=PinEnforcer.js.map