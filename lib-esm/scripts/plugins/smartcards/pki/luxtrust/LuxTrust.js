import { GenericCertCard } from '../../Card';
import { RequestHandler } from '../../../../util/RequestHandler';
export class LuxTrust extends GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, LuxTrust.CONTAINER_PREFIX);
    }
    activated(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(LuxTrust.ACTIVATED), undefined, undefined, callback);
    }
    rootCertificate(options, callback) {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
}
LuxTrust.CONTAINER_PREFIX = 'luxtrust';
LuxTrust.ACTIVATED = '/activated';
//# sourceMappingURL=LuxTrust.js.map