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
var LuxTrust = (function (_super) {
    __extends(LuxTrust, _super);
    function LuxTrust() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LuxTrust.prototype.activated = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(LuxTrust.ACTIVATED), undefined, undefined, callback);
    };
    LuxTrust.prototype.rootCertificate = function (options, callback) {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    LuxTrust.prototype.authenticationCertificate = function (options, callback) {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    LuxTrust.prototype.signingCertificate = function (options, callback) {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    };
    LuxTrust.ACTIVATED = '/activated';
    return LuxTrust;
}(Card_1.GenericCertCard));
exports.LuxTrust = LuxTrust;
//# sourceMappingURL=LuxTrust.js.map