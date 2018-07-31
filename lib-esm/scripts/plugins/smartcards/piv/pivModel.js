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
var PivPrintedInformationResponse = (function (_super) {
    __extends(PivPrintedInformationResponse, _super);
    function PivPrintedInformationResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PivPrintedInformationResponse;
}(DataObjectResponse));
export { PivPrintedInformationResponse };
var PivAllCertsResponse = (function (_super) {
    __extends(PivAllCertsResponse, _super);
    function PivAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PivAllCertsResponse;
}(DataObjectResponse));
export { PivAllCertsResponse };
var PivPrintedInformation = (function () {
    function PivPrintedInformation(name, employee_affiliation, expiration_date, agency_card_serial_number, issuer_identification, organization_affiliation_line_1, organization_affiliation_line_2) {
        this.name = name;
        this.employee_affiliation = employee_affiliation;
        this.expiration_date = expiration_date;
        this.agency_card_serial_number = agency_card_serial_number;
        this.issuer_identification = issuer_identification;
        this.organization_affiliation_line_1 = organization_affiliation_line_1;
        this.organization_affiliation_line_2 = organization_affiliation_line_2;
    }
    return PivPrintedInformation;
}());
export { PivPrintedInformation };
var PivFacialImageResponse = (function (_super) {
    __extends(PivFacialImageResponse, _super);
    function PivFacialImageResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PivFacialImageResponse;
}(DataObjectResponse));
export { PivFacialImageResponse };
var PivFacialImage = (function () {
    function PivFacialImage(image) {
        this.image = image;
    }
    return PivFacialImage;
}());
export { PivFacialImage };
var PivAllCerts = (function () {
    function PivAllCerts(authentication_certificate, signing_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
    }
    return PivAllCerts;
}());
export { PivAllCerts };
var PivAllDataResponse = (function (_super) {
    __extends(PivAllDataResponse, _super);
    function PivAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PivAllDataResponse;
}(DataObjectResponse));
export { PivAllDataResponse };
var PivAllData = (function () {
    function PivAllData(printed_information, authentication_certificate, signing_certificate, facial_image) {
        this.printed_information = printed_information;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.facial_image = facial_image;
    }
    return PivAllData;
}());
export { PivAllData };
//# sourceMappingURL=pivModel.js.map