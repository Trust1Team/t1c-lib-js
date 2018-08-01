import { DataObjectResponse } from '../../../core/service/CoreModel';
export class EmvAllDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class EmvApplication {
    constructor(aid, name, priority) {
        this.aid = aid;
        this.name = name;
        this.priority = priority;
    }
}
export class EmvApplicationsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class EmvApplicationData {
    constructor(country, country_code, effective_data, expiration_date, language, pan, name) {
        this.country = country;
        this.country_code = country_code;
        this.effective_data = effective_data;
        this.expiration_date = expiration_date;
        this.language = language;
        this.pan = pan;
        this.name = name;
    }
}
export class EmvApplicationDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class EmvCertificate {
    constructor(data, exponent, remainder) {
        this.data = data;
        this.exponent = exponent;
        this.remainder = remainder;
    }
}
export class EmvCertificateResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
//# sourceMappingURL=EMVModel.js.map