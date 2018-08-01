"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../../core/service/CoreModel");
class LuxtrustAllCertsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.LuxtrustAllCertsResponse = LuxtrustAllCertsResponse;
class LuxtrustAllCerts {
    constructor(authentication_certificate, non_repudiation_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificate = root_certificate;
    }
}
exports.LuxtrustAllCerts = LuxtrustAllCerts;
class LuxtrustAllDataResponse extends LuxtrustAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.LuxtrustAllDataResponse = LuxtrustAllDataResponse;
//# sourceMappingURL=LuxTrustModel.js.map