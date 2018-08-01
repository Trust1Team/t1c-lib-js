"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../core/service/CoreModel");
class EmvAllDataResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.EmvAllDataResponse = EmvAllDataResponse;
class EmvApplication {
    constructor(aid, name, priority) {
        this.aid = aid;
        this.name = name;
        this.priority = priority;
    }
}
exports.EmvApplication = EmvApplication;
class EmvApplicationsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.EmvApplicationsResponse = EmvApplicationsResponse;
class EmvApplicationData {
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
exports.EmvApplicationData = EmvApplicationData;
class EmvApplicationDataResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.EmvApplicationDataResponse = EmvApplicationDataResponse;
class EmvCertificate {
    constructor(data, exponent, remainder) {
        this.data = data;
        this.exponent = exponent;
        this.remainder = remainder;
    }
}
exports.EmvCertificate = EmvCertificate;
class EmvCertificateResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.EmvCertificateResponse = EmvCertificateResponse;
//# sourceMappingURL=EMVModel.js.map