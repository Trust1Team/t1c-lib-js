import {GCLConfig} from '../GCLConfig';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {T1CLibException} from '../exceptions/CoreExceptions';
import {UrlUtil} from '../../util/UrlUtil';
import * as store from 'store2';
import {BrowserFingerprint} from '../../util/BrowserFingerprint';
import {ResponseHandler} from '../../util/ResponseHandler';
import {DSJWTResponse} from '../ds/DSClientModel';


export interface Connection {
    get(basePath: string,
        suffix: string,
        queryParams?: QueryParams,
        headers?: RequestHeaders,
        callback?: RequestCallback): Promise<any>;

    post(basePath: string,
         suffix: string,
         body: RequestBody,
         queryParams?: QueryParams,
         headers?: RequestHeaders,
         callback?: RequestCallback): Promise<any>;

    put(basePath: string,
        suffix: string,
        body: RequestBody,
        queryParams?: QueryParams,
        headers?: RequestHeaders,
        callback?: RequestCallback): Promise<any>;

    delete(basePath: string,
           suffix: string,
           queryParams?: QueryParams,
           headers?: RequestHeaders,
           callback?: RequestCallback): Promise<any>;
}

export interface RequestBody {
    [key: string]: any
}

export interface QueryParams {
    [key: string]: any
}

export interface RequestHeaders {
    [key: string]: string
}

export interface RequestCallback {
    (error: any, data: any): void
}

export interface SecurityConfig {
    sendGwJwt: boolean,
    sendGclJwt: boolean,
    sendApiKey: boolean,
    sendToken: boolean,
    skipCitrixCheck: boolean
}

/**
 * Base class for all connection types
 */
export abstract class GenericConnection implements Connection {
    // consent token = browser fingerprint
    static readonly AUTH_TOKEN_HEADER = 'X-Authentication-Token';
    // key for localStorage for browser fingerprint
    static readonly BROWSER_AUTH_TOKEN = 't1c-js-browser-id-token';
    // whitelist application id prefix
    static readonly RELAY_STATE_HEADER_PREFIX = 'X-Relay-State-';
    // language header
    static readonly HEADER_GCL_LANG = 'X-Language-Code';

    constructor(public cfg: GCLConfig) {
    }

    /**
     * Returns relevant error for requests that cannot be completed without an API key
     * @param {(error: T1CLibException, data: JWTResponse) => void} callback
     * @returns {Promise<never>}
     */
    private static disabledWithoutApiKey(callback: (error: T1CLibException, data: DSJWTResponse) => void) {
        return ResponseHandler.error(new T1CLibException(412, '901', 'Configuration must contain API key to use this method'), callback);
    }

    /**
     * Checks headers for an "access_token" header. This header is used by the DS to send the client JWT.
     * If found, the value is saved as GCL JWT.
     * @param {RequestHeaders} headers
     * @param {GCLConfig} config
     */
    private static extractAccessToken(headers: RequestHeaders, config: GCLConfig) {
        if (headers && headers.access_token) {
            config.gclJwt = headers.access_token;
        }
    }

    /**
     * Helper function for GET requests
     * @param {string} basePath
     * @param {string} suffix
     * @param {QueryParams} queryParams
     * @param {RequestHeaders} headers
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public get(basePath: string,
               suffix: string,
               queryParams?: QueryParams,
               headers?: RequestHeaders,
               callback?: RequestCallback): Promise<any> {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        } else {
            return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig,
                undefined, queryParams, headers, callback);
        }
    }

    /**
     * Helper function for POST requests
     * @param {string} basePath
     * @param {string} suffix
     * @param {RequestBody} body
     * @param {QueryParams} queryParams
     * @param {RequestHeaders} headers
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public post(basePath: string,
                suffix: string,
                body: RequestBody,
                queryParams?: QueryParams,
                headers?: RequestHeaders,
                callback?: RequestCallback): Promise<any> {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        } else {
            return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig,
                body, queryParams, headers, callback);
        }
    }

    /**
     * Helper function for PUT requests
     * @param {string} basePath
     * @param {string} suffix
     * @param {RequestBody} body
     * @param {QueryParams} queryParams
     * @param {RequestHeaders} headers
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public put(basePath: string,
               suffix: string,
               body: RequestBody,
               queryParams?: QueryParams,
               headers?: RequestHeaders,
               callback?: RequestCallback): Promise<any> {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        } else {
            return this.handleRequest(basePath, suffix, 'PUT', this.cfg, securityConfig,
                body, queryParams, headers, callback);
        }

    }

    /**
     * Helper function for DELETE requests
     * @param {string} basePath
     * @param {string} suffix
     * @param {QueryParams} queryParams
     * @param {RequestHeaders} headers
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public delete(basePath: string,
                  suffix: string,
                  queryParams?: QueryParams,
                  headers?: RequestHeaders,
                  callback?: RequestCallback): Promise<any> {
        const securityConfig = this.getSecurityConfig();
        if (securityConfig.sendApiKey && !(this.cfg.apiKey && this.cfg.apiKey.length)) {
            return GenericConnection.disabledWithoutApiKey(callback);
        } else {
            return this.handleRequest(basePath, suffix, 'DELETE', this.cfg, securityConfig,
                undefined, queryParams, headers, callback);
        }

    }

    /**
     * Sets provided headers + defaults, or default headers if no custom headers are provided
     * @param {RequestHeaders} headers: Headers to be set
     * @returns {RequestHeaders}
     */
    getRequestHeaders(headers: RequestHeaders): RequestHeaders {
        let reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        reqHeaders['T1C-CSRF-Token'] = 'client';
        return reqHeaders;
    }

    /**
     * Returns the security configuration for the current connection type
     * @returns {SecurityConfig}
     */
    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: true, sendGclJwt: false, sendApiKey: true, sendToken: true, skipCitrixCheck: false};
    }

    /**
     * Function to send the actual request. Used by all request types. Uses axios to make call.
     * @param {string} basePath: base URL path of the request
     * @param {string} suffix: path suffix of the request
     * @param {string} method: HTTP method to be used
     * @param {GCLConfig} gclConfig: GCLConfig to be used
     * @param {SecurityConfig} securityConfig: Security configuration, varies with connection subtype
     * @param {RequestBody} body: Body to be sent, for POST/PUT/...
     * @param {QueryParams} params: Query parameters to be sent with request
     * @param {RequestHeaders} headers: Headers to be sent with request
     * @param {RequestCallback} callback: Optional callback function if not using Promises
     * @returns {Promise<any>}
     */
    protected handleRequest(basePath: string,
                            suffix: string,
                            method: string,
                            gclConfig: GCLConfig,
                            securityConfig: SecurityConfig,
                            body?: RequestBody,
                            params?: QueryParams,
                            headers?: RequestHeaders,
                            callback?: RequestCallback): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        // if Citrix environment, check that agentPort was defined in config
        if (securityConfig.skipCitrixCheck || !gclConfig.citrix || gclConfig.agentPort !== -1) {
            let config: AxiosRequestConfig = {
                // use UrlUtil to create correct URL based on config
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

            // set security tokens/keys based on securityConfig settings
            if (securityConfig.sendApiKey) {
                config.headers.apikey = gclConfig.apiKey;
            }
            if (securityConfig.sendGclJwt) {
                config.headers.Authorization = 'Bearer ' + gclConfig.gclJwt;
            }
            // browser fingerprinting
            if (gclConfig.tokenCompatible && securityConfig.sendToken) {
                config.headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }

            return new Promise((resolve, reject) => {
                let securityPromise;
                if (securityConfig.sendGwJwt) {
                    securityPromise = gclConfig.gwJwt;
                } else {
                    securityPromise = Promise.resolve('');
                }

                securityPromise.then(jwt => {
                    if (securityConfig.sendGwJwt) {
                        config.headers.Authorization = 'Bearer ' + jwt;
                    }
                    axios.request(config).then((response: AxiosResponse) => {
                        // check if access-token included in headers
                        GenericConnection.extractAccessToken(response.headers, gclConfig);

                        // call callback function
                        callback(null, response.data);
                        // and resolve the promise
                        return resolve(response.data);
                    }).catch(function (error: AxiosError) {
                        // check for generic network error
                        if (!error.code && !error.response) {
                            const thrownError = new T1CLibException(500, '999', 'Network error occurred. Request could not be completed');
                            callback(thrownError, null);
                            return reject(thrownError);
                        } else {
                            if (error.response) {
                                if (error.response.data) {
                                    if (error.response.data.message) {
                                        callback(new T1CLibException(500, '' + (error.response.data.code || error.code || '998'), error.response.data.message), null);
                                        return reject(new T1CLibException(500, '' + (error.response.data.code || error.code || '998'), error.response.data.message));
                                    } else if (error.response.data.description) {
                                        callback(new T1CLibException(500, '' + (error.response.data.code || error.code || '998'), error.response.data.description), null);
                                        return reject(new T1CLibException(500, '' + (error.response.data.code || error.code || '998'), error.response.data.description));
                                    } else {
                                        callback(new T1CLibException(500, '' + (error.response.data.code || error.code || '998'), error.response.data), null);
                                        return reject(new T1CLibException(500, '' + (error.response.data.code || error.code || '998'), error.response.data));
                                    }
                                } else {
                                    callback(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error.response)), null);
                                    return reject(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error.response)));
                                }
                            } else {
                                callback(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error)), null);
                                return reject(new T1CLibException(500, '' + error.code || '998', JSON.stringify(error)));
                            }
                        }
                    });
                }, err => {
                    // securityPromise will return error if JWT is expired or cannot be refreshed!
                    return reject(err);
                });
            });
        } else {
            let agentPortError: T1CLibException = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
    }
}

/**
 * Local connection with authorization token, used for protected endpoints
 */
export class LocalAdminConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) {
        super(cfg);
    }

    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: true};
    }
}

/**
 * Local connection with authorization token, used for protected endpoints
 */
export class LocalAuthAdminConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) {
        super(cfg);
    }

    getRequestHeaders(headers: RequestHeaders): RequestHeaders {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        return reqHeaders;
    }

    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: true};
    }

    /**
     * Helper method for requesting log files. These are sent as arraybuffers and require special handling.
     * @param {string} basePath
     * @param {string} suffix
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
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
                    } else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                } else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
}

/**
 * Local connection with authorization token, used for protected endpoints
 */
export class LocalAuthConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) {
        super(cfg);
    }

    getRequestHeaders(headers: RequestHeaders): RequestHeaders {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        reqHeaders.Authorization = 'Bearer ' + this.cfg.gclJwt;
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        return reqHeaders;
    }

    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: false};
    }

    /**
     * Helper method for GET requests; will ignore Citrix environment and not sent agent URL prefix,
     * even if an agent port is present in GCLConfig
     * @param {string} basePath
     * @param {string} suffix
     * @param {QueryParams} queryParams
     * @param {RequestHeaders} headers
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public getSkipCitrix(basePath: string,
                         suffix: string,
                         queryParams?: QueryParams,
                         headers?: RequestHeaders,
                         callback?: RequestCallback): Promise<any> {
        let securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig,
            undefined, queryParams, this.getRequestHeaders(headers), callback);
    }

    public postSkipCitrix(basePath: string,
                          suffix: string,
                          queryParams?: QueryParams,
                          body?: RequestBody,
                          headers?: RequestHeaders,
                          callback?: RequestCallback): Promise<any> {
        let securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'POST', this.cfg, securityConfig,
            body, queryParams, this.getRequestHeaders(headers), callback);
    }

    /**
     * Helper method for requesting log files. These are sent as arraybuffers and require special handling.
     * @param {string} basePath
     * @param {string} suffix
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        return new Promise((resolve, reject) => {
            let headers: RequestHeaders = this.getRequestHeaders({});
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
                    } else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                } else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
}

/**
 * Local connection without security token or keys
 */
export class LocalConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) {
        super(cfg);
    }

    getRequestHeaders(headers: RequestHeaders): RequestHeaders {
        let reqHeaders = super.getRequestHeaders(headers);
        reqHeaders[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
        // contextToken = application id (ex. 26)
        let contextToken = this.cfg.contextToken;
        // only send relay-state header when a DS is available
        if (contextToken && contextToken != null) {
            reqHeaders[LocalConnection.RELAY_STATE_HEADER_PREFIX + this.cfg.contextToken] = this.cfg.contextToken;
        }
        return reqHeaders;
    }

    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: false};
    }

    /**
     * Helper method for GET requests; will ignore Citrix environment and not sent agent URL prefix,
     * even if an agent port is present in GCLConfig
     * @param {string} basePath
     * @param {string} suffix
     * @param {QueryParams} queryParams
     * @param {RequestHeaders} headers
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public getSkipCitrix(basePath: string,
                         suffix: string,
                         queryParams?: QueryParams,
                         headers?: RequestHeaders,
                         callback?: RequestCallback): Promise<any> {
        let securityConfig = this.getSecurityConfig();
        securityConfig.skipCitrixCheck = true;
        return this.handleRequest(basePath, suffix, 'GET', this.cfg, securityConfig,
            undefined, queryParams, headers, callback);
    }

    /**
     * Helper method for requesting files. These are sent as arraybuffers and require special handling.
     * @param {string} basePath
     * @param {string} suffix
     * @param {{path: string}} body
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public requestFile(basePath: string, suffix: string, body: {
                           entity: string,
                           type: string,
                           filename: string,
                           rel_path: string[],
                           notify_on_completion: boolean
                       },
                       callback?: RequestCallback): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        return new Promise((resolve, reject) => {
            let headers = {};
            headers[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;
            if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
                headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }
            axios.post(UrlUtil.create(basePath, suffix, this.cfg, false), body, {
                responseType: 'arraybuffer', headers
            }).then(response => {
                callback(null, response.data);
                return resolve(response.data);
            }, error => {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    } else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                } else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }

    /**
     * Helper method for uploading files. These are uploaded as multipart/form-data and require special handling.
     * @param {string} basePath
     * @param {string} suffix
     * @param {RequestBody} body - containing the file blob
     * @param {QueryParams} queryParams
     * @param {RequestCallback} callback
     * @returns {Promise<any>}
     */
    public postFile(basePath: string, suffix: string, body: RequestBody, queryParams: QueryParams, callback?: RequestCallback): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        const form = new FormData();
        // second argument  can take Buffer or Stream (lazily read during the request) too.
        // third argument is filename if you want to simulate a file upload. Otherwise omit.
        // entity, type, file, filename, rel_path, implicit_creation_type, notify_on_completion
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
        let headers = {'Content-Type': 'multipart/form-data'};
        if (this.cfg.tokenCompatible && this.getSecurityConfig().sendToken) {
            headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }
        headers[GenericConnection.HEADER_GCL_LANG] = this.cfg.lang;

        return new Promise((resolve, reject) => {
            axios.post(UrlUtil.create(basePath, suffix, this.cfg, false), form, {
                headers
            }).then(response => {
                callback(null, response.data);
                return resolve(response.data);
            }, error => {
                if (error.response) {
                    if (error.response.data) {
                        callback(error.response.data, null);
                        return reject(error.response.data);
                    } else {
                        callback(error.response, null);
                        return reject(error.response);
                    }
                } else {
                    callback(error, null);
                    return reject(error);
                }
            });
        });
    }
}

/**
 * Remote connection which will set API key header
 */
export class RemoteApiKeyConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) {
        super(cfg);
    }

    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: false, sendGclJwt: false, sendApiKey: true, sendToken: false, skipCitrixCheck: true};
    }
}

/**
 * Remote connection which will set Authorization: Bearer token
 */
export class RemoteJwtConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) {
        super(cfg);
    }

    getSecurityConfig(): SecurityConfig {
        return {sendGwJwt: true, sendGclJwt: false, sendApiKey: false, sendToken: false, skipCitrixCheck: true};
    }
}

// TODO remove?
/**
 * Local testing connection
 */
export class LocalTestConnection extends GenericConnection implements Connection {
    config = undefined;

    public get(basePath: string,
               suffix: string,
               queryParams?: QueryParams,
               headers?: RequestHeaders,
               callback?: RequestCallback): Promise<any> {
        return this.handleTestRequest(basePath, suffix, 'GET', this.config,
            undefined, queryParams, headers, callback);
    }

    public post(basePath: string,
                suffix: string,
                body: RequestBody,
                queryParams?: QueryParams,
                headers?: RequestHeaders,
                callback?: RequestCallback): Promise<any> {
        return this.handleTestRequest(basePath, suffix, 'POST', this.config,
            body, queryParams, headers, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: RequestBody,
               queryParams?: QueryParams,
               headers?: RequestHeaders,
               callback?: RequestCallback): Promise<any> {
        return this.handleTestRequest(basePath, suffix, 'PUT', this.config,
            body, queryParams, headers, callback);
    }

    public delete(basePath: string,
                  suffix: string,
                  queryParams?: QueryParams,
                  headers?: RequestHeaders,
                  callback?: RequestCallback): Promise<any> {
        return this.handleTestRequest(basePath, suffix, 'DELETE', this.config,
            undefined, queryParams, headers, callback);
    }

    getRequestHeaders(headers: RequestHeaders) {
        let reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        reqHeaders['X-Consumer-Username'] = 'testorg.testapp.v1';
        reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = store.get(GenericConnection.BROWSER_AUTH_TOKEN);
        return reqHeaders;
    }

    private handleTestRequest(basePath: string,
                              suffix: string,
                              method: string,
                              gclConfig: GCLConfig,
                              body?: any,
                              params?: any,
                              headers?: RequestHeaders,
                              callback?: (error: any, data: any) => void): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') {
            callback = function () { /* no-op */
            };
        }

        // if Citrix environment, check that agentPort was defined in config
        if (gclConfig.citrix && gclConfig.agentPort === -1) {
            let agentPortError: T1CLibException = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        } else {
            let config: AxiosRequestConfig = {
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
                axios.request(config).then((response: AxiosResponse) => {
                    callback(null, response.data);
                    return resolve(response.data);
                }).catch(function (error: AxiosError) {
                    if (error.response) {
                        callback(error.response, null);
                        return reject(error.response);
                    } else {
                        callback(error, null);
                        return reject(error);
                    }
                });
            });
        }
    }
}

