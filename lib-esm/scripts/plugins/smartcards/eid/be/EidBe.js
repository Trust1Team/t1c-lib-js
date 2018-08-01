import { GenericCertCard } from '../../Card';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { RequestHandler } from '../../../../util/RequestHandler';
import * as _ from 'lodash';
export class EidBe extends GenericCertCard {
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
        return this.getCertificate(EidBe.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }
    citizenCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_CITIZEN, RequestHandler.determineOptions(options, callback));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }
    nonRepudiationCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }
    rrnCertificate(options, callback) {
        return this.getCertificate(EidBe.CERT_RRN, RequestHandler.determineOptions(options, callback));
    }
    verifyPin(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            let encryptedBody = _.extend({ private_key_reference: EidBe.VERIFY_PRIV_KEY_REF }, body);
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.VERIFY_PIN), encryptedBody, undefined, undefined, callback);
        });
    }
}
EidBe.CONTAINER_PREFIX = 'beid';
EidBe.RN_DATA = '/rn';
EidBe.ADDRESS = '/address';
EidBe.PHOTO = '/picture';
EidBe.TOKEN = '/token';
EidBe.VERIFY_PRIV_KEY_REF = 'non-repudiation';
//# sourceMappingURL=EidBe.js.map