var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericCertCard } from '../../Card';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { RequestHandler } from '../../../../util/RequestHandler';
var Idemia_Ias_Ecc = (function (_super) {
    __extends(Idemia_Ias_Ecc, _super);
    function Idemia_Ias_Ecc(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Idemia_Ias_Ecc.CONTAINER_PREFIX) || this;
    }
    Idemia_Ias_Ecc.prototype.allDataFilters = function () {
        return ['root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Idemia_Ias_Ecc.prototype.allCertFilters = function () {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    Idemia_Ias_Ecc.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    Idemia_Ias_Ecc.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    };
    Idemia_Ias_Ecc.prototype.issuerCertificate = function (options, callback) {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    };
    Idemia_Ias_Ecc.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    };
    Idemia_Ias_Ecc.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    };
    Idemia_Ias_Ecc.prototype.encryptionCertificate = function (options, callback) {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    };
    Idemia_Ias_Ecc.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Idemia_Ias_Ecc.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    Idemia_Ias_Ecc.prototype.verifyPinWithEncryptedPin = function (body, callback) {
        var _this = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(Idemia_Ias_Ecc.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    Idemia_Ias_Ecc.CONTAINER_PREFIX = 'idemia_ias_ecc';
    return Idemia_Ias_Ecc;
}(GenericCertCard));
export { Idemia_Ias_Ecc };
//# sourceMappingURL=Idemia_Ias_Ecc.js.map