import { DataObjectResponse } from '../../../../core/service/CoreModel';
export class DNIeAllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class DNIeAllCerts {
    constructor(authentication_certificate, intermediate_certificate, signing_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.intermediate_certificate = intermediate_certificate;
        this.signing_certificate = signing_certificate;
    }
}
export class DNIeAllDataResponse extends DNIeAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class DNIeAllData {
    constructor(info, authentication_certificate, intermediate_certificate, signing_certificate) {
        this.info = info;
        this.authentication_certificate = authentication_certificate;
        this.intermediate_certificate = intermediate_certificate;
        this.signing_certificate = signing_certificate;
    }
}
export class DNIeInfoResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class DNIeInfo {
    constructor(first_name, last_names, national_number, card_number, serial) {
        this.first_name = first_name;
        this.last_names = last_names;
        this.national_number = national_number;
        this.card_number = card_number;
        this.serial = serial;
    }
}
//# sourceMappingURL=dnieModel.js.map