"use strict";
var SEPARATOR = "/";
var PLUGIN_CONTEXT_BEID = "/plugins/beid";
var NOOBERTUR_ALL_CERTIFICATES = "/certificates";
var NOOBERTUR_CERT_ROOT = NOOBERTUR_ALL_CERTIFICATES + "/root";
var NOOBERTUR_CERT_ISSUER = NOOBERTUR_ALL_CERTIFICATES + "/issuer";
var NOOBERTUR_CERT_AUTHENTICATION = NOOBERTUR_ALL_CERTIFICATES + "/authentication";
var NOOBERTUR_CERT_SIGNING = NOOBERTUR_ALL_CERTIFICATES + "/signing";
var NOOBERTUR_CERT_ENCRYPTION = NOOBERTUR_ALL_CERTIFICATES + "/encryption";
var NOOBERTUR_VERIFY_PIN = "/verify-pin";
var NOOBERTUR_SIGN_DATA = "/sign";
var NOOBERTUR_AUTHENTICATE = "/authenticate";
function createFilter(filters) {
    return { filter: filters.join(',') };
}
var OberturNo = (function () {
    // constructor
    function OberturNo(url, connection, reader_id) {
        this.url = url;
        this.connection = connection;
        this.reader_id = reader_id;
        this.url = url + PLUGIN_CONTEXT_BEID;
    }
    // resolves the reader_id in the base URL
    OberturNo.prototype.resolvedReaderURI = function () {
        return this.url + SEPARATOR + this.reader_id;
    };
    OberturNo.prototype.rootCertificate = function (callback) {
    };
    OberturNo.prototype.issuerCertificate = function (callback) {
    };
    OberturNo.prototype.authenticationCertificate = function (callback) {
    };
    OberturNo.prototype.signingCertificate = function (callback) {
    };
    OberturNo.prototype.encryptionCertificate = function (callback) {
    };
    OberturNo.prototype.verifyPin = function (body, callback) {
    };
    OberturNo.prototype.signData = function (body, callback) {
    };
    OberturNo.prototype.authenticate = function (body, callback) {
    };
    return OberturNo;
}());
exports.OberturNo = OberturNo;
