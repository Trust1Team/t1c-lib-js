import { LocalAuthConnection } from '../core/client/Connection';
import { JSEncrypt } from 'jsencrypt';
import { PubKeyService } from './PubKeyService';
import { RestException } from '../core/exceptions/CoreExceptions';
var CORE_READERS = '/card-readers';
var PinEnforcer = (function () {
    function PinEnforcer() {
    }
    PinEnforcer.check = function (connection, readerId, body) {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, body).then(function () {
            return PinEnforcer.updateBodyWithEncryptedPin(body);
        });
    };
    PinEnforcer.checkAlreadyEncryptedPin = function (connection, readerId, pin) {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, { pin: pin });
    };
    PinEnforcer.encryptPin = function (pin) {
        if (pin && pin.length) {
            var pubKey = PubKeyService.getPubKey();
            var crypt = new JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.encrypt(pin);
        }
        else {
            return undefined;
        }
    };
    PinEnforcer.doPinCheck = function (cfg, readerId, body) {
        return new Promise(function (resolve, reject) {
            var connection = new LocalAuthConnection(cfg);
            body.os_dialog = connection.cfg.osPinDialog;
            connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(function (reader) {
                body.pinpad = reader.data.pinpad || false;
                if (connection.cfg.forceHardwarePinpad) {
                    if (body.pinpad) {
                        if (body.pin) {
                            reject({ data: new RestException(400, '600', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent with a PIN,' +
                                    ' but the reader has a pinpad.'), success: false });
                        }
                        else {
                            resolve();
                        }
                    }
                    else {
                        if (!body.pin && !body.os_dialog) {
                            reject({ data: new RestException(400, '601', 'Strict pinpad enforcement is enabled.' +
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
            }, function (error) {
                reject(error);
            });
        });
    };
    PinEnforcer.updateBodyWithEncryptedPin = function (body) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        return body;
    };
    return PinEnforcer;
}());
export { PinEnforcer };
var EncryptedOptionalPin = (function () {
    function EncryptedOptionalPin(os_dialog, pinpad, pin, pace) {
        this.os_dialog = os_dialog;
        this.pinpad = pinpad;
        this.pin = pin;
        this.pace = pace;
    }
    return EncryptedOptionalPin;
}());
export { EncryptedOptionalPin };
//# sourceMappingURL=PinEnforcer.js.map