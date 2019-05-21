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
import { DataObjectResponse } from '../../../../core/service/CoreModel';
var DNIeAllCertsResponse = (function (_super) {
    __extends(DNIeAllCertsResponse, _super);
    function DNIeAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DNIeAllCertsResponse;
}(DataObjectResponse));
export { DNIeAllCertsResponse };
var DNIeAllCerts = (function () {
    function DNIeAllCerts(authentication_certificate, intermediate_certificate, signing_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.intermediate_certificate = intermediate_certificate;
        this.signing_certificate = signing_certificate;
    }
    return DNIeAllCerts;
}());
export { DNIeAllCerts };
var DNIeAllDataResponse = (function (_super) {
    __extends(DNIeAllDataResponse, _super);
    function DNIeAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DNIeAllDataResponse;
}(DNIeAllCertsResponse));
export { DNIeAllDataResponse };
var DNIeAllData = (function () {
    function DNIeAllData(info, authentication_certificate, intermediate_certificate, signing_certificate) {
        this.info = info;
        this.authentication_certificate = authentication_certificate;
        this.intermediate_certificate = intermediate_certificate;
        this.signing_certificate = signing_certificate;
    }
    return DNIeAllData;
}());
export { DNIeAllData };
var DNIeInfoResponse = (function (_super) {
    __extends(DNIeInfoResponse, _super);
    function DNIeInfoResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DNIeInfoResponse;
}(DataObjectResponse));
export { DNIeInfoResponse };
var DNIeInfo = (function () {
    function DNIeInfo(first_name, last_names, national_number, card_number, serial) {
        this.first_name = first_name;
        this.last_names = last_names;
        this.national_number = national_number;
        this.card_number = card_number;
        this.serial = serial;
    }
    return DNIeInfo;
}());
export { DNIeInfo };
//# sourceMappingURL=dnieModel.js.map