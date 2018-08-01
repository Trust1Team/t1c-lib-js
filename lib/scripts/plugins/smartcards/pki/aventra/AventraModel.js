"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../../../core/service/CoreModel");
class AventraAllCertsResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.AventraAllCertsResponse = AventraAllCertsResponse;
class AventraAllCerts {
    constructor(authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
}
exports.AventraAllCerts = AventraAllCerts;
class AventraAllDataResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.AventraAllDataResponse = AventraAllDataResponse;
class AventraAllData {
    constructor(applet_info, authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.applet_info = applet_info;
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
}
exports.AventraAllData = AventraAllData;
class AventraAppletInfo {
    constructor(change_counter, name, serial, version) {
        this.change_counter = change_counter;
        this.name = name;
        this.serial = serial;
        this.version = version;
    }
}
exports.AventraAppletInfo = AventraAppletInfo;
//# sourceMappingURL=AventraModel.js.map