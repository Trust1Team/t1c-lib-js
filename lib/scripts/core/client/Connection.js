"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const _ = require("lodash");
const CoreExceptions_1 = require("../exceptions/CoreExceptions");
const UrlUtil_1 = require("../../util/UrlUtil");
const store = require("store2");
const BrowserFingerprint_1 = require("../../util/BrowserFingerprint");
const ResponseHandler_1 = require("../../util/ResponseHandler");
class GenericConnection {
    constructor(cfg) {
        this.cfg = cfg;
    }
    static disabledWithoutApiKey(callback) {
        return ResponseHandler_1.ResponseHandler.error(new CoreExceptions_1.T1CLibException(412, '901', 'Configuration must contain API key to use this method'), callback);
    }
    static extractAccessToken(headers, config) {
        if (headers && headers.access_token) {
            config.gclJwt = headers.access_token;
        }
    }
    get(basePath, suffix, queryParams, headers, callback) {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, headers, callback);
        }
    }
    post(basePath, suffix, body, queryParams, headers, callback) {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig, body, queryParams, headers, callback);
        }
    }
    put(basePath, suffix, body, queryParams, headers, callback) {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'PUT', this.cfg, securityConfig, body, queryParams, headers, callback);
        }
    }
    delete(basePath, suffix, queryParams, headers, callback) {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'DELETE', this.cfg, securityConfig, undefined, queryParams, headers, callback);
        }
    }
    getRequestHeaders(headers) {
        let reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        return reqHeaders;
    }
    getSecurityConfig() {
        return { sendGwJwt: true, sendGclJwt: false, sendApiKey: true, sendToken: true, skipCitrixCheck: false };
    }
    handleRequest(basePath, suffix, method, gclConfig, securityConfig, body, params, headers, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        if (securityConfig.skipCitrixCheck || !gclConfig.citrix || gclConfig.agentPort !== -1) {
            let config = {
                url: UrlUtil_1.UrlUtil.create(basePath, suffix, gclConfig, securityConfig.skipCitrixCheck),
                method,
                headers: this.getRequestHeaders(headers),
                responseType: 'json'
            };
            if (body) {
                config.data = body;
            }
            if (params) {
                config.params = params;
            }
            if (securityConfig.sendApiKey) {
                config.headers.apikey = gclConfig.apiKey;
            }
            if (securityConfig.sendGclJwt) {
                config.headers.Authorization = 'Bearer ' + gclConfig.gclJwt;
            }
            if (gclConfig.tokenCompatible && securityConfig.sendToken) {
                config.headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint_1.BrowserFingerprint.get();
            }
            return new Promise((resolve, reject) => {
                let securityPromise;
                if (securityConfig.sendGwJwt) {
                    securityPromise = gclConfig.gwJwt;
                }
                else {
                    securityPromise = Promise.resolve('');
                }
                securityPromise.then(jwt => {
                    if (securityConfig.sendGwJwt) {
                        config.headers.Authorization = 'Bearer ' + jwt;
                    }
                    axios_1.default.request(config).then((response) => {
                        GenericConnection.extractAccessToken(response.headers, gclConfig);
                        callback(null, response.data);
                        return resolve(response.data);
                    }).catch(function (error) {
                        if (!error.code && !error.response) {
                            const thrownError = new CoreExceptions_1.T1CLibException(500, '999', 'Network error occurred. Request could not be completed');
                            callback(thrownError, null);
                            return reject(thrownError);
                        }
                        else {
                            if (error.response) {
                                if (error.response.data) {
                                    callback(error.response.data, null);
                                    return reject(error.response.data);
                                }
                                else {
                                    callback(error.response, null);
                                    return reject(error.response);
                                }
                            }
                            else {
                                callback(error, null);
                                return reject(error);
                            }
                        }
                    });
                }, err => {
                    return reject(err);
                });
            });
        }
        else {
            let agentPortError = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
    }
}
GenericConnection.AUTH_TOKEN_HEADER = 'X-Authentication-Token';
GenericConnection.BROWSER_AUTH_TOKEN = 't1c-js-browser-id-token';
GenericConnection.RELAY_STATE_HEADER_PREFIX = 'X-Relay-State-';
GenericConnection.HEADER_GCL_LANG = 'X-Language-Code';
exports.GenericConnection = GenericConnection;
class LocalAdminConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: true };
    }
}
exports.LocalAdminConnection = LocalAdminConnection;
class LocalAuthAdminConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getRequestHeaders(headers) {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint_1.BrowserFingerprint.get();
        }
        return reqHeaders;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: true };
    }
    requestLogFile(basePath, suffix, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        let headers = this.getRequestHeaders({});
        return new Promise((resolve, reject) => {
            axios_1.default.get(UrlUtil_1.UrlUtil.create(basePath, suffix, this.cfg, true), {
                responseType: 'blob', headers
            }).then(response => {
                callback(null, response);
                return resolve(response);
            }, error => {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    }
                    else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                }
                else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
}
exports.LocalAuthAdminConnection = LocalAuthAdminConnection;
class LocalAuthConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getRequestHeaders(headers) {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint_1.BrowserFingerprint.get();
        }
        return reqHeaders;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: false };
    }
    getSkipCitrix(basePath, suffix, queryParams, headers, callback) {
        let securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, this.getRequestHeaders(headers), callback);
    }
    postSkipCitrix(basePath, suffix, queryParams, body, headers, callback) {
        let securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig, body, queryParams, this.getRequestHeaders(headers), callback);
    }
    requestLogFile(basePath, suffix, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise((resolve, reject) => {
            let headers = this.getRequestHeaders({});
            axios_1.default.get(UrlUtil_1.UrlUtil.create(basePath, suffix, this.cfg, false), {
                responseType: 'blob', headers
            }).then(response => {
                callback(null, response);
                return resolve(response);
            }, error => {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    }
                    else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                }
                else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
}
exports.LocalAuthConnection = LocalAuthConnection;
class LocalConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getRequestHeaders(headers) {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        let contextToken = this.cfg.contextToken;
        if (contextToken && !_.isNil(contextToken)) {
            reqHeaders[LocalConnection.RELAY_STATE_HEADER_PREFIX + this.cfg.contextToken] = this.cfg.contextToken;
        }
        return reqHeaders;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: false };
    }
    getSkipCitrix(basePath, suffix, queryParams, headers, callback) {
        let securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, headers, callback);
    }
    requestFile(basePath, suffix, body, callback) {
        let config = _.omit(this.cfg, ['apiKey', 'jwt']);
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise((resolve, reject) => {
            let headers = {};
            headers[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
            if (config.tokenCompatible && this.getSecurityConfig().sendToken) {
                headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint_1.BrowserFingerprint.get();
            }
            axios_1.default.post(UrlUtil_1.UrlUtil.create(basePath, suffix, config, false), body, {
                responseType: 'arraybuffer', headers
            }).then(response => {
                callback(null, response.data);
                return resolve(response.data);
            }, error => {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    }
                    else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                }
                else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
    postFile(basePath, suffix, body, queryParams, callback) {
        let config = _.omit(this.cfg, ['apiKey', 'jwt']);
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        const form = new FormData();
        form.append('entity', body.entity);
        form.append('type', body.type);
        form.append('filename', body.filename);
        if (body.relPathInput) {
            form.append('rel_path', body.relPathInput);
        }
        if (body.implicit_creation_type) {
            form.append('implicit_creation_type', body.implicit_creation_type);
        }
        if (body.notify_on_completion) {
            form.append('notify_on_completion', body.notify_on_completion);
        }
        form.append('file', body.file);
        let headers = { 'Content-Type': 'multipart/form-data' };
        if (config.tokenCompatible && this.getSecurityConfig().sendToken) {
            headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint_1.BrowserFingerprint.get();
        }
        headers[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        return new Promise((resolve, reject) => {
            axios_1.default.post(UrlUtil_1.UrlUtil.create(basePath, suffix, config, false), form, {
                headers
            }).then(response => {
                callback(null, response.data);
                return resolve(response.data);
            }, error => {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    }
                    else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                }
                else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
}
exports.LocalConnection = LocalConnection;
class RemoteApiKeyConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: true, sendToken: false, skipCitrixCheck: true };
    }
}
exports.RemoteApiKeyConnection = RemoteApiKeyConnection;
class RemoteJwtConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getSecurityConfig() {
        return { sendGwJwt: true, sendGclJwt: false, sendApiKey: false, sendToken: false, skipCitrixCheck: true };
    }
}
exports.RemoteJwtConnection = RemoteJwtConnection;
class LocalTestConnection extends GenericConnection {
    constructor() {
        super(...arguments);
        this.config = undefined;
    }
    get(basePath, suffix, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'GET', this.config, undefined, queryParams, headers, callback);
    }
    post(basePath, suffix, body, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'POST', this.config, body, queryParams, headers, callback);
    }
    put(basePath, suffix, body, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'PUT', this.config, body, queryParams, headers, callback);
    }
    delete(basePath, suffix, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'DELETE', this.config, undefined, queryParams, headers, callback);
    }
    getRequestHeaders(headers) {
        let reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        reqHeaders['X-Consumer-Username'] = 'testorg.testapp.v1';
        reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = store.get(GenericConnection.BROWSER_AUTH_TOKEN);
        return reqHeaders;
    }
    handleTestRequest(basePath, suffix, method, gclConfig, body, params, headers, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        if (gclConfig.citrix && gclConfig.agentPort === -1) {
            let agentPortError = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
        else {
            let config = {
                url: UrlUtil_1.UrlUtil.create(basePath, suffix, gclConfig, true),
                method,
                headers: this.getRequestHeaders(headers),
                responseType: 'json'
            };
            if (body) {
                config.data = body;
            }
            if (params) {
                config.params = params;
            }
            if (gclConfig.gclJwt) {
                config.headers.Authorization = 'Bearer ' + gclConfig.gclJwt;
            }
            return new Promise((resolve, reject) => {
                axios_1.default.request(config).then((response) => {
                    callback(null, response.data);
                    return resolve(response.data);
                }).catch(function (error) {
                    if (error.response) {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                    else {
                        callback(error, null);
                        return reject(error);
                    }
                });
            });
        }
    }
}
exports.LocalTestConnection = LocalTestConnection;
//# sourceMappingURL=Connection.js.map