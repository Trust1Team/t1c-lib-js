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
import { GenericSecuredCertCard } from '../../Card';
import { RequestHandler } from '../../../../util/RequestHandler';
import { CertParser } from '../../../../util/CertParser';
import { ResponseHandler } from '../../../../util/ResponseHandler';
var DNIe = (function (_super) {
    __extends(DNIe, _super);
    function DNIe(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, DNIe.CONTAINER_PREFIX) || this;
    }
    DNIe.prototype.info = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(DNIe.INFO), undefined, undefined, callback);
    };
    DNIe.prototype.intermediateCertificate = function (options, callback) {
        var reqOptions = RequestHandler.determineOptions(options, callback);
        var self = this;
        return self.connection.get(self.baseUrl, self.containerSuffix(DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE), undefined).then(function (data) {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, function (err) {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    };
    DNIe.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, {}, RequestHandler.determineOptions(options, callback));
    };
    DNIe.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(DNIe.CERT_SIGNING, {}, RequestHandler.determineOptions(options, callback));
    };
    DNIe.CONTAINER_PREFIX = 'dnie';
    DNIe.INFO = '/info';
    DNIe.CERT_INTERMEDIATE = '/intermediate';
    return DNIe;
}(GenericSecuredCertCard));
export { DNIe };
//# sourceMappingURL=dnie.js.map