var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericCertCard } from '../../Card';
import { PinType } from './EidLuxModel';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { CertParser } from '../../../../util/CertParser';
import { ResponseHandler } from '../../../../util/ResponseHandler';
import { RequestHandler } from '../../../../util/RequestHandler';
var EidLux = (function (_super) {
    __extends(EidLux, _super);
    function EidLux(baseUrl, containerUrl, connection, reader_id, pin, pinType, isEncrypted) {
        if (isEncrypted === void 0) { isEncrypted = false; }
        var _this = _super.call(this, baseUrl, containerUrl, connection, reader_id, EidLux.CONTAINER_PREFIX) || this;
        _this.baseUrl = baseUrl;
        _this.containerUrl = containerUrl;
        _this.connection = connection;
        _this.reader_id = reader_id;
        _this.pin = pin;
        _this.pinType = pinType;
        _this.isEncrypted = isEncrypted;
        if (!pinType) {
            _this.pinType = PinType.PIN;
        }
        _this.pin = (isEncrypted) ? pin : PinEnforcer.encryptPin(pin);
        return _this;
    }
    EidLux.EncryptedHeader = function (code, pinType) {
        if (pinType === PinType.CAN) {
            return { 'X-Encrypted-Can': code === undefined ? '' : code };
        }
        else {
            return { 'X-Encrypted-Pin': code === undefined ? '' : code };
        }
    };
    EidLux.prototype.allDataFilters = function () {
        return ['authentication-certificate', 'biometric', 'non-repudiation-certificate', 'picture', 'root-certificates'];
    };
    EidLux.prototype.allCertFilters = function () {
        return ['authentication-certificate', 'non-repudiation-certificate', 'root-certificates'];
    };
    EidLux.prototype.allData = function (options, callback) {
        var reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), reqOptions.params, EidLux.EncryptedHeader(this.pin, this.pinType)).then(function (data) {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler.error(err, callback);
        });
    };
    EidLux.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.ALL_CERTIFICATES), reqOptions.params, EidLux.EncryptedHeader(this.pin, this.pinType)).then(function (data) {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler.error(err, callback);
        });
    };
    EidLux.prototype.biometric = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.BIOMETRIC), undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.picture = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.PHOTO), undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.rootCertificate = function (options, callback) {
        return this.getCertificateArray(EidLux.CERT_ROOT, RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    };
    EidLux.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    };
    EidLux.prototype.nonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    };
    EidLux.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedHeader(_this.pin, _this.pinType), callback);
        });
    };
    EidLux.prototype.verifyPinWithEncryptedPin = function (body, callback) {
        var _this = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedHeader(_this.pin, _this.pinType), callback);
        });
    };
    EidLux.prototype.signData = function (body, callback) {
        var _this = this;
        return PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedHeader(_this.pin, _this.pinType), callback);
        });
    };
    EidLux.prototype.signDataWithEncryptedPin = function (body, callback) {
        var _this = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedHeader(_this.pin, _this.pinType), callback);
        });
    };
    EidLux.prototype.authenticate = function (body, callback) {
        var _this = this;
        return PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedHeader(_this.pin, _this.pinType), callback);
        });
    };
    EidLux.prototype.authenticateWithEncryptedPin = function (body, callback) {
        var _this = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedHeader(_this.pin, _this.pinType), callback);
        });
    };
    EidLux.prototype.signatureImage = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.SIGNATURE_IMAGE), undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.pinTryCounter = function (pin_reference, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_TRY_COUNTER), pin_reference, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.pinReset = function (body, callback) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        body.puk = PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.pinChange = function (body, callback) {
        body.old_pin = PinEnforcer.encryptPin(body.old_pin);
        body.new_pin = PinEnforcer.encryptPin(body.new_pin);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_CHANGE), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.pinUnblock = function (body, callback) {
        body.puk = PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    };
    EidLux.prototype.getCertificate = function (certUrl, options, params, headers) {
        var self = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, { pin: this.pin }).then(function () {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params, headers).then(function (certData) {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, function (err) {
                return ResponseHandler.error(err, options.callback);
            });
        });
    };
    EidLux.prototype.getCertificateArray = function (certUrl, options, params, headers) {
        var self = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, { pin: this.pin }).then(function () {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params, headers).then(function (certData) {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, function (err) {
                return ResponseHandler.error(err, options.callback);
            });
        });
    };
    EidLux.CONTAINER_PREFIX = 'luxeid';
    EidLux.BIOMETRIC = '/biometric';
    EidLux.ADDRESS = '/address';
    EidLux.PHOTO = '/picture';
    EidLux.SIGNATURE_IMAGE = '/signature-image';
    EidLux.PIN_CHANGE = '/change-pin';
    EidLux.PIN_RESET = '/reset-pin';
    EidLux.PIN_TRY_COUNTER = '/pin-try-counter';
    return EidLux;
}(GenericCertCard));
export { EidLux };
//# sourceMappingURL=EidLux.js.map