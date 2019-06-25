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
var CoreModel_1 = require("../../../core/service/CoreModel");
var EmvAllDataResponse = (function (_super) {
    __extends(EmvAllDataResponse, _super);
    function EmvAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvAllDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.EmvAllDataResponse = EmvAllDataResponse;
var EmvApplication = (function () {
    function EmvApplication(aid, name, priority) {
        this.aid = aid;
        this.name = name;
        this.priority = priority;
    }
    return EmvApplication;
}());
exports.EmvApplication = EmvApplication;
var EmvApplicationsResponse = (function (_super) {
    __extends(EmvApplicationsResponse, _super);
    function EmvApplicationsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvApplicationsResponse;
}(CoreModel_1.DataObjectResponse));
exports.EmvApplicationsResponse = EmvApplicationsResponse;
var EmvApplicationData = (function () {
    function EmvApplicationData(country, country_code, effective_data, expiration_date, language, pan, name) {
        this.country = country;
        this.country_code = country_code;
        this.effective_data = effective_data;
        this.expiration_date = expiration_date;
        this.language = language;
        this.pan = pan;
        this.name = name;
    }
    return EmvApplicationData;
}());
exports.EmvApplicationData = EmvApplicationData;
var EmvApplicationDataResponse = (function (_super) {
    __extends(EmvApplicationDataResponse, _super);
    function EmvApplicationDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvApplicationDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.EmvApplicationDataResponse = EmvApplicationDataResponse;
var EmvCertificate = (function () {
    function EmvCertificate(data, exponent, remainder) {
        this.data = data;
        this.exponent = exponent;
        this.remainder = remainder;
    }
    return EmvCertificate;
}());
exports.EmvCertificate = EmvCertificate;
var EmvCertificateResponse = (function (_super) {
    __extends(EmvCertificateResponse, _super);
    function EmvCertificateResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvCertificateResponse;
}(CoreModel_1.DataObjectResponse));
exports.EmvCertificateResponse = EmvCertificateResponse;
//# sourceMappingURL=EMVModel.js.map