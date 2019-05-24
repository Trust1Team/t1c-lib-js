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
import { RequestHandler } from '../../../..';
import { GenericCertCard } from '../Card';
var Isabel = (function (_super) {
    __extends(Isabel, _super);
    function Isabel(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Isabel.CONTAINER_PREFIX) || this;
    }
    Isabel.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(Isabel.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    };
    Isabel.prototype.intermediateCertificate = function (options, callback) {
        return this.getCertificate(Isabel.CERT_INTERMEDIATE, RequestHandler.determineOptions(options, callback));
    };
    Isabel.prototype.nonRepudiationCertificate = function (options, callback) {
        return this.getCertificate(Isabel.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    };
    Isabel.prototype.verifyPin = function (body, callback) {
        return _super.prototype.verifyPin.call(this, body, callback);
    };
    Isabel.prototype.signData = function (body, callback) {
        return _super.prototype.signData.call(this, body, callback);
    };
    Isabel.prototype.authenticate = function (body, callback) {
        return _super.prototype.authenticate.call(this, body, callback);
    };
    Isabel.CONTAINER_PREFIX = 'isabel';
    Isabel.VERIFY_PRIV_KEY_REF = 'non-repudiation';
    Isabel.CERT_INTERMEDIATE = '/intermediate';
    return Isabel;
}(GenericCertCard));
export { Isabel };
//# sourceMappingURL=Isabel.js.map