import { PinEnforcer } from '../../util/PinEnforcer';
import { CertParser } from '../../util/CertParser';
import { ResponseHandler } from '../../util/ResponseHandler';
import { RequestHandler } from '../../util/RequestHandler';
import * as _ from 'lodash';
import { GenericContainer } from '../GenericContainer';
export class OptionalPin {
    constructor(pin, pace) {
        this.pin = pin;
        this.pace = pace;
    }
}
export class AuthenticateOrSignData extends OptionalPin {
    constructor(algorithm_reference, data, pin, pace) {
        super(pin, pace);
        this.algorithm_reference = algorithm_reference;
        this.data = data;
        this.pin = pin;
        this.pace = pace;
    }
}
export class VerifyPinData extends OptionalPin {
    constructor(private_key_reference, pin, pace) {
        super(pin, pace);
        this.private_key_reference = private_key_reference;
        this.pin = pin;
        this.pace = pace;
    }
}
export class ResetPinData {
    constructor(puk, new_pin, private_key_reference) {
        this.puk = puk;
        this.new_pin = new_pin;
        this.private_key_reference = private_key_reference;
    }
}
export class PinTryCounterData {
    constructor(pin_reference) {
        this.pin_reference = pin_reference;
    }
}
export class GenericReaderContainer extends GenericContainer {
    constructor(baseUrl, containerUrl, connection, reader_id, containerPrefix) {
        super(baseUrl, containerUrl, connection, containerPrefix);
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.reader_id = reader_id;
        this.containerPrefix = containerPrefix;
    }
    containerSuffix(path) {
        super.containerSuffix(path);
        let suffix = this.containerUrl;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += _.startsWith(path, '/') ? path : '/' + path;
        }
        return suffix;
    }
}
export class GenericSmartCard extends GenericReaderContainer {
    allData(options, callback) {
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), requestOptions.params).then(data => {
            return CertParser.process(data, requestOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
}
export class GenericPinCard extends GenericSmartCard {
    verifyPin(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericPinCard.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
}
GenericPinCard.VERIFY_PIN = '/verify-pin';
export class GenericCertCard extends GenericPinCard {
    allAlgoRefsForAuthentication(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), undefined, undefined, callback);
    }
    allAlgoRefsForSigning(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), undefined, undefined, callback);
    }
    allCerts(options, callback) {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.ALL_CERTIFICATES), reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    authenticate(body, callback) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), body, undefined, undefined, callback);
        });
    }
    signData(body, callback) {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), body, undefined, undefined, callback);
        });
    }
    getCertificate(certUrl, options) {
        let self = this;
        return self.connection.get(this.baseUrl, self.containerSuffix(GenericCertCard.ALL_CERTIFICATES + certUrl), undefined).then(data => {
            return CertParser.process(data, options.parseCerts, options.callback);
        }, err => {
            return ResponseHandler.error(err, options.callback);
        });
    }
}
GenericCertCard.ALL_CERTIFICATES = '/certificates';
GenericCertCard.AUTHENTICATE = '/authenticate';
GenericCertCard.CERT_ROOT = '/root';
GenericCertCard.CERT_AUTHENTICATION = '/authentication';
GenericCertCard.CERT_NON_REPUDIATION = '/non-repudiation';
GenericCertCard.CERT_ISSUER = '/issuer';
GenericCertCard.CERT_SIGNING = '/signing';
GenericCertCard.CERT_ENCRYPTION = '/encryption';
GenericCertCard.CERT_CITIZEN = '/citizen';
GenericCertCard.CERT_RRN = '/rrn';
GenericCertCard.SIGN_DATA = '/sign';
export class GenericSecuredCertCard extends GenericReaderContainer {
    allAlgoRefsForAuthentication(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), undefined, undefined, callback);
    }
    allAlgoRefsForSigning(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), undefined, undefined, callback);
    }
    allData(options, body, callback) {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(), body, reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    allCerts(options, body, callback) {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES), body, reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    verifyPin(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
    signData(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), body, undefined, undefined, callback);
        });
    }
    authenticate(body, callback) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), body, undefined, undefined, callback);
        });
    }
    getCertificate(certUrl, body, options, params) {
        let self = this;
        return PinEnforcer.check(this.connection, this.reader_id, body)
            .then(() => {
            return self.connection.post(this.baseUrl, self.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES + certUrl), body, params);
        })
            .then(data => {
            return CertParser.process(data, options.parseCerts, options.callback);
        }).catch(err => {
            return ResponseHandler.error(err, options.callback);
        });
    }
    getCertificateArray(certUrl, body, options, params) {
        let self = this;
        return PinEnforcer.check(this.connection, this.reader_id, body)
            .then(() => {
            return self.connection.post(this.baseUrl, self.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES + certUrl), body, params);
        })
            .then(data => {
            return CertParser.process(data, options.parseCerts, options.callback);
        }).catch(err => {
            return ResponseHandler.error(err, options.callback);
        });
    }
}
GenericSecuredCertCard.ALL_CERTIFICATES = '/certificates';
GenericSecuredCertCard.AUTHENTICATE = '/authenticate';
GenericSecuredCertCard.CERT_AUTHENTICATION = '/authentication';
GenericSecuredCertCard.CERT_NON_REPUDIATION = '/non-repudiation';
GenericSecuredCertCard.CERT_INTERMEDIATE = '/intermediate';
GenericSecuredCertCard.CERT_ROOT = '/root';
GenericSecuredCertCard.CERT_SIGNING = '/signing';
GenericSecuredCertCard.SIGN_DATA = '/sign';
GenericSecuredCertCard.VERIFY_PIN = '/verify-pin';
//# sourceMappingURL=Card.js.map