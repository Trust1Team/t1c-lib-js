"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
const PinEnforcer_1 = require("../../../util/PinEnforcer");
const RequestHandler_1 = require("../../../util/RequestHandler");
class PIV extends Card_1.GenericSecuredCertCard {
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
            PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined));
                }, error => { reject(error); });
            });
        }
    }
    facialImage(body, callback) {
        if (callback && typeof callback === 'function') {
            PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined));
                }, error => { reject(error); });
            });
        }
    }
    authenticationCertificate(body, options, callback) {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, RequestHandler_1.RequestHandler.determineOptions(options, callback), undefined);
    }
    signingCertificate(body, options, callback) {
        return this.getCertificate(PIV.CERT_SIGNING, body, RequestHandler_1.RequestHandler.determineOptions(options, callback));
    }
}
PIV.CONTAINER_PREFIX = 'piv';
PIV.PRINTED_INFORMATION = '/printed-information';
PIV.FACIAL_IMAGE = '/facial-image';
exports.PIV = PIV;
//# sourceMappingURL=piv.js.map