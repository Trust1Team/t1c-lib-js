"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CertParser_1 = require("../../../util/CertParser");
var ResponseHandler_1 = require("../../../util/ResponseHandler");
var platform = require("platform");
var RequestHandler_1 = require("../../../util/RequestHandler");
var PinEnforcer_1 = require("../../../util/PinEnforcer");
var ActivatedContainerUtil_1 = require("../../../util/ActivatedContainerUtil");
var PKCS11 = (function () {
    function PKCS11(baseUrl, containerUrl, connection) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        if (platform.os.family) {
            if (platform.os.family.indexOf('Win') > -1) {
                this.os = 'win';
            }
            if (platform.os.family.indexOf('OS X') > -1) {
                this.os = 'mac';
            }
            if (!this.os) {
                this.os = 'linux';
            }
        }
        else {
            this.os = 'win';
        }
        var moduleConfig = connection.cfg.pkcs11Config;
        if (moduleConfig && moduleConfig[this.os]) {
            this.modulePath = moduleConfig[this.os];
        }
    }
    PKCS11.prototype.certificates = function (slotId, options, callback) {
        var req = Object.assign({ slot_id: slotId }, { module: this.modulePath });
        var reqOptions = RequestHandler_1.RequestHandler.determineOptions(options, callback);
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.ALL_CERTIFICATES), req, undefined).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, reqOptions.callback);
        });
    };
    PKCS11.prototype.info = function (callback) {
        var req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.INFO), req, undefined).then(function (data) {
            return ResponseHandler_1.ResponseHandler.response(data, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    PKCS11.prototype.signData = function (signData, callback) {
        var req = {
            module: this.modulePath,
            id: signData.cert_id,
            slot_id: signData.slot_id,
            pin: PinEnforcer_1.PinEnforcer.encryptPin(signData.pin),
            data: signData.data,
            digest: signData.algorithm_reference,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SIGN), req, undefined).then(function (data) {
            return ResponseHandler_1.ResponseHandler.response(data, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    PKCS11.prototype.slots = function (callback) {
        var req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, undefined).then(function (data) {
            return ResponseHandler_1.ResponseHandler.response(data, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    PKCS11.prototype.slotsWithTokenPresent = function (callback) {
        var req = { module: this.modulePath };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.SLOTS), req, { 'token-present': 'true' }).then(function (data) {
            return ResponseHandler_1.ResponseHandler.response(data, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    PKCS11.prototype.token = function (slotId, callback) {
        var req = Object.assign({ slot_id: slotId }, { module: this.modulePath });
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.TOKEN), req, undefined).then(function (data) {
            return ResponseHandler_1.ResponseHandler.response(data, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    PKCS11.prototype.verifySignedData = function (verifyData, callback) {
        var req = {
            module: this.modulePath,
            id: verifyData.cert_id,
            slot_id: verifyData.slot_id,
            pin: PinEnforcer_1.PinEnforcer.encryptPin(verifyData.pin),
            data: verifyData.data,
            digest: verifyData.algorithm_reference,
            signature: verifyData.signature,
            pinpad: false,
            os_dialog: this.connection.cfg.osPinDialog
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(PKCS11.VERIFY), req, undefined).then(function (data) {
            return ResponseHandler_1.ResponseHandler.response(data, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    PKCS11.prototype.containerSuffix = function (path) {
        var containername = ActivatedContainerUtil_1.ActivatedContainerUtil.getContainerFor(this.connection.cfg, 'pkcs11');
        this.containerUrl = PKCS11.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) {
            return this.containerUrl + path;
        }
        else {
            return this.containerUrl;
        }
    };
    PKCS11.CONTAINER_NEW_CONTEXT_PATH = '/containers/';
    PKCS11.ALL_CERTIFICATES = '/certificates';
    PKCS11.INFO = '/info';
    PKCS11.SIGN = '/sign';
    PKCS11.SLOTS = '/slots';
    PKCS11.TOKEN = '/token';
    PKCS11.VERIFY = '/verify';
    return PKCS11;
}());
exports.PKCS11 = PKCS11;
//# sourceMappingURL=pkcs11.js.map