"use strict";
var SEPARATOR = "/";
var PLUGIN_CONTEXT_EID = "/plugins/eid";
function createFilter(filters) {
    return { filter: filters.join(',') };
}
var Eid = (function () {
    // constructor
    function Eid(url, connection, reader_id) {
        this.url = url;
        this.connection = connection;
        this.reader_id = reader_id;
        this.url = url + PLUGIN_CONTEXT_EID;
    }
    // resolves the reader_id in the base URL
    Eid.prototype.resolvedReaderURI = function () {
        return this.url + SEPARATOR + this.reader_id;
    };
    Eid.prototype.holder = function (callback) {
    };
    Eid.prototype.address = function (callback) {
    };
    Eid.prototype.picture = function (callback) {
    };
    Eid.prototype.certificates = function (callback) {
    };
    Eid.prototype.verifyPin = function (body, callback) {
    };
    Eid.prototype.signData = function (body, callback) {
    };
    Eid.prototype.authenticate = function (body, callback) {
    };
    return Eid;
}());
