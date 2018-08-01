"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../../Card");
const RequestHandler_1 = require("../../../../util/RequestHandler");
class EidPt extends Card_1.GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, EidPt.CONTAINER_PREFIX);
    }
    idData(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), undefined, undefined, callback);
    }
    idDataWithOutPhoto(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), { photo: 'false' }, undefined, callback);
    }
    address(data, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EidPt.ADDRESS), data, undefined, undefined, callback);
    }
    photo(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.PHOTO), undefined, undefined, callback);
    }
    rootCertificate(options, callback) {
        return this.getCertificate(EidPt.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    rootAuthenticationCertificate(options, callback) {
        return this.getCertificate(EidPt.CERT_ROOT_AUTH, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    rootNonRepudiationCertificate(options, callback) {
        return this.getCertificate(EidPt.CERT_ROOT_NON_REP, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(EidPt.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    nonRepudiationCertificate(options, callback) {
        return this.getCertificate(EidPt.CERT_NON_REPUDIATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
}
EidPt.CONTAINER_PREFIX = 'pteid';
EidPt.ADDRESS = '/address';
EidPt.CERT_ROOT_AUTH = '/root-authentication';
EidPt.CERT_ROOT_NON_REP = '/root-non-repudiation';
EidPt.ID_DATA = '/id';
EidPt.PHOTO = '/photo';
exports.EidPt = EidPt;
//# sourceMappingURL=EidPt.js.map