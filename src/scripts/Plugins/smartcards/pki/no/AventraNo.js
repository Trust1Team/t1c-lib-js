"use strict";
var SEPARATOR = "/";
var PLUGIN_CONTEXT_BEID = "/plugins/beid";
var NOAVENTRA_ALL_CERTIFICATES = "/certificates";
var NOAVENTRA_CERT_ROOT = NOAVENTRA_ALL_CERTIFICATES + "/root";
var NOAVENTRA_CERT_ISSUER = NOAVENTRA_ALL_CERTIFICATES + "/issuer";
var NOAVENTRA_CERT_AUTHENTICATION = NOAVENTRA_ALL_CERTIFICATES + "/authentication";
var NOAVENTRA_CERT_SIGNING = NOAVENTRA_ALL_CERTIFICATES + "/signing";
var NOAVENTRA_CERT_ENCRYPTION = NOAVENTRA_ALL_CERTIFICATES + "/encryption";
var NOAVENTRA_VERIFY_PIN = "/verify-pin";
var NOAVENTRA_SIGN_DATA = "/sign";
var NOAVENTRA_AUTHENTICATE = "/authenticate";
function createFilter(filters) {
    return { filter: filters.join(',') };
}
var AventraNo = (function () {
    // constructor
    function AventraNo(url, connection, reader_id) {
        this.url = url;
        this.connection = connection;
        this.reader_id = reader_id;
        this.url = url + PLUGIN_CONTEXT_BEID;
    }
    // resolves the reader_id in the base URL
    AventraNo.prototype.resolvedReaderURI = function () {
        return this.url + SEPARATOR + this.reader_id;
    };
    AventraNo.prototype.rootCertificate = function (callback) {
    };
    AventraNo.prototype.issuerCertificate = function (callback) {
    };
    AventraNo.prototype.authenticationCertificate = function (callback) {
    };
    AventraNo.prototype.signingCertificate = function (callback) {
    };
    AventraNo.prototype.encryptionCertificate = function (callback) {
    };
    AventraNo.prototype.verifyPin = function (body, callback) {
    };
    AventraNo.prototype.signData = function (body, callback) {
    };
    AventraNo.prototype.authenticate = function (body, callback) {
    };
    return AventraNo;
}());
exports.AventraNo = AventraNo;
