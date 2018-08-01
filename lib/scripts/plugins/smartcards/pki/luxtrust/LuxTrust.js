"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../../Card");
const RequestHandler_1 = require("../../../../util/RequestHandler");
class LuxTrust extends Card_1.GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, LuxTrust.CONTAINER_PREFIX);
    }
    activated(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(LuxTrust.ACTIVATED), undefined, undefined, callback);
    }
    rootCertificate(options, callback) {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
}
LuxTrust.CONTAINER_PREFIX = 'luxtrust';
LuxTrust.ACTIVATED = '/activated';
exports.LuxTrust = LuxTrust;
//# sourceMappingURL=LuxTrust.js.map