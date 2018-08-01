const TOKEN = '/login/application/token';
const REFRESH = '/login/token/refresh';
export class AuthClient {
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
//# sourceMappingURL=Auth.js.map