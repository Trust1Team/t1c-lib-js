import { DataObjectResponse } from '../../../../core/service/CoreModel';
export class LuxtrustAllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class LuxtrustAllCerts {
    constructor(authentication_certificate, non_repudiation_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificate = root_certificate;
    }
}
export class LuxtrustAllDataResponse extends LuxtrustAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
//# sourceMappingURL=LuxTrustModel.js.map