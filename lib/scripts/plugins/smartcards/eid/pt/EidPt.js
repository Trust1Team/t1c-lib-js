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
var RequestHandler_1 = require("../../../../util/RequestHandler");
var __1 = require("../../../../..");
var EidPt = (function (_super) {
    __extends(EidPt, _super);
    function EidPt(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, EidPt.CONTAINER_PREFIX) || this;
    }
    EidPt.prototype.idData = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), undefined, undefined, callback);
    };
    EidPt.prototype.idDataWithOutPhoto = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), { photo: 'false' }, undefined, callback);
    };
    EidPt.prototype.address = function (data, callback) {
        var _this = this;
        return __1.PinEnforcer.check(this.connection, this.reader_id, data).then(function () {
            var encryptedBody = Object.assign({ private_key_reference: EidPt.VERIFY_PRIV_KEY_REF }, data);
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidPt.ADDRESS), encryptedBody, undefined, undefined, callback);
        });
    };
    EidPt.prototype.addressWithEncryptedPin = function (data, callback) {
        var _this = this;
        return __1.PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, data).then(function () {
            var encryptedBody = Object.assign({ private_key_reference: EidPt.VERIFY_PRIV_KEY_REF }, data);
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(EidPt.ADDRESS), encryptedBody, undefined, undefined, callback);
        });
    };
    EidPt.prototype.photo = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.PHOTO), undefined, undefined, callback);
    };
    EidPt.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(EidPt.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidPt.prototype.rootAuthenticationCertificate = function (options, callback) {
        return this.getCertificate(EidPt.CERT_ROOT_AUTH, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidPt.prototype.rootNonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(EidPt.CERT_ROOT_NON_REP, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidPt.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(EidPt.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidPt.prototype.nonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(EidPt.CERT_NON_REPUDIATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    EidPt.CONTAINER_PREFIX = 'pteid';
    EidPt.ADDRESS = '/address';
    EidPt.CERT_ROOT_AUTH = '/root-authentication';
    EidPt.CERT_ROOT_NON_REP = '/root-non-repudiation';
    EidPt.ID_DATA = '/id';
    EidPt.PHOTO = '/photo';
    EidPt.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    return EidPt;
}(Card_1.GenericCertCard));
exports.EidPt = EidPt;
//# sourceMappingURL=EidPt.js.map