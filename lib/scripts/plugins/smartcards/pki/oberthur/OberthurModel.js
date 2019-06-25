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
Object.defineProperty(exports, "__esModule", { value: true });
var CoreModel_1 = require("../../../../core/service/CoreModel");
var OberthurAllCertsResponse = (function (_super) {
    __extends(OberthurAllCertsResponse, _super);
    function OberthurAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return OberthurAllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.OberthurAllCertsResponse = OberthurAllCertsResponse;
var OberthurAllCerts = (function () {
    function OberthurAllCerts(root_certificate, issuer_certificate, authentication_certificate, signing_certificate, encryption_certificate) {
        this.root_certificate = root_certificate;
        this.issuer_certificate = issuer_certificate;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.encryption_certificate = encryption_certificate;
    }
    return OberthurAllCerts;
}());
exports.OberthurAllCerts = OberthurAllCerts;
var OberthurAllDataResponse = (function (_super) {
    __extends(OberthurAllDataResponse, _super);
    function OberthurAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return OberthurAllDataResponse;
}(OberthurAllCertsResponse));
exports.OberthurAllDataResponse = OberthurAllDataResponse;
//# sourceMappingURL=OberthurModel.js.map