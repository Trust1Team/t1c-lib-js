"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOKEN = '/login/application/token';
const REFRESH = '/login/token/refresh';
class AuthClient {
    constructor(cfg, connection) {
        this.cfg = cfg;
        this.connection = connection;
        this.url = cfg.authUrl;
    }
    getJWT(callback) {
        return this.connection.get(this.url, TOKEN, undefined, undefined, callback);
    }
    refreshJWT(currentJWT, callback) {
        return this.connection.post(this.url, REFRESH, { token: currentJWT }, undefined, undefined, callback);
    }
}
exports.AuthClient = AuthClient;
//# sourceMappingURL=Auth.js.map