import { GenericSecuredCertCard } from '../../Card';
import { RequestHandler } from '../../../../util/RequestHandler';
import { CertParser } from '../../../../util/CertParser';
import { ResponseHandler } from '../../../../util/ResponseHandler';
export class DNIe extends GenericSecuredCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, DNIe.CONTAINER_PREFIX);
    }
    info(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(DNIe.INFO), undefined, undefined, callback);
    }
    intermediateCertificate(options, callback) {
        const reqOptions = RequestHandler.determineOptions(options, callback);
        let self = this;
        return self.connection.get(self.baseUrl, self.containerSuffix(DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE), undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, {}, RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(DNIe.CERT_SIGNING, {}, RequestHandler.determineOptions(options, callback));
    }
}
DNIe.CONTAINER_PREFIX = 'dnie';
DNIe.INFO = '/info';
DNIe.CERT_INTERMEDIATE = '/intermediate';
//# sourceMappingURL=dnie.js.map