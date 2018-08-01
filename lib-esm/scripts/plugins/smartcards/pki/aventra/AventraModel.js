import { DataObjectResponse } from '../../../../core/service/CoreModel';
export class AventraAllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class AventraAllCerts {
    constructor(authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
}
export class AventraAllDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class AventraAllData {
    constructor(applet_info, authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.applet_info = applet_info;
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
}
export class AventraAppletInfo {
    constructor(change_counter, name, serial, version) {
        this.change_counter = change_counter;
        this.name = name;
        this.serial = serial;
        this.version = version;
    }
}
//# sourceMappingURL=AventraModel.js.map