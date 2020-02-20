"use strict";
/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
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
var Card_1 = require("../Card");
var EMV = /** @class */ (function (_super) {
    __extends(EMV, _super);
    function EMV(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, EMV.CONTAINER_PREFIX) || this;
    }
    EMV.prototype.applicationData = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EMV.APPLICATION_DATA), undefined, undefined, callback);
    };
    EMV.prototype.applications = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EMV.APPLICATIONS), undefined, undefined, callback);
    };
    EMV.prototype.iccPublicKeyCertificate = function (aid, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EMV.ICC_PUBLIC_KEY_CERT), { aid: aid }, undefined, undefined, callback);
    };
    EMV.prototype.issuerPublicKeyCertificate = function (aid, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EMV.ISSUER_PUBLIC_KEY_CERT), { aid: aid }, undefined, undefined, callback);
    };
    EMV.CONTAINER_PREFIX = 'emv';
    EMV.APPLICATIONS = '/applications';
    EMV.APPLICATION_DATA = '/application-data';
    EMV.ISSUER_PUBLIC_KEY_CERT = '/issuer-public-key-certificate';
    EMV.ICC_PUBLIC_KEY_CERT = '/icc-public-key-certificate';
    return EMV;
}(Card_1.GenericPinCard));
exports.EMV = EMV;
