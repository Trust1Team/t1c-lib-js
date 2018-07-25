var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import axios from 'axios';
import * as _ from 'lodash';
import { RestException } from '../exceptions/CoreExceptions';
import { UrlUtil } from '../../util/UrlUtil';
import * as store from 'store2';
import { BrowserFingerprint } from '../../util/BrowserFingerprint';
import { ResponseHandler } from '../../util/ResponseHandler';
var GenericConnection = (function () {
    function GenericConnection(cfg) {
        this.cfg = cfg;
    }
    GenericConnection.disabledWithoutApiKey = function (callback) {
        return ResponseHandler.error(new RestException(412, '901', 'Configuration must contain API key to use this method'), callback);
    };
    GenericConnection.extractAccessToken = function (headers, config) {
        if (headers && headers.access_token) {
            config.gclJwt = headers.access_token;
        }
    };
    GenericConnection.prototype.get = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, headers, callback);
        }
    };
    GenericConnection.prototype.post = function (basePath, suffix, body, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig, body, queryParams, headers, callback);
        }
    };
    GenericConnection.prototype.put = function (basePath, suffix, body, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'PUT', this.cfg, securityConfig, body, queryParams, headers, callback);
        }
    };
    GenericConnection.prototype.delete = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        }
        else {
            return this.handleRequest(basePath, suffix, 'DELETE', this.cfg, securityConfig, undefined, queryParams, headers, callback);
        }
    };
    GenericConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        return reqHeaders;
    };
    GenericConnection.prototype.getSecurityConfig = function () {
        return { sendGwJwt: true, sendGclJwt: false, sendApiKey: true, sendToken: true, skipCitrixCheck: false };
    };
    GenericConnection.prototype.handleRequest = function (basePath, suffix, method, gclConfig, securityConfig, body, params, headers, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        if (securityConfig.skipCitrixCheck || !gclConfig.citrix || gclConfig.agentPort !== -1) {
            var config_1 = {
                url: UrlUtil.create(basePath, suffix, gclConfig, securityConfig.skipCitrixCheck),
                method: method,
                headers: this.getRequestHeaders(headers),
                responseType: 'json'
            };
            if (body) {
                config_1.data = body;
            }
            if (params) {
                config_1.params = params;
            }
            if (securityConfig.sendApiKey) {
                config_1.headers.apikey = gclConfig.apiKey;
            }
            if (securityConfig.sendGclJwt) {
                config_1.headers.Authorization = 'Bearer ' + gclConfig.gclJwt;
            }
            if (gclConfig.tokenCompatible && securityConfig.sendToken) {
                config_1.headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }
            return new Promise(function (resolve, reject) {
                var securityPromise;
                if (securityConfig.sendGwJwt) {
                    securityPromise = gclConfig.gwJwt;
                }
                else {
                    securityPromise = Promise.resolve('');
                }
                securityPromise.then(function (jwt) {
                    if (securityConfig.sendGwJwt) {
                        config_1.headers.Authorization = 'Bearer ' + jwt;
                    }
                    axios.request(config_1).then(function (response) {
                        GenericConnection.extractAccessToken(response.headers, gclConfig);
                        callback(null, response.data);
                        return resolve(response.data);
                    }).catch(function (error) {
                        if (!error.code && !error.response) {
                            var thrownError = new RestException(500, '999', 'Network error occurred. Request could not be completed');
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
                }, function (err) {
                    return reject(err);
                });
            });
        }
        else {
            var agentPortError = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
    };
    GenericConnection.AUTH_TOKEN_HEADER = 'X-Authentication-Token';
    GenericConnection.BROWSER_AUTH_TOKEN = 't1c-js-browser-id-token';
    GenericConnection.RELAY_STATE_HEADER_PREFIX = 'X-Relay-State-';
    GenericConnection.HEADER_GCL_LANG = 'X-Language-Code';
    return GenericConnection;
}());
export { GenericConnection };
var LocalAuthAdminConnection = (function (_super) {
    __extends(LocalAuthAdminConnection, _super);
    function LocalAuthAdminConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalAuthAdminConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = _super.prototype.getRequestHeaders.call(this, headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        return reqHeaders;
    };
    LocalAuthAdminConnection.prototype.getSecurityConfig = function () {
        return { sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: true };
    };
    LocalAuthAdminConnection.prototype.requestLogFile = function (basePath, suffix, callback) {
        var _this = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        var headers = this.getRequestHeaders({});
        return new Promise(function (resolve, reject) {
            axios.get(UrlUtil.create(basePath, suffix, _this.cfg, true), {
                responseType: 'blob', headers: headers
            }).then(function (response) {
                callback(null, response);
                return resolve(response);
            }, function (error) {
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
    };
    return LocalAuthAdminConnection;
}(GenericConnection));
export { LocalAuthAdminConnection };
var LocalAuthConnection = (function (_super) {
    __extends(LocalAuthConnection, _super);
    function LocalAuthConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalAuthConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = _super.prototype.getRequestHeaders.call(this, headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        return reqHeaders;
    };
    LocalAuthConnection.prototype.getSecurityConfig = function () {
        return { sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: false };
    };
    LocalAuthConnection.prototype.getSkipCitrix = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, this.getRequestHeaders(headers), callback);
    };
    LocalAuthConnection.prototype.postSkipCitrix = function (basePath, suffix, queryParams, body, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig, body, queryParams, this.getRequestHeaders(headers), callback);
    };
    LocalAuthConnection.prototype.requestLogFile = function (basePath, suffix, callback) {
        var _this = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            var headers = _this.getRequestHeaders({});
            axios.get(UrlUtil.create(basePath, suffix, _this.cfg, false), {
                responseType: 'blob', headers: headers
            }).then(function (response) {
                callback(null, response);
                return resolve(response);
            }, function (error) {
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
    };
    return LocalAuthConnection;
}(GenericConnection));
export { LocalAuthConnection };
var LocalConnection = (function (_super) {
    __extends(LocalConnection, _super);
    function LocalConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    LocalConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = _super.prototype.getRequestHeaders.call(this, headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        var contextToken = this.cfg.contextToken;
        if (contextToken && !_.isNil(contextToken)) {
            reqHeaders[LocalConnection.RELAY_STATE_HEADER_PREFIX + this.cfg.contextToken] = this.cfg.contextToken;
        }
        return reqHeaders;
    };
    LocalConnection.prototype.getSecurityConfig = function () {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: false };
    };
    LocalConnection.prototype.getSkipCitrix = function (basePath, suffix, queryParams, headers, callback) {
        var securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig, undefined, queryParams, headers, callback);
    };
    LocalConnection.prototype.requestFile = function (basePath, suffix, body, callback) {
        var _this = this;
        var config = _.omit(this.cfg, ['apiKey', 'jwt']);
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            var headers = {};
            headers[GenericConnection.HEADER_GCL_LANG] = _this.cfg.lang;
            if (config.tokenCompatible && _this.getSecurityConfig().sendToken) {
                headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }
            axios.post(UrlUtil.create(basePath, suffix, config, false), body, {
                responseType: 'arraybuffer', headers: headers
            }).then(function (response) {
                callback(null, response.data);
                return resolve(response.data);
            }, function (error) {
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
    };
    LocalConnection.prototype.postFile = function (basePath, suffix, body, queryParams, callback) {
        var config = _.omit(this.cfg, ['apiKey', 'jwt']);
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        var form = new FormData();
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
        var headers = { 'Content-Type': 'multipart/form-data' };
        if (config.tokenCompatible && this.getSecurityConfig().sendToken) {
            headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        headers[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        return new Promise(function (resolve, reject) {
            axios.post(UrlUtil.create(basePath, suffix, config, false), form, {
                headers: headers
            }).then(function (response) {
                callback(null, response.data);
                return resolve(response.data);
            }, function (error) {
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
    };
    return LocalConnection;
}(GenericConnection));
export { LocalConnection };
var RemoteApiKeyConnection = (function (_super) {
    __extends(RemoteApiKeyConnection, _super);
    function RemoteApiKeyConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    RemoteApiKeyConnection.prototype.getSecurityConfig = function () {
        return { sendGwJwt: false, sendGclJwt: false, sendApiKey: true, sendToken: false, skipCitrixCheck: true };
    };
    return RemoteApiKeyConnection;
}(GenericConnection));
export { RemoteApiKeyConnection };
var RemoteJwtConnection = (function (_super) {
    __extends(RemoteJwtConnection, _super);
    function RemoteJwtConnection(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cfg = cfg;
        return _this;
    }
    RemoteJwtConnection.prototype.getSecurityConfig = function () {
        return { sendGwJwt: true, sendGclJwt: false, sendApiKey: false, sendToken: false, skipCitrixCheck: true };
    };
    return RemoteJwtConnection;
}(GenericConnection));
export { RemoteJwtConnection };
var LocalTestConnection = (function (_super) {
    __extends(LocalTestConnection, _super);
    function LocalTestConnection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = undefined;
        return _this;
    }
    LocalTestConnection.prototype.get = function (basePath, suffix, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'GET', this.config, undefined, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.post = function (basePath, suffix, body, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'POST', this.config, body, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.put = function (basePath, suffix, body, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'PUT', this.config, body, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.delete = function (basePath, suffix, queryParams, headers, callback) {
        return this.handleTestRequest(basePath, suffix, 'DELETE', this.config, undefined, queryParams, headers, callback);
    };
    LocalTestConnection.prototype.getRequestHeaders = function (headers) {
        var reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        reqHeaders['X-Consumer-Username'] = 'testorg.testapp.v1';
        reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = store.get(GenericConnection.BROWSER_AUTH_TOKEN);
        return reqHeaders;
    };
    LocalTestConnection.prototype.handleTestRequest = function (basePath, suffix, method, gclConfig, body, params, headers, callback) {
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        if (gclConfig.citrix && gclConfig.agentPort === -1) {
            var agentPortError = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
        else {
            var config_2 = {
                url: UrlUtil.create(basePath, suffix, gclConfig, true),
                method: method,
                headers: this.getRequestHeaders(headers),
                responseType: 'json'
            };
            if (body) {
                config_2.data = body;
            }
            if (params) {
                config_2.params = params;
            }
            if (gclConfig.gclJwt) {
                config_2.headers.Authorization = 'Bearer ' + gclConfig.gclJwt;
            }
            return new Promise(function (resolve, reject) {
                axios.request(config_2).then(function (response) {
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
    };
    return LocalTestConnection;
}(GenericConnection));
export { LocalTestConnection };
//# sourceMappingURL=Connection.js.map