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
import { RequestHandler } from '../../../../util/RequestHandler';
var LuxTrust = (function (_super) {
    __extends(LuxTrust, _super);
    function LuxTrust() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LuxTrust.prototype.activated = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(LuxTrust.ACTIVATED), undefined, undefined, callback);
    };
    LuxTrust.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    };
    LuxTrust.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    };
    LuxTrust.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    };
    LuxTrust.ACTIVATED = '/activated';
    return LuxTrust;
}(GenericCertCard));
export { LuxTrust };
//# sourceMappingURL=LuxTrust.js.map