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
var Aventra = (function (_super) {
    __extends(Aventra, _super);
    function Aventra(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Aventra.CONTAINER_PREFIX) || this;
    }
    Aventra.prototype.allDataFilters = function () {
        return ['applet-info', 'root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Aventra.prototype.allCertFilters = function () {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Aventra.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Aventra.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.issuerCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_ISSUER, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_SIGNING, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.encryptionCertificate = function (options, callback) {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    Aventra.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    Aventra.prototype.resetPin = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Aventra.RESET_PIN), body, undefined, undefined, callback);
    };
    Aventra.CONTAINER_PREFIX = 'aventra';
    Aventra.DEFAULT_VERIFY_PIN = 'sign';
    Aventra.RESET_PIN = '/reset-pin';
    return Aventra;
}(Card_1.GenericCertCard));
exports.Aventra = Aventra;
//# sourceMappingURL=Aventra.js.map