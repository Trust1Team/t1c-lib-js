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
import { DataObjectResponse } from '../../../../core/service/CoreModel';
var BeLawyerPersonalInfo = (function () {
    function BeLawyerPersonalInfo(version, lawyer_id, name, first_name, part_of_cardnumber, expiry_date, country) {
        this.version = version;
        this.lawyer_id = lawyer_id;
        this.name = name;
        this.first_name = first_name;
        this.part_of_cardnumber = part_of_cardnumber;
        this.expiry_date = expiry_date;
        this.country = country;
    }
    return BeLawyerPersonalInfo;
}());
export { BeLawyerPersonalInfo };
var BeLawyerPersonalInfoResponse = (function (_super) {
    __extends(BeLawyerPersonalInfoResponse, _super);
    function BeLawyerPersonalInfoResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeLawyerPersonalInfoResponse;
}(DataObjectResponse));
export { BeLawyerPersonalInfoResponse };
var BeLawyerAllData = (function () {
    function BeLawyerAllData(personal_info, photo, authentication_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.personal_info = personal_info;
        this.photo = photo;
        this.authentication_certificate = authentication_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
    return BeLawyerAllData;
}());
export { BeLawyerAllData };
var BeLawyerAllDataResponse = (function (_super) {
    __extends(BeLawyerAllDataResponse, _super);
    function BeLawyerAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeLawyerAllDataResponse;
}(DataObjectResponse));
export { BeLawyerAllDataResponse };
var BeLawyerAllCertificatesData = (function () {
    function BeLawyerAllCertificatesData(authentication_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
    }
    return BeLawyerAllCertificatesData;
}());
export { BeLawyerAllCertificatesData };
var BeLawyerAllCertificatesResponse = (function (_super) {
    __extends(BeLawyerAllCertificatesResponse, _super);
    function BeLawyerAllCertificatesResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return BeLawyerAllCertificatesResponse;
}(DataObjectResponse));
export { BeLawyerAllCertificatesResponse };
//# sourceMappingURL=BeLawyerModel.js.map