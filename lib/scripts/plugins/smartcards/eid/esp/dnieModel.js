"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../../core/service/CoreModel");
class DNIeAllCertsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.DNIeAllCertsResponse = DNIeAllCertsResponse;
class DNIeAllCerts {
    constructor(authentication_certificate, intermediate_certificate, signing_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.intermediate_certificate = intermediate_certificate;
        this.signing_certificate = signing_certificate;
    }
}
exports.DNIeAllCerts = DNIeAllCerts;
class DNIeAllDataResponse extends DNIeAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.DNIeAllDataResponse = DNIeAllDataResponse;
class DNIeAllData {
    constructor(info, authentication_certificate, intermediate_certificate, signing_certificate) {
        this.info = info;
        this.authentication_certificate = authentication_certificate;
        this.intermediate_certificate = intermediate_certificate;
        this.signing_certificate = signing_certificate;
    }
}
exports.DNIeAllData = DNIeAllData;
class DNIeInfoResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.DNIeInfoResponse = DNIeInfoResponse;
class DNIeInfo {
    constructor(first_name, last_names, national_number, card_number, serial) {
        this.first_name = first_name;
        this.last_names = last_names;
        this.national_number = national_number;
        this.card_number = card_number;
        this.serial = serial;
    }
}
exports.DNIeInfo = DNIeInfo;
//# sourceMappingURL=dnieModel.js.map