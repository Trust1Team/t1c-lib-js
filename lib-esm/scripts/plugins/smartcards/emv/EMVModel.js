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
import { DataObjectResponse } from '../../../core/service/CoreModel';
var EmvAllDataResponse = (function (_super) {
    __extends(EmvAllDataResponse, _super);
    function EmvAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvAllDataResponse;
}(DataObjectResponse));
export { EmvAllDataResponse };
var EmvApplication = (function () {
    function EmvApplication(aid, name, priority) {
        this.aid = aid;
        this.name = name;
        this.priority = priority;
    }
    return EmvApplication;
}());
export { EmvApplication };
var EmvApplicationsResponse = (function (_super) {
    __extends(EmvApplicationsResponse, _super);
    function EmvApplicationsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvApplicationsResponse;
}(DataObjectResponse));
export { EmvApplicationsResponse };
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
export { EmvApplicationData };
var EmvApplicationDataResponse = (function (_super) {
    __extends(EmvApplicationDataResponse, _super);
    function EmvApplicationDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvApplicationDataResponse;
}(DataObjectResponse));
export { EmvApplicationDataResponse };
var EmvCertificate = (function () {
    function EmvCertificate(data, exponent, remainder) {
        this.data = data;
        this.exponent = exponent;
        this.remainder = remainder;
    }
    return EmvCertificate;
}());
export { EmvCertificate };
var EmvCertificateResponse = (function (_super) {
    __extends(EmvCertificateResponse, _super);
    function EmvCertificateResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return EmvCertificateResponse;
}(DataObjectResponse));
export { EmvCertificateResponse };
//# sourceMappingURL=EMVModel.js.map