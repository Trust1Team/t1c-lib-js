"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../core/service/CoreModel");
class PivPrintedInformationResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.PivPrintedInformationResponse = PivPrintedInformationResponse;
class PivAllCertsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.PivAllCertsResponse = PivAllCertsResponse;
class PivPrintedInformation {
    constructor(name, employee_affiliation, expiration_date, agency_card_serial_number, issuer_identification, organization_affiliation_line_1, organization_affiliation_line_2) {
        this.name = name;
        this.employee_affiliation = employee_affiliation;
        this.expiration_date = expiration_date;
        this.agency_card_serial_number = agency_card_serial_number;
        this.issuer_identification = issuer_identification;
        this.organization_affiliation_line_1 = organization_affiliation_line_1;
        this.organization_affiliation_line_2 = organization_affiliation_line_2;
    }
}
exports.PivPrintedInformation = PivPrintedInformation;
class PivFacialImageResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.PivFacialImageResponse = PivFacialImageResponse;
class PivFacialImage {
    constructor(image) {
        this.image = image;
    }
}
exports.PivFacialImage = PivFacialImage;
class PivAllCerts {
    constructor(authentication_certificate, signing_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
    }
}
exports.PivAllCerts = PivAllCerts;
class PivAllDataResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.PivAllDataResponse = PivAllDataResponse;
class PivAllData {
    constructor(printed_information, authentication_certificate, signing_certificate, facial_image) {
        this.printed_information = printed_information;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.facial_image = facial_image;
    }
}
exports.PivAllData = PivAllData;
//# sourceMappingURL=pivModel.js.map