import { GenericCertCard } from '../../Card';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { RequestHandler } from '../../../../util/RequestHandler';
export class Oberthur extends GenericCertCard {
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
        return this.getCertificate(Oberthur.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }
    issuerCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
    encryptionCertificate(options, callback) {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }
    verifyPin(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
}
Oberthur.CONTAINER_PREFIX = 'oberthur';
//# sourceMappingURL=Oberthur.js.map