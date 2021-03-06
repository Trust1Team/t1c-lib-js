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
var CoreModel_1 = require("../../../../core/service/CoreModel");
var PinType = /** @class */ (function () {
    function PinType() {
    }
    PinType.PIN = 'Pin';
    PinType.CAN = 'Can';
    return PinType;
}());
exports.PinType = PinType;
var AllCertsResponse = /** @class */ (function (_super) {
    __extends(AllCertsResponse, _super);
    function AllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.AllCertsResponse = AllCertsResponse;
var LuxidAllCerts = /** @class */ (function () {
    function LuxidAllCerts(authentication_certificate, non_repudiation_certificate, root_certificates) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificates = root_certificates;
    }
    return LuxidAllCerts;
}());
exports.LuxidAllCerts = LuxidAllCerts;
var LuxAllDataResponse = /** @class */ (function (_super) {
    __extends(LuxAllDataResponse, _super);
    function LuxAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxAllDataResponse;
}(AllCertsResponse));
exports.LuxAllDataResponse = LuxAllDataResponse;
var LuxPinTryCounterResponse = /** @class */ (function (_super) {
    __extends(LuxPinTryCounterResponse, _super);
    function LuxPinTryCounterResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxPinTryCounterResponse;
}(CoreModel_1.T1CResponse));
exports.LuxPinTryCounterResponse = LuxPinTryCounterResponse;
var LuxidAllData = /** @class */ (function (_super) {
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
exports.LuxidAllData = LuxidAllData;
var LuxidBiometric = /** @class */ (function () {
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
exports.LuxidBiometric = LuxidBiometric;
var LuxidBiometricResponse = /** @class */ (function (_super) {
    __extends(LuxidBiometricResponse, _super);
    function LuxidBiometricResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxidBiometricResponse;
}(CoreModel_1.DataObjectResponse));
exports.LuxidBiometricResponse = LuxidBiometricResponse;
var LuxidPicture = /** @class */ (function () {
    function LuxidPicture(height, width, image, raw_data) {
        this.height = height;
        this.width = width;
        this.image = image;
        this.raw_data = raw_data;
    }
    return LuxidPicture;
}());
exports.LuxidPicture = LuxidPicture;
var LuxidPictureResponse = /** @class */ (function (_super) {
    __extends(LuxidPictureResponse, _super);
    function LuxidPictureResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxidPictureResponse;
}(CoreModel_1.DataObjectResponse));
exports.LuxidPictureResponse = LuxidPictureResponse;
var LuxidSignatureImage = /** @class */ (function () {
    function LuxidSignatureImage(image, raw_data) {
        this.image = image;
        this.raw_data = raw_data;
    }
    return LuxidSignatureImage;
}());
exports.LuxidSignatureImage = LuxidSignatureImage;
var LuxidSignatureImageResponse = /** @class */ (function (_super) {
    __extends(LuxidSignatureImageResponse, _super);
    function LuxidSignatureImageResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return LuxidSignatureImageResponse;
}(CoreModel_1.DataObjectResponse));
exports.LuxidSignatureImageResponse = LuxidSignatureImageResponse;
var LuxPinResetData = /** @class */ (function () {
    function LuxPinResetData(os_dialog, puk, pin, reset_only) {
        this.os_dialog = os_dialog;
        this.puk = puk;
        this.pin = pin;
        this.reset_only = reset_only;
        this.reset_only = false;
    }
    return LuxPinResetData;
}());
exports.LuxPinResetData = LuxPinResetData;
var LuxPinUnblockData = /** @class */ (function () {
    function LuxPinUnblockData(os_dialog, puk, reset_only) {
        this.os_dialog = os_dialog;
        this.puk = puk;
        this.reset_only = reset_only;
        this.reset_only = true;
    }
    return LuxPinUnblockData;
}());
exports.LuxPinUnblockData = LuxPinUnblockData;
var LuxPinChangeData = /** @class */ (function () {
    function LuxPinChangeData(os_dialog, old_pin, new_pin) {
        this.os_dialog = os_dialog;
        this.old_pin = old_pin;
        this.new_pin = new_pin;
    }
    return LuxPinChangeData;
}());
exports.LuxPinChangeData = LuxPinChangeData;
