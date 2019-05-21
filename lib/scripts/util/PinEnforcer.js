"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = require("../core/client/Connection");
var jsencrypt_1 = require("jsencrypt");
var PubKeyService_1 = require("./PubKeyService");
var CoreExceptions_1 = require("../core/exceptions/CoreExceptions");
var CORE_READERS = '/card-readers';
var PinEnforcer = (function () {
    function PinEnforcer() {
    }
    PinEnforcer.check = function (connection, readerId, body) {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, body).then(function () {
            return PinEnforcer.updateBodyWithEncryptedPin(body);
        });
    };
    PinEnforcer.checkAlreadyEncryptedPin = function (connection, readerId, body) {
        return PinEnforcer.doPinCheck(connection.cfg, readerId, body);
    };
    PinEnforcer.encryptPin = function (pin) {
        if (pin && pin.length) {
            var pubKey = PubKeyService_1.PubKeyService.getPubKey();
            var crypt = new jsencrypt_1.JSEncrypt();
            crypt.setKey(pubKey);
            return crypt.encrypt(pin);
        }
        else {
            return undefined;
        }
    };
    PinEnforcer.doPinCheck = function (cfg, readerId, body) {
        return new Promise(function (resolve, reject) {
            var connection = new Connection_1.LocalAuthConnection(cfg);
            body.os_dialog = connection.cfg.osPinDialog;
            connection.get(connection.cfg.gclUrl, CORE_READERS + '/' + readerId, undefined).then(function (reader) {
                body.pinpad = reader.data.pinpad || false;
                if (connection.cfg.forceHardwarePinpad) {
                    if (body.pinpad) {
                        if (body.pin) {
                            reject({
                                data: new CoreExceptions_1.T1CLibException(400, '600', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent with a PIN,' +
                                    ' but the reader has a pinpad.'), success: false
                            });
                        }
                        else {
                            resolve();
                        }
                    }
                    else {
                        if (!body.pin && !body.os_dialog) {
                            reject({
                                data: new CoreExceptions_1.T1CLibException(400, '601', 'Strict pinpad enforcement is enabled.' +
                                    ' This request was sent without a PIN,' +
                                    ' but the reader does not have a pinpad and' +
                                    ' OS PIN dialog is not enabled.'), success: false
                            });
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
exports.PinEnforcer = PinEnforcer;
var EncryptedOptionalPin = (function () {
    function EncryptedOptionalPin(os_dialog, pinpad, pin, pace) {
        this.os_dialog = os_dialog;
        this.pinpad = pinpad;
        this.pin = pin;
        this.pace = pace;
    }
    return EncryptedOptionalPin;
}());
exports.EncryptedOptionalPin = EncryptedOptionalPin;
//# sourceMappingURL=PinEnforcer.js.map