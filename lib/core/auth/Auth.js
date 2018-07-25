"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TOKEN = '/login/application/token';
var REFRESH = '/login/token/refresh';
var AuthClient = (function () {
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
//# sourceMappingURL=Auth.js.map