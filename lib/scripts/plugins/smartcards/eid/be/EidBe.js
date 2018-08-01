"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../../Card");
const PinEnforcer_1 = require("../../../../util/PinEnforcer");
const RequestHandler_1 = require("../../../../util/RequestHandler");
const _ = require("lodash");
class EidBe extends Card_1.GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, EidBe.CONTAINER_PREFIX);
    }
    rnData(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.RN_DATA), undefined, undefined, callback);
    }
    address(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.ADDRESS), undefined, undefined, callback);
    }
    tokenData(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.TOKEN), undefined, undefined, callback);
    }
    picture(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidBe.PHOTO), undefined, undefined, callback);
    }
    rootCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    citizenCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    nonRepudiationCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    rrnCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_RRN, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    verifyPin(body, callback) {
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            let encryptedBody = _.extend({ private_key_reference: EidBe.VERIFY_PRIV_KEY_REF }, body);
            return this.connection.post(this.baseUrl, this.containerSuffix(Card_1.GenericCertCard.VERIFY_PIN), encryptedBody, undefined, undefined, callback);
        });
    }
}
EidBe.CONTAINER_PREFIX = 'beid';
EidBe.RN_DATA = '/rn';
EidBe.ADDRESS = '/address';
EidBe.PHOTO = '/picture';
EidBe.TOKEN = '/token';
EidBe.VERIFY_PRIV_KEY_REF = 'non-repudiation';
exports.EidBe = EidBe;
//# sourceMappingURL=EidBe.js.map