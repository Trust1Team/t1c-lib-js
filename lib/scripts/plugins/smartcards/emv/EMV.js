"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
class EMV extends Card_1.GenericPinCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, EMV.CONTAINER_PREFIX);
    }
    applicationData(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EMV.APPLICATION_DATA), undefined, undefined, callback);
    }
    applications(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EMV.APPLICATIONS), undefined, undefined, callback);
    }
    iccPublicKeyCertificate(aid, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EMV.ICC_PUBLIC_KEY_CERT), { aid }, undefined, undefined, callback);
    }
    issuerPublicKeyCertificate(aid, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EMV.ISSUER_PUBLIC_KEY_CERT), { aid }, undefined, undefined, callback);
    }
}
EMV.CONTAINER_PREFIX = 'emv';
EMV.APPLICATIONS = '/applications';
EMV.APPLICATION_DATA = '/application-data';
EMV.ISSUER_PUBLIC_KEY_CERT = '/issuer-public-key-certificate';
EMV.ICC_PUBLIC_KEY_CERT = '/icc-public-key-certificate';
exports.EMV = EMV;
//# sourceMappingURL=EMV.js.map