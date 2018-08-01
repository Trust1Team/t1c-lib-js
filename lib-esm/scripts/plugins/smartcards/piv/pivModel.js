import { DataObjectResponse } from '../../../core/service/CoreModel';
export class PivPrintedInformationResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class PivAllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class PivPrintedInformation {
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
export class PivFacialImageResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class PivFacialImage {
    constructor(image) {
        this.image = image;
    }
}
export class PivAllCerts {
    constructor(authentication_certificate, signing_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
    }
}
export class PivAllDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class PivAllData {
    constructor(printed_information, authentication_certificate, signing_certificate, facial_image) {
        this.printed_information = printed_information;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.facial_image = facial_image;
    }
}
//# sourceMappingURL=pivModel.js.map