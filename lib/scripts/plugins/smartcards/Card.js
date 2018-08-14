"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PinEnforcer_1 = require("../../util/PinEnforcer");
var CertParser_1 = require("../../util/CertParser");
var ResponseHandler_1 = require("../../util/ResponseHandler");
var RequestHandler_1 = require("../../util/RequestHandler");
var GenericContainer_1 = require("../GenericContainer");
var OptionalPin = (function () {
    function OptionalPin(pin, pace, private_key_reference) {
        this.pin = pin;
        this.pace = pace;
    }
    return OptionalPin;
}());
exports.OptionalPin = OptionalPin;
var AuthenticateOrSignData = (function (_super) {
    __extends(AuthenticateOrSignData, _super);
    function AuthenticateOrSignData(algorithm_reference, data, pin, pace) {
        var _this = _super.call(this, pin, pace) || this;
        _this.algorithm_reference = algorithm_reference;
        _this.data = data;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return AuthenticateOrSignData;
}(OptionalPin));
exports.AuthenticateOrSignData = AuthenticateOrSignData;
var VerifyPinData = (function (_super) {
    __extends(VerifyPinData, _super);
    function VerifyPinData(private_key_reference, pin, pace) {
        var _this = _super.call(this, pin, pace) || this;
        _this.private_key_reference = private_key_reference;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return VerifyPinData;
}(OptionalPin));
exports.VerifyPinData = VerifyPinData;
var ResetPinData = (function () {
    function ResetPinData(puk, new_pin, private_key_reference) {
        this.puk = puk;
        this.new_pin = new_pin;
        this.private_key_reference = private_key_reference;
    }
    return ResetPinData;
}());
exports.ResetPinData = ResetPinData;
var PinTryCounterData = (function () {
    function PinTryCounterData(pin_reference) {
        this.pin_reference = pin_reference;
    }
    return PinTryCounterData;
}());
exports.PinTryCounterData = PinTryCounterData;
var GenericReaderContainer = (function (_super) {
    __extends(GenericReaderContainer, _super);
    function GenericReaderContainer(baseUrl, containerUrl, connection, reader_id, containerPrefix) {
        var _this = _super.call(this, baseUrl, containerUrl, connection, containerPrefix) || this;
        _this.baseUrl = baseUrl;
        _this.containerUrl = containerUrl;
        _this.connection = connection;
        _this.reader_id = reader_id;
        _this.containerPrefix = containerPrefix;
        return _this;
    }
    GenericReaderContainer.prototype.containerSuffix = function (path) {
        _super.prototype.containerSuffix.call(this, path);
        var suffix = this.containerUrl;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }
        return suffix;
    };
    return GenericReaderContainer;
}(GenericContainer_1.GenericContainer));
exports.GenericReaderContainer = GenericReaderContainer;
var GenericSmartCard = (function (_super) {
    __extends(GenericSmartCard, _super);
    function GenericSmartCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericSmartCard.prototype.allData = function (options, callback) {
        var requestOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), requestOptions.params).then(function (data) {
            return CertParser_1.CertParser.process(data, requestOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    return GenericSmartCard;
}(GenericReaderContainer));
exports.GenericSmartCard = GenericSmartCard;
var GenericPinCard = (function (_super) {
    __extends(GenericPinCard, _super);
    function GenericPinCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericPinCard.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(GenericPinCard.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    GenericPinCard.VERIFY_PIN = '/verify-pin';
    return GenericPinCard;
}(GenericSmartCard));
exports.GenericPinCard = GenericPinCard;
var GenericCertCard = (function (_super) {
    __extends(GenericCertCard, _super);
    function GenericCertCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericCertCard.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), undefined, undefined, callback);
    };
    GenericCertCard.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), undefined, undefined, callback);
    };
    GenericCertCard.prototype.allCerts = function (options, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.ALL_CERTIFICATES), reqOptions.params).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericCertCard.prototype.authenticate = function (body, callback) {
        var _this = this;
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(GenericCertCard.AUTHENTICATE), body, undefined, undefined, callback);
        });
    };
    GenericCertCard.prototype.signData = function (body, callback) {
        var _this = this;
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(GenericCertCard.SIGN_DATA), body, undefined, undefined, callback);
        });
    };
    GenericCertCard.prototype.getCertificate = function (certUrl, options) {
        var self = this;
        return self.connection.get(this.baseUrl, self.containerSuffix(GenericCertCard.ALL_CERTIFICATES + certUrl), undefined).then(function (data) {
            return CertParser_1.CertParser.process(data, options.parseCerts, options.callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, options.callback);
        });
    };
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
    return GenericCertCard;
}(GenericPinCard));
exports.GenericCertCard = GenericCertCard;
var GenericSecuredCertCard = (function (_super) {
    __extends(GenericSecuredCertCard, _super);
    function GenericSecuredCertCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericSecuredCertCard.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), undefined, undefined, callback);
    };
    GenericSecuredCertCard.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), undefined, undefined, callback);
    };
    GenericSecuredCertCard.prototype.allData = function (options, body, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(), body, reqOptions.params).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericSecuredCertCard.prototype.allCerts = function (options, body, callback) {
        var reqOptions = RequestHandler_1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES), body, reqOptions.params).then(function (data) {
            return CertParser_1.CertParser.process(data, reqOptions.parseCerts, callback);
        }, function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericSecuredCertCard.prototype.verifyPin = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(GenericSecuredCertCard.VERIFY_PIN), body, undefined, undefined, callback);
        });
    };
    GenericSecuredCertCard.prototype.signData = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), body, undefined, undefined, callback);
        });
    };
    GenericSecuredCertCard.prototype.authenticate = function (body, callback) {
        var _this = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body).then(function () {
            return _this.connection.post(_this.baseUrl, _this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), body, undefined, undefined, callback);
        });
    };
    GenericSecuredCertCard.prototype.getCertificate = function (certUrl, body, options, params) {
        var _this = this;
        var self = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body)
            .then(function () {
            return self.connection.post(_this.baseUrl, self.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES + certUrl), body, params);
        })
            .then(function (data) {
            return CertParser_1.CertParser.process(data, options.parseCerts, options.callback);
        }).catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, options.callback);
        });
    };
    GenericSecuredCertCard.prototype.getCertificateArray = function (certUrl, body, options, params) {
        var _this = this;
        var self = this;
        return PinEnforcer_1.PinEnforcer.check(this.connection, this.reader_id, body)
            .then(function () {
            return self.connection.post(_this.baseUrl, self.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES + certUrl), body, params);
        })
            .then(function (data) {
            return CertParser_1.CertParser.process(data, options.parseCerts, options.callback);
        }).catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, options.callback);
        });
    };
    GenericSecuredCertCard.ALL_CERTIFICATES = '/certificates';
    GenericSecuredCertCard.AUTHENTICATE = '/authenticate';
    GenericSecuredCertCard.CERT_AUTHENTICATION = '/authentication';
    GenericSecuredCertCard.CERT_NON_REPUDIATION = '/non-repudiation';
    GenericSecuredCertCard.CERT_INTERMEDIATE = '/intermediate';
    GenericSecuredCertCard.CERT_ROOT = '/root';
    GenericSecuredCertCard.CERT_SIGNING = '/signing';
    GenericSecuredCertCard.SIGN_DATA = '/sign';
    GenericSecuredCertCard.VERIFY_PIN = '/verify-pin';
    return GenericSecuredCertCard;
}(GenericReaderContainer));
exports.GenericSecuredCertCard = GenericSecuredCertCard;
//# sourceMappingURL=Card.js.map