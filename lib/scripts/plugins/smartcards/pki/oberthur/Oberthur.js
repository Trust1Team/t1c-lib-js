"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../../Card");
const PinEnforcer_1 = require("../../../../util/PinEnforcer");
const RequestHandler_1 = require("../../../../util/RequestHandler");
class Oberthur extends Card_1.GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, Oberthur.CONTAINER_PREFIX);
    }
    allDataFilters() {
        return ['root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }
    allCertFilters() {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }
    allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }
    rootCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    issuerCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_ISSUER, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_SIGNING, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    encryptionCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    verifyPin(body, callback) {
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
}
Oberthur.CONTAINER_PREFIX = 'oberthur';
exports.Oberthur = Oberthur;
//# sourceMappingURL=Oberthur.js.map