"use strict";
var SEPARATOR = "/";
var PLUGIN_CONTEXT_BEID = "/plugins/oberthur";
var NOOBERTHUR_ALL_CERTIFICATES = "/certificates";
var NOOBERTHUR_CERT_ROOT = NOOBERTHUR_ALL_CERTIFICATES + "/root";
var NOOBERTUR_CERT_ISSUER = NOOBERTHUR_ALL_CERTIFICATES + "/issuer";
var NOOBERTUR_CERT_AUTHENTICATION = NOOBERTHUR_ALL_CERTIFICATES + "/authentication";
var NOOBERTUR_CERT_SIGNING = NOOBERTHUR_ALL_CERTIFICATES + "/signing";
var NOOBERTUR_CERT_ENCRYPTION = NOOBERTHUR_ALL_CERTIFICATES + "/encryption";
var NOOBERTUR_VERIFY_PIN = "/verify-pin";
var NOOBERTUR_SIGN_DATA = "/sign";
var NOOBERTUR_AUTHENTICATE = "/authenticate";
function createFilter(filters) {
    return { filter: filters.join(',') };
}
var OberthurNo = (function () {
    // constructor
    function OberthurNo(url, connection, reader_id) {
        this.url = url;
        this.connection = connection;
        this.reader_id = reader_id;
        this.url = url + PLUGIN_CONTEXT_BEID;
    }
    // resolves the reader_id in the base URL
    OberthurNo.prototype.resolvedReaderURI = function () {
        return this.url + SEPARATOR + this.reader_id;
    };
    OberthurNo.prototype.rootCertificate = function (callback) {
    };
    OberthurNo.prototype.issuerCertificate = function (callback) {
    };
    OberthurNo.prototype.authenticationCertificate = function (callback) {
    };
    OberthurNo.prototype.signingCertificate = function (callback) {
    };
    OberthurNo.prototype.encryptionCertificate = function (callback) {
    };
    OberthurNo.prototype.verifyPin = function (body, callback) {
    };
    OberthurNo.prototype.signData = function (body, callback) {
    };
    OberthurNo.prototype.authenticate = function (body, callback) {
    };
    return OberthurNo;
}());
exports.OberthurNo = OberthurNo;
