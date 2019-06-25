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
var BELAWYER_CERTIFICATE_ROOT = '/certificates/root';
var BELAWYER_CERTIFICATE_SIGN = '/certificates/signing';
var BELAWYER_CERTIFICATE_ISSUER = '/certificates/issuer';
var BELAWYER_CERTIFICATE_AUTHENTICATION = '/certificates/authentication';
var BELAWYER_CERTIFICATE_ALL = '/certificates';
var BELAWYER_PHOTO = '/photo';
var BELAWYER_PERSONAL_INFO = '/personal-info';
var BeLawyer = (function (_super) {
    __extends(BeLawyer, _super);
    function BeLawyer(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, BeLawyer.CONTAINER_PREFIX) || this;
    }
    BeLawyer.prototype.authenticationCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_AUTHENTICATION), undefined, undefined, callback);
    };
    BeLawyer.prototype.signingCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_SIGN), undefined, undefined, callback);
    };
    BeLawyer.prototype.issuerCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ISSUER), undefined, undefined, callback);
    };
    BeLawyer.prototype.rootCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ROOT), undefined, undefined, callback);
    };
    BeLawyer.prototype.allCerts = function (filters, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ALL), undefined, undefined, callback);
    };
    BeLawyer.prototype.personalInfo = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_PERSONAL_INFO), undefined, undefined, callback);
    };
    BeLawyer.prototype.photo = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_PHOTO), undefined, undefined, callback);
    };
    BeLawyer.CONTAINER_PREFIX = 'diplad';
    return BeLawyer;
}(GenericCertCard));
export { BeLawyer };
//# sourceMappingURL=BeLawyer.js.map