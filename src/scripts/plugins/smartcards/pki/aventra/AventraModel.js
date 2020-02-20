"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CoreModel_1 = require("../../../../core/service/CoreModel");
var AventraAllCertsResponse = /** @class */ (function (_super) {
    __extends(AventraAllCertsResponse, _super);
    function AventraAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AventraAllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.AventraAllCertsResponse = AventraAllCertsResponse;
var AventraAllCerts = /** @class */ (function () {
    function AventraAllCerts(authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
    return AventraAllCerts;
}());
exports.AventraAllCerts = AventraAllCerts;
var AventraAllDataResponse = /** @class */ (function (_super) {
    __extends(AventraAllDataResponse, _super);
    function AventraAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return AventraAllDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.AventraAllDataResponse = AventraAllDataResponse;
var AventraAllData = /** @class */ (function () {
    function AventraAllData(applet_info, authentication_certificate, encryption_certificate, issuer_certificate, signing_certificate, root_certificate) {
        this.applet_info = applet_info;
        this.authentication_certificate = authentication_certificate;
        this.encryption_certificate = encryption_certificate;
        this.issuer_certificate = issuer_certificate;
        this.signing_certificate = signing_certificate;
        this.root_certificate = root_certificate;
    }
    return AventraAllData;
}());
exports.AventraAllData = AventraAllData;
var AventraAppletInfo = /** @class */ (function () {
    function AventraAppletInfo(change_counter, name, serial, version) {
        this.change_counter = change_counter;
        this.name = name;
        this.serial = serial;
        this.version = version;
    }
    return AventraAppletInfo;
}());
exports.AventraAppletInfo = AventraAppletInfo;
