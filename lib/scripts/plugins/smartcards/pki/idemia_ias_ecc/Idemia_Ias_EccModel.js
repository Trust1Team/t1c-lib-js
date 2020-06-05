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
var Idemia_Ias_EccAllCertsResponse = (function (_super) {
    __extends(Idemia_Ias_EccAllCertsResponse, _super);
    function Idemia_Ias_EccAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return Idemia_Ias_EccAllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.Idemia_Ias_EccAllCertsResponse = Idemia_Ias_EccAllCertsResponse;
var Idemia_Ias_EccAllCerts = (function () {
    function Idemia_Ias_EccAllCerts(root_certificate, issuer_certificate, authentication_certificate, signing_certificate, encryption_certificate) {
        this.root_certificate = root_certificate;
        this.issuer_certificate = issuer_certificate;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.encryption_certificate = encryption_certificate;
    }
    return Idemia_Ias_EccAllCerts;
}());
exports.Idemia_Ias_EccAllCerts = Idemia_Ias_EccAllCerts;
var Idemia_Ias_EccAllDataResponse = (function (_super) {
    __extends(Idemia_Ias_EccAllDataResponse, _super);
    function Idemia_Ias_EccAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return Idemia_Ias_EccAllDataResponse;
}(Idemia_Ias_EccAllCertsResponse));
exports.Idemia_Ias_EccAllDataResponse = Idemia_Ias_EccAllDataResponse;
//# sourceMappingURL=Idemia_Ias_EccModel.js.map