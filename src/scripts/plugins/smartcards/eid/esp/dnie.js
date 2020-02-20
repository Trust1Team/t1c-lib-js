"use strict";
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
exports.__esModule = true;
var Card_1 = require("../../Card");
var RequestHandler_1 = require("../../../../util/RequestHandler");
var CertParser_1 = require("../../../../util/CertParser");
var ResponseHandler_1 = require("../../../../util/ResponseHandler");
var DNIe = /** @class */ (function (_super) {
    __extends(DNIe, _super);
    function DNIe(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, DNIe.CONTAINER_PREFIX) || this;
    }
    DNIe.prototype.info = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(DNIe.INFO), undefined, undefined, callback);
    };
    DNIe.prototype.intermediateCertificate = function (options, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptions(options, callback);
        var self = this;
        return self.connection.get(self.baseUrl, self.containerSuffix(DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE), undefined).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, reqOptions.callback);
        });
    };
    // TODO is optional pace/pin needed?
    DNIe.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, {}, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    // TODO is optional pace/pin needed?
    DNIe.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(DNIe.CERT_SIGNING, {}, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    DNIe.CONTAINER_PREFIX = 'dnie';
    DNIe.INFO = '/info';
    DNIe.CERT_INTERMEDIATE = '/intermediate';
    return DNIe;
}(Card_1.GenericSecuredCertCard));
exports.DNIe = DNIe;
