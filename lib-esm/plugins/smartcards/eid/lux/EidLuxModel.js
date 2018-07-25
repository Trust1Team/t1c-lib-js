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
import { DataObjectResponse, T1CResponse } from '../../../../core/service/CoreModel';
var AllCertsResponse = (function (_super) {
    __extends(AllCertsResponse, _super);
    function AllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllCertsResponse;
}(DataObjectResponse));
export { AllCertsResponse };
var LuxidAllCerts = (function () {
    function LuxidAllCerts(authentication_certificate, non_repudiation_certificate, root_certificates) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificates = root_certificates;
    }
    return LuxidAllCerts;
}());
export { LuxidAllCerts };
var LuxAllDataResponse = (function (_super) {
    __extends(LuxAllDataResponse, _super);
    function LuxAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxAllDataResponse;
}(AllCertsResponse));
export { LuxAllDataResponse };
var LuxPinTryCounterResponse = (function (_super) {
    __extends(LuxPinTryCounterResponse, _super);
    function LuxPinTryCounterResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxPinTryCounterResponse;
}(T1CResponse));
export { LuxPinTryCounterResponse };
var LuxidAllData = (function (_super) {
    __extends(LuxidAllData, _super);
    function LuxidAllData(authentication_certificate, non_repudiation_certificate, root_certificates, biometric, picture, signature_image, signature_object) {
        var _this = _super.call(this, authentication_certificate, non_repudiation_certificate, root_certificates) || this;
        _this.authentication_certificate = authentication_certificate;
        _this.non_repudiation_certificate = non_repudiation_certificate;
        _this.root_certificates = root_certificates;
        _this.biometric = biometric;
        _this.picture = picture;
        _this.signature_image = signature_image;
        _this.signature_object = signature_object;
        return _this;
    }
    return LuxidAllData;
}(LuxidAllCerts));
export { LuxidAllData };
var LuxidBiometric = (function () {
    function LuxidBiometric(birthData, documentNumber, documentType, firstName, gender, issuingState, lastName, nationality, validityEndData, validityStartData) {
        this.birthData = birthData;
        this.documentNumber = documentNumber;
        this.documentType = documentType;
        this.firstName = firstName;
        this.gender = gender;
        this.issuingState = issuingState;
        this.lastName = lastName;
        this.nationality = nationality;
        this.validityEndData = validityEndData;
        this.validityStartData = validityStartData;
    }
    return LuxidBiometric;
}());
export { LuxidBiometric };
var LuxidBiometricResponse = (function (_super) {
    __extends(LuxidBiometricResponse, _super);
    function LuxidBiometricResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxidBiometricResponse;
}(DataObjectResponse));
export { LuxidBiometricResponse };
var LuxidPicture = (function () {
    function LuxidPicture(height, width, image, raw_data) {
        this.height = height;
        this.width = width;
        this.image = image;
        this.raw_data = raw_data;
    }
    return LuxidPicture;
}());
export { LuxidPicture };
var LuxidPictureResponse = (function (_super) {
    __extends(LuxidPictureResponse, _super);
    function LuxidPictureResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxidPictureResponse;
}(DataObjectResponse));
export { LuxidPictureResponse };
var LuxidSignatureImage = (function () {
    function LuxidSignatureImage(image, raw_data) {
        this.image = image;
        this.raw_data = raw_data;
    }
    return LuxidSignatureImage;
}());
export { LuxidSignatureImage };
var LuxidSignatureImageResponse = (function (_super) {
    __extends(LuxidSignatureImageResponse, _super);
    function LuxidSignatureImageResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxidSignatureImageResponse;
}(DataObjectResponse));
export { LuxidSignatureImageResponse };
var LuxPinResetData = (function () {
    function LuxPinResetData(os_dialog, reset_only, puk, pin) {
        this.os_dialog = os_dialog;
        this.reset_only = reset_only;
        this.puk = puk;
        this.pin = pin;
        this.reset_only = false;
    }
    return LuxPinResetData;
}());
export { LuxPinResetData };
var LuxPinUnblockData = (function () {
    function LuxPinUnblockData(os_dialog, reset_only, puk) {
        this.os_dialog = os_dialog;
        this.reset_only = reset_only;
        this.puk = puk;
        this.reset_only = true;
    }
    return LuxPinUnblockData;
}());
export { LuxPinUnblockData };
var LuxPinChangeData = (function () {
    function LuxPinChangeData(os_dialog, old_pin, new_pin) {
        this.os_dialog = os_dialog;
        this.old_pin = old_pin;
        this.new_pin = new_pin;
        ;
    }
    return LuxPinChangeData;
}());
export { LuxPinChangeData };
//# sourceMappingURL=EidLuxModel.js.map