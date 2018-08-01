"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../../core/service/CoreModel");
class OberthurAllCertsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.OberthurAllCertsResponse = OberthurAllCertsResponse;
class OberthurAllCerts {
    constructor(root_certificate, issuer_certificate, authentication_certificate, signing_certificate, encryption_certificate) {
        this.root_certificate = root_certificate;
        this.issuer_certificate = issuer_certificate;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.encryption_certificate = encryption_certificate;
    }
}
exports.OberthurAllCerts = OberthurAllCerts;
class OberthurAllDataResponse extends OberthurAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.OberthurAllDataResponse = OberthurAllDataResponse;
//# sourceMappingURL=OberthurModel.js.map