import * as _ from 'lodash';
import { CertParser } from '../../../util/CertParser';
import { ResponseHandler } from '../../../util/ResponseHandler';
import * as platform from 'platform';
import { RequestHandler } from '../../../util/RequestHandler';
import { PinEnforcer } from '../../../util/PinEnforcer';
export class PKCS11 {
    constructor(baseUrl, containerUrl, connection) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        if (platform.os.family.indexOf('Win') > -1) {
            this.os = 'win';
        }
        if (platform.os.family.indexOf('OS X') > -1) {
            this.os = 'mac';
        }
        if (!this.os) {
            this.os = 'linux';
        }
        const moduleConfig = connection.cfg.pkcs11Config;
        if (moduleConfig && moduleConfig[this.os]) {
            this.modulePath = moduleConfig[this.os];
        }
    }
    certificates(slotId, options, callback) {
        let req = _.extend({ slot_id: slotId }, { module: this.modulePath });
        const reqOptions = RequestHandler.determineOptions(options, callback);
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.ALL_CERTIFICATES), req, undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    }
    info(callback) {
        let req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.INFO), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    signData(signData, callback) {
        let req = {
            module: this.modulePath,
            id: signData.cert_id,
            slot_id: signData.slot_id,
            pin: PinEnforcer.encryptPin(signData.pin),
            data: signData.data,
            digest: signData.algorithm_reference,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SIGN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    slots(callback) {
        let req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    slotsWithTokenPresent(callback) {
        let req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, { 'token-present': 'true' }).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    token(slotId, callback) {
        let req = _.extend({ slot_id: slotId }, { module: this.modulePath });
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    verifySignedData(verifyData, callback) {
        let req = {
            module: this.modulePath,
            id: verifyData.cert_id,
            slot_id: verifyData.slot_id,
            pin: PinEnforcer.encryptPin(verifyData.pin),
            data: verifyData.data,
            digest: verifyData.algorithm_reference,
            signature: verifyData.signature,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.VERIFY), req, undefined).then(data => {
            return ResponseHandler.response(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
    containerSuffix(path) {
        return this.containerUrl + path;
    }
}
PKCS11.ALL_CERTIFICATES = '/certificates';
PKCS11.INFO = '/info';
PKCS11.SIGN = '/sign';
PKCS11.SLOTS = '/slots';
PKCS11.TOKEN = '/token';
PKCS11.VERIFY = '/verify';
//# sourceMappingURL=pkcs11.js.map