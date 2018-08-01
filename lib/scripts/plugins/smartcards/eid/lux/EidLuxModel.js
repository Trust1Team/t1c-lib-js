"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../../core/service/CoreModel");
class PinType {
}
PinType.PIN = 'Pin';
PinType.CAN = 'Can';
exports.PinType = PinType;
class AllCertsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.AllCertsResponse = AllCertsResponse;
class LuxidAllCerts {
    constructor(authentication_certificate, non_repudiation_certificate, root_certificates) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificates = root_certificates;
    }
}
exports.LuxidAllCerts = LuxidAllCerts;
class LuxAllDataResponse extends AllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.LuxAllDataResponse = LuxAllDataResponse;
class LuxPinTryCounterResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.LuxPinTryCounterResponse = LuxPinTryCounterResponse;
class LuxidAllData extends LuxidAllCerts {
    constructor(authentication_certificate, non_repudiation_certificate, root_certificates, biometric, picture, signature_image, signature_object) {
        super(authentication_certificate, non_repudiation_certificate, root_certificates);
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificates = root_certificates;
        this.biometric = biometric;
        this.picture = picture;
        this.signature_image = signature_image;
        this.signature_object = signature_object;
    }
}
exports.LuxidAllData = LuxidAllData;
class LuxidBiometric {
    constructor(birthData, documentNumber, documentType, firstName, gender, issuingState, lastName, nationality, validityEndData, validityStartData) {
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
}
exports.LuxidBiometric = LuxidBiometric;
class LuxidBiometricResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.LuxidBiometricResponse = LuxidBiometricResponse;
class LuxidPicture {
    constructor(height, width, image, raw_data) {
        this.height = height;
        this.width = width;
        this.image = image;
        this.raw_data = raw_data;
    }
}
exports.LuxidPicture = LuxidPicture;
class LuxidPictureResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.LuxidPictureResponse = LuxidPictureResponse;
class LuxidSignatureImage {
    constructor(image, raw_data) {
        this.image = image;
        this.raw_data = raw_data;
    }
}
exports.LuxidSignatureImage = LuxidSignatureImage;
class LuxidSignatureImageResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.LuxidSignatureImageResponse = LuxidSignatureImageResponse;
class LuxPinResetData {
    constructor(os_dialog, puk, pin, reset_only) {
        this.os_dialog = os_dialog;
        this.puk = puk;
        this.pin = pin;
        this.reset_only = reset_only;
        this.reset_only = false;
    }
}
exports.LuxPinResetData = LuxPinResetData;
class LuxPinUnblockData {
    constructor(os_dialog, puk, reset_only) {
        this.os_dialog = os_dialog;
        this.puk = puk;
        this.reset_only = reset_only;
        this.reset_only = true;
    }
}
exports.LuxPinUnblockData = LuxPinUnblockData;
class LuxPinChangeData {
    constructor(os_dialog, old_pin, new_pin) {
        this.os_dialog = os_dialog;
        this.old_pin = old_pin;
        this.new_pin = new_pin;
    }
}
exports.LuxPinChangeData = LuxPinChangeData;
//# sourceMappingURL=EidLuxModel.js.map