import { DataObjectResponse } from '../../../../core/service/CoreModel';
export class OberthurAllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class OberthurAllCerts {
    constructor(root_certificate, issuer_certificate, authentication_certificate, signing_certificate, encryption_certificate) {
        this.root_certificate = root_certificate;
        this.issuer_certificate = issuer_certificate;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.encryption_certificate = encryption_certificate;
    }
}
export class OberthurAllDataResponse extends OberthurAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
//# sourceMappingURL=OberthurModel.js.map