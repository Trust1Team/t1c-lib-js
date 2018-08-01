import { GenericSecuredCertCard } from '../Card';
import { PinEnforcer } from '../../../util/PinEnforcer';
import { RequestHandler } from '../../../util/RequestHandler';
export class PIV extends GenericSecuredCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, PIV.CONTAINER_PREFIX);
    }
    allDataFilters() {
        return ['applet-info', 'root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }
    allCertFilters() {
        return ['authentication-certificate', 'signing_certificate'];
    }
    allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }
    printedInformation(body, callback) {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined));
                }, error => { reject(error); });
            });
        }
    }
    facialImage(body, callback) {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined));
                }, error => { reject(error); });
            });
        }
    }
    authenticationCertificate(body, options, callback) {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, RequestHandler.determineOptions(options, callback), undefined);
    }
    signingCertificate(body, options, callback) {
        return this.getCertificate(PIV.CERT_SIGNING, body, RequestHandler.determineOptions(options, callback));
    }
}
PIV.CONTAINER_PREFIX = 'piv';
PIV.PRINTED_INFORMATION = '/printed-information';
PIV.FACIAL_IMAGE = '/facial-image';
//# sourceMappingURL=piv.js.map