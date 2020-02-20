"use strict";
exports.__esModule = true;
var CHALLENGE = '/challenge';
var CERTIFICATE = '/certs/validate-chain';
var SYSTEM_STATUS = '/system/status';
var SIGNATURE = '/signature/validate';
/**
 * Provides access to OCV endpoints
 */
var OCVClient = /** @class */ (function () {
    function OCVClient(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    OCVClient.prototype.getUrl = function () { return this.url; };
    OCVClient.prototype.validateSignature = function (data, callback) {
        return this.connection.post(this.url, SIGNATURE, data, undefined, undefined, callback);
    };
    OCVClient.prototype.getInfo = function (callback) {
        return this.connection.get(this.getUrl(), SYSTEM_STATUS, undefined, undefined, callback);
    };
    OCVClient.prototype.getChallenge = function (digestAlgorithm, callback) {
        return this.connection.get(this.url, CHALLENGE, { digest: digestAlgorithm }, undefined, callback);
    };
    OCVClient.prototype.validateChallengeSignedHash = function (data, callback) {
        return this.connection.post(this.url, CHALLENGE, data, undefined, undefined, callback);
    };
    OCVClient.prototype.validateCertificateChain = function (data, callback) {
        return this.connection.post(this.url, CERTIFICATE, data, undefined, undefined, callback);
    };
    return OCVClient;
}());
exports.OCVClient = OCVClient;
