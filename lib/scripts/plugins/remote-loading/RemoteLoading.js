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
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../smartcards/Card");
var RemoteLoading = (function (_super) {
    __extends(RemoteLoading, _super);
    function RemoteLoading(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, RemoteLoading.CONTAINER_PREFIX) || this;
    }
    RemoteLoading.optionalSessionIdParam = function (sessionId) {
        if (sessionId && sessionId.length) {
            return { 'session-id': sessionId };
        }
        else {
            return undefined;
        }
    };
    RemoteLoading.prototype.atr = function (sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.ATR), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    };
    RemoteLoading.prototype.apdu = function (apdu, sessionId, callback) {
        var suffix = this.containerSuffix(RemoteLoading.APDU);
        if (Array.isArray(apdu)) {
            suffix = this.containerSuffix(RemoteLoading.APDUS);
        }
        return this.connection.post(this.baseUrl, suffix, apdu, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    };
    RemoteLoading.prototype.ccid = function (feature, command, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CCID), { feature: feature, apdu: command }, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    };
    RemoteLoading.prototype.ccidFeatures = function (sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CCID_FEATURES), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    };
    RemoteLoading.prototype.command = function (tx, sessionId, callback) {
        if (Array.isArray(tx)) {
            var body_1 = [];
            tx.forEach(function (txElem) { body_1.push({ tx: txElem }); });
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CMDS), body_1, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
        }
        else {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CMD), { tx: tx }, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
        }
    };
    RemoteLoading.prototype.closeSession = function (sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CLOSE_SESSION), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    };
    RemoteLoading.prototype.isPresent = function (sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.IS_PRESENT), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    };
    RemoteLoading.prototype.openSession = function (timeout, callback) {
        if (timeout && timeout > 0) {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION), { timeout: timeout }, undefined, undefined, callback);
        }
        else {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION), { timeout: this.connection.cfg.defaultSessionTimeout }, undefined, undefined, callback);
        }
    };
    RemoteLoading.CONTAINER_PREFIX = 'readerapi';
    RemoteLoading.ATR = '/atr';
    RemoteLoading.APDU = '/apdu';
    RemoteLoading.APDUS = '/apdus';
    RemoteLoading.CCID = '/ccid';
    RemoteLoading.CCID_FEATURES = '/ccid-features';
    RemoteLoading.CMD = '/command';
    RemoteLoading.CMDS = '/commands';
    RemoteLoading.CLOSE_SESSION = '/close-session';
    RemoteLoading.IS_PRESENT = '/is-present';
    RemoteLoading.OPEN_SESSION = '/open-session';
    return RemoteLoading;
}(Card_1.GenericReaderContainer));
exports.RemoteLoading = RemoteLoading;
//# sourceMappingURL=RemoteLoading.js.map