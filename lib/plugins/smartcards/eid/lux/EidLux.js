"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../../Card");
var PinEnforcer_1 = require("../../../../util/PinEnforcer");
var CertParser_1 = require("../../../../util/CertParser");
var ResponseHandler_1 = require("../../../../util/ResponseHandler");
var RequestHandler_1 = require("../../../../util/RequestHandler");
var EidLux = (function (_super) {
    __extends(EidLux, _super);
    function EidLux(baseUrl, containerUrl, connection, reader_id, can) {
        var _this = _super.call(this, baseUrl, containerUrl, connection, reader_id) || this;
        _this.baseUrl = baseUrl;
        _this.containerUrl = containerUrl;
        _this.connection = connection;
        _this.reader_id = reader_id;
        _this.can = can;
        _this.can = PinEnforcer_1.PinEnforcer.encryptPin(can);
        return _this;
    }
    EidLux.EncryptedPinHeader = function (pin) {
        return { 'X-Encrypted-Pin': pin };
    };
    EidLux.EncryptedCanHeader = function (can) {
        return { 'X-Encrypted-Can': can };
    };
    EidLux.prototype.allDataFilters = function () {
        return ['authentication-certificate', 'biometric', 'non-repudiation-certificate', 'picture', 'root-certificates'];
    };
    EidLux.prototype.allCertFilters = function () {
        return ['authentication-certificate', 'non-repudiation-certificate', 'root-certificates'];
    };
    EidLux.prototype.allData = function (options, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), reqOptions.params, EidLux.EncryptedCanHeader(this.can)).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    EidLux.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.ALL_CERTIFICATES), reqOptions.params, EidLux.EncryptedCanHeader(this.can)).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    EidLux.prototype.biometric = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.BIOMETRIC), undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.picture = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.PHOTO), undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.rootCertificate = function (options, callback) {
        return this.getCertificateArray(EidLux.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedCanHeader(this.can));
    };
    EidLux.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedCanHeader(this.can));
    };
    EidLux.prototype.nonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION, RequestHandler_1.RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedCanHeader(this.can));
    };
    EidLux.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedCanHeader(_this.can), callback);
        });
    };
    EidLux.prototype.signData = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedCanHeader(_this.can), callback);
        });
    };
    EidLux.prototype.authenticate = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedCanHeader(_this.can), callback);
        });
    };
    EidLux.prototype.signatureImage = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.SIGNATURE_IMAGE), undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.pinTryCounter = function (pin_reference, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_TRY_COUNTER), pin_reference, undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.pinReset = function (body, callback) {
        body.pin = PinEnforcer_1.PinEnforcer.encryptPin(body.pin);
        body.puk = PinEnforcer_1.PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.pinChange = function (body, callback) {
        body.old_pin = PinEnforcer_1.PinEnforcer.encryptPin(body.old_pin);
        body.new_pin = PinEnforcer_1.PinEnforcer.encryptPin(body.new_pin);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_CHANGE), body, undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.pinUnblock = function (body, callback) {
        body.puk = PinEnforcer_1.PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedCanHeader(this.can), callback);
    };
    EidLux.prototype.getCertificate = function (certUrl, options, params, headers) {
        var self = this;
        return PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, this.can).then(function () {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params, headers).then(function (certData) {
                return CertParser_1.CertParser.process(certData, options.parseCerts, options.callback);
            }, function (err) { return ResponseHandler_1.ResponseHandler.error(err, options.callback); });
        });
    };
    EidLux.prototype.getCertificateArray = function (certUrl, options, params, headers) {
        var self = this;
        return PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, this.can).then(function () {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params, headers).then(function (certData) {
                return CertParser_1.CertParser.process(certData, options.parseCerts, options.callback);
            }, function (err) { return ResponseHandler_1.ResponseHandler.error(err, options.callback); });
        });
    };
    EidLux.BIOMETRIC = '/biometric';
    EidLux.ADDRESS = '/address';
    EidLux.PHOTO = '/picture';
    EidLux.SIGNATURE_IMAGE = '/signature-image';
    EidLux.PIN_CHANGE = '/change-pin';
    EidLux.PIN_RESET = '/reset-pin';
    EidLux.PIN_TRY_COUNTER = '/pin-try-counter';
    return EidLux;
}(Card_1.GenericCertCard));
exports.EidLux = EidLux;
//# sourceMappingURL=EidLux.js.map