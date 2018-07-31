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
import { GenericSecuredCertCard } from '../Card';
import { PinEnforcer } from '../../../util/PinEnforcer';
import { RequestHandler } from '../../../util/RequestHandler';
var PIV = (function (_super) {
    __extends(PIV, _super);
    function PIV(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, PIV.CONTAINER_PREFIX) || this;
    }
    PIV.prototype.allDataFilters = function () {
        return ['applet-info', 'root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    };
    PIV.prototype.allCertFilters = function () {
        return ['authentication-certificate', 'signing_certificate'];
    };
    PIV.prototype.allKeyRefs = function () {
        return ['authenticate', 'sign', 'encrypt'];
    };
    PIV.prototype.printedInformation = function (body, callback) {
        var _this = this;
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
                return _this.connection.post(_this.baseUrl, _this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined, undefined, callback);
            }, function (error) {
                return callback(error, null);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                PinEnforcer.check(_this.connection, _this.reader_id, body).then(function () {
                    resolve(_this.connection.post(_this.baseUrl, _this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined));
                }, function (error) { reject(error); });
            });
        }
    };
    PIV.prototype.facialImage = function (body, callback) {
        var _this = this;
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
                return _this.connection.post(_this.baseUrl, _this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined, undefined, callback);
            }, function (error) {
                return callback(error, null);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                PinEnforcer.check(_this.connection, _this.reader_id, body).then(function () {
                    resolve(_this.connection.post(_this.baseUrl, _this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined));
                }, function (error) { reject(error); });
            });
        }
    };
    PIV.prototype.authenticationCertificate = function (body, options, callback) {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, RequestHandler.determineOptions(options, callback), undefined);
    };
    PIV.prototype.signingCertificate = function (body, options, callback) {
        return this.getCertificate(PIV.CERT_SIGNING, body, RequestHandler.determineOptions(options, callback));
    };
    PIV.CONTAINER_PREFIX = 'piv';
    PIV.PRINTED_INFORMATION = '/printed-information';
    PIV.FACIAL_IMAGE = '/facial-image';
    return PIV;
}(GenericSecuredCertCard));
export { PIV };
//# sourceMappingURL=piv.js.map