"use strict";
exports.__esModule = true;
var TOKEN = '/login/application/token';
var REFRESH = '/login/token/refresh';
/**
 * Methods for API Gateway JWT token retrieval/refreshing
 */
var AuthClient = /** @class */ (function () {
    function AuthClient(cfg, connection) {
        this.cfg = cfg;
        this.connection = connection;
        this.url = cfg.authUrl;
    }
    AuthClient.prototype.getJWT = function (callback) {
        return this.connection.get(this.url, TOKEN, undefined, undefined, callback);
    };
    AuthClient.prototype.refreshJWT = function (currentJWT, callback) {
        return this.connection.post(this.url, REFRESH, { token: currentJWT }, undefined, undefined, callback);
    };
    return AuthClient;
}());
exports.AuthClient = AuthClient;
