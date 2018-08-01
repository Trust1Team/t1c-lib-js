import { GenericCertCard } from '../../Card';
import { PinType } from './EidLuxModel';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { CertParser } from '../../../../util/CertParser';
import { ResponseHandler } from '../../../../util/ResponseHandler';
import { RequestHandler } from '../../../../util/RequestHandler';
export class EidLux extends GenericCertCard {
    constructor(baseUrl, containerUrl, connection, reader_id, pin, pinType) {
        super(baseUrl, containerUrl, connection, reader_id, EidLux.CONTAINER_PREFIX);
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
        this.pin = pin;
        this.pinType = pinType;
        if (!pinType) {
            this.pinType = PinType.PIN;
        }
        this.pin = PinEnforcer.encryptPin(pin);
    }
    static EncryptedHeader(code, pinType) {
        if (pinType === PinType.CAN) {
            return { 'X-Encrypted-Can': code };
        }
        else {
            return { 'X-Encrypted-Pin': code };
        }
    }
    allDataFilters() {
        return ['authentication-certificate', 'biometric', 'non-repudiation-certificate', 'picture', 'root-certificates'];
    }
    allCertFilters() {
        return ['authentication-certificate', 'non-repudiation-certificate', 'root-certificates'];
    }
    allData(options, callback) {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), reqOptions.params, EidLux.EncryptedHeader(this.pin, this.pinType)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    allCerts(options, callback) {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.ALL_CERTIFICATES), reqOptions.params, EidLux.EncryptedHeader(this.pin, this.pinType)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    biometric(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.BIOMETRIC), undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    picture(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.PHOTO), undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    rootCertificate(options, callback) {
        return this.getCertificateArray(EidLux.CERT_ROOT, RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    }
    authenticationCertificate(options, callback) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    }
    nonRepudiationCertificate(options, callback) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    }
    verifyPin(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }
    signData(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }
    authenticate(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }
    signatureImage(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.SIGNATURE_IMAGE), undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    pinTryCounter(pin_reference, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_TRY_COUNTER), pin_reference, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    pinReset(body, callback) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        body.puk = PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    pinChange(body, callback) {
        body.old_pin = PinEnforcer.encryptPin(body.old_pin);
        body.new_pin = PinEnforcer.encryptPin(body.new_pin);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_CHANGE), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    pinUnblock(body, callback) {
        body.puk = PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }
    getCertificate(certUrl, options, params, headers) {
        let self = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, this.pin).then(() => {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params, headers).then(certData => {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, err => { return ResponseHandler.error(err, options.callback); });
        });
    }
    getCertificateArray(certUrl, options, params, headers) {
        let self = this;
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, this.pin).then(() => {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params, headers).then(certData => {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, err => { return ResponseHandler.error(err, options.callback); });
        });
    }
}
EidLux.CONTAINER_PREFIX = 'luxeid';
EidLux.BIOMETRIC = '/biometric';
EidLux.ADDRESS = '/address';
EidLux.PHOTO = '/picture';
EidLux.SIGNATURE_IMAGE = '/signature-image';
EidLux.PIN_CHANGE = '/change-pin';
EidLux.PIN_RESET = '/reset-pin';
EidLux.PIN_TRY_COUNTER = '/pin-try-counter';
//# sourceMappingURL=EidLux.js.map