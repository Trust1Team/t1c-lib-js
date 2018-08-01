import { DataObjectResponse, T1CResponse } from '../../../../core/service/CoreModel';
export class PinType {
}
PinType.PIN = 'Pin';
PinType.CAN = 'Can';
export class AllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class LuxidAllCerts {
    constructor(authentication_certificate, non_repudiation_certificate, root_certificates) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificates = root_certificates;
    }
}
export class LuxAllDataResponse extends AllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class LuxPinTryCounterResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class LuxidAllData extends LuxidAllCerts {
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
export class LuxidBiometric {
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
export class LuxidBiometricResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class LuxidPicture {
    constructor(height, width, image, raw_data) {
        this.height = height;
        this.width = width;
        this.image = image;
        this.raw_data = raw_data;
    }
}
export class LuxidPictureResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class LuxidSignatureImage {
    constructor(image, raw_data) {
        this.image = image;
        this.raw_data = raw_data;
    }
}
export class LuxidSignatureImageResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class LuxPinResetData {
    constructor(os_dialog, puk, pin, reset_only) {
        this.os_dialog = os_dialog;
        this.puk = puk;
        this.pin = pin;
        this.reset_only = reset_only;
        this.reset_only = false;
    }
}
export class LuxPinUnblockData {
    constructor(os_dialog, puk, reset_only) {
        this.os_dialog = os_dialog;
        this.puk = puk;
        this.reset_only = reset_only;
        this.reset_only = true;
    }
}
export class LuxPinChangeData {
    constructor(os_dialog, old_pin, new_pin) {
        this.os_dialog = os_dialog;
        this.old_pin = old_pin;
        this.new_pin = new_pin;
    }
}
//# sourceMappingURL=EidLuxModel.js.map