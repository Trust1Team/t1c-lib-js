import { GenericCertCard } from '../../Card';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { RequestHandler } from '../../../../util/RequestHandler';
export class Aventra extends GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, Aventra.CONTAINER_PREFIX);
    }
    allDataFilters() {
        return ['applet-info', 'root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }
    allCertFilters() {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }
    allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }
    rootCertificate(options, callback) {
        return this.getCertificate(Aventra.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }
    issuerCertificate(options, callback) {
        return this.getCertificate(Aventra.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }
    signingCertificate(options, callback) {
        return this.getCertificate(Aventra.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
    encryptionCertificate(options, callback) {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }
    verifyPin(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
    resetPin(body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Aventra.RESET_PIN), body, undefined, undefined, callback);
    }
}
Aventra.CONTAINER_PREFIX = 'aventra';
Aventra.DEFAULT_VERIFY_PIN = 'sign';
Aventra.RESET_PIN = '/reset-pin';
//# sourceMappingURL=Aventra.js.map