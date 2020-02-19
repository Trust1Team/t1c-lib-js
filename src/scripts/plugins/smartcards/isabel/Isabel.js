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
var Card_1 = require("../Card");
var __1 = require("../../../..");
var ISABEL_CARD_ID = '/card-id';
var ISABEL_CERT_ROOT = '/certificates/root';
var ISABEL_CERT_NON_REPUDIATION = '/certificates/signing';
var ISABEL_AUTHENTICATE = '/authenticate';
var ISABEL_SIGN_DATA = '/sign';
var Isabel = /** @class */ (function (_super) {
    __extends(Isabel, _super);
    function Isabel(baseUrl, containerUrl, connection, reader_id, runInUserSpace) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Isabel.CONTAINER_PREFIX, runInUserSpace) || this;
    }
    Isabel.prototype.allDataFilters = function () {
        return ['card-id'];
    };
    Isabel.prototype.allData = function (options, callback) {
        var requestOptions = __1.RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), requestOptions.params);
    };
    Isabel.prototype.cardId = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_CARD_ID), undefined, undefined, callback);
    };
    Isabel.prototype.rootCertificate = function (callback) {
        // tslint:disable-next-line:comment-format
        // Fetching the root should always be done in the admin space as the user has no rights to the admin root cert (stored in the OS root cert store)
        var suffix = this.containerSuffix(ISABEL_CERT_ROOT);
        suffix = suffix.replace('/agent/0', '');
        return this.connection.get(this.baseUrl, suffix, undefined, undefined, callback);
    };
    Isabel.prototype.nonRepudiationCertificate = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_CERT_NON_REPUDIATION), undefined, undefined, callback);
    };
    Isabel.prototype.allAlgoRefsForAuthentication = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_AUTHENTICATE), undefined, undefined, callback);
    };
    Isabel.prototype.allAlgoRefsForSigning = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(ISABEL_SIGN_DATA), undefined, undefined, callback);
    };
    Isabel.prototype.signData = function (body, callback) {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(ISABEL_SIGN_DATA), body, undefined, undefined, callback);
    };
    Isabel.prototype.authenticate = function (body, callback) {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(ISABEL_AUTHENTICATE), body, undefined, undefined, callback);
    };
    Isabel.CONTAINER_PREFIX = 'isabel';
    return Isabel;
}(Card_1.GenericReaderContainer));
exports.Isabel = Isabel;
