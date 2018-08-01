"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../../Card");
const RequestHandler_1 = require("../../../../util/RequestHandler");
const CertParser_1 = require("../../../../util/CertParser");
const ResponseHandler_1 = require("../../../../util/ResponseHandler");
class DNIe extends Card_1.GenericSecuredCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, DNIe.CONTAINER_PREFIX);
    }
    info(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(DNIe.INFO), undefined, undefined, callback);
    }
    intermediateCertificate(options, callback) {
        const reqOptions = RequestHandler_1.RequestHandler.determineOptions(options, callback);
        let self = this;
        return self.connection.get(self.baseUrl, self.containerSuffix(DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE), undefined).then(data => {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler_1.ResponseHandler.error(err, reqOptions.callback);
        });
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, {}, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(DNIe.CERT_SIGNING, {}, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
}
DNIe.CONTAINER_PREFIX = 'dnie';
DNIe.INFO = '/info';
DNIe.CERT_INTERMEDIATE = '/intermediate';
exports.DNIe = DNIe;
//# sourceMappingURL=dnie.js.map