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
var RequestHandler_1 = require("../../../../util/RequestHandler");
var Oberthur = (function (_super) {
    __extends(Oberthur, _super);
    function Oberthur(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Oberthur.CONTAINER_PREFIX) || this;
    }
    Oberthur.prototype.allDataFilters = function () {
        return ['root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Oberthur.prototype.allCertFilters = function () {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Oberthur.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Oberthur.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(Oberthur.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Oberthur.prototype.issuerCertificate = function (options, callback) {
        return this.getCertificate(Oberthur.CERT_ISSUER, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Oberthur.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Oberthur.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(Oberthur.CERT_SIGNING, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Oberthur.prototype.encryptionCertificate = function (options, callback) {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Oberthur.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    Oberthur.prototype.verifyPinWithEncryptedPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    Oberthur.CONTAINER_PREFIX = 'oberthur';
    return Oberthur;
}(Card_1.GenericCertCard));
exports.Oberthur = Oberthur;
//# sourceMappingURL=Oberthur.js.map