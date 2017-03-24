"use strict";
var SEPARATOR = "/";
var PLUGIN_CONTEXT_PKI = "/plugins/pki";
function createFilter(filters) {
    return { filter: filters.join(',') };
}
var Pki = (function () {
    // constructor
    function Pki(url, connection, reader_id) {
        this.url = url;
        this.connection = connection;
        this.reader_id = reader_id;
        this.url = url + PLUGIN_CONTEXT_PKI;
    }
    // resolves the reader_id in the base URL
    Pki.prototype.resolvedReaderURI = function () {
        return this.url + SEPARATOR + this.reader_id;
    };
    Pki.prototype.certificates = function (callback) {
    };
    Pki.prototype.verifyPin = function (body, callback) {
    };
    Pki.prototype.signData = function (body, callback) {
    };
    Pki.prototype.authenticate = function (body, callback) {
    };
    return Pki;
}());
