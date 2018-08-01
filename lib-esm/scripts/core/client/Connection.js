import axios from 'axios';
import * as _ from 'lodash';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { UrlUtil } from '../../util/UrlUtil';
import * as store from 'store2';
import { BrowserFingerprint } from '../../util/BrowserFingerprint';
import { ResponseHandler } from '../../util/ResponseHandler';
export class GenericConnection {
    constructor(cfg) {
        this.cfg = cfg;
    }
    static disabledWithoutApiKey(callback) {
        return ResponseHandler.error(new T1CLibException(412, '901', 'Configuration must contain API key to use this method'), callback);
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
                url: UrlUtil.create(basePath, suffix, gclConfig, securityConfig.skipCitrixCheck),
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
                config.headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
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
                    axios.request(config).then((response) => {
                        GenericConnection.extractAccessToken(response.headers, gclConfig);
                        callback(null, response.data);
                        return resolve(response.data);
                    }).catch(function (error) {
                        if (!error.code && !error.response) {
                            const thrownError = new T1CLibException(500, '999', 'Network error occurred. Request could not be completed');
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
export class LocalAdminConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: true };
    }
}
export class LocalAuthAdminConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getRequestHeaders(headers) {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
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
            axios.get(UrlUtil.create(basePath, suffix, this.cfg, true), {
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
export class LocalAuthConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getRequestHeaders(headers) {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
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
            axios.get(UrlUtil.create(basePath, suffix, this.cfg, false), {
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
export class LocalConnection extends GenericConnection {
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
                headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }
            axios.post(UrlUtil.create(basePath, suffix, config, false), body, {
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
            headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        headers[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        return new Promise((resolve, reject) => {
            axios.post(UrlUtil.create(basePath, suffix, config, false), form, {
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
export class RemoteApiKeyConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getSecurityConfig() {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: true, sendToken: false, skipCitrixCheck: true };
    }
}
export class RemoteJwtConnection extends GenericConnection {
    constructor(cfg) {
        super(cfg);
        this.cfg = cfg;
    }
    getSecurityConfig() {
        return { sendGwJwt: true, sendGclJwt: false, sendApiKey: false, sendToken: false, skipCitrixCheck: true };
    }
}
export class LocalTestConnection extends GenericConnection {
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
                url: UrlUtil.create(basePath, suffix, gclConfig, true),
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
                axios.request(config).then((response) => {
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
//# sourceMappingURL=Connection.js.map