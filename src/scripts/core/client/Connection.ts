/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import {GCLConfig} from '../GCLConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import { Promise } from 'es6-promise';
import { RestException } from '../exceptions/CoreExceptions';
import { UrlUtil } from '../../util/UrlUtil';
import * as ls from 'local-storage';
import { BrowserFingerprint } from '../../util/BrowserFingerprint';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { ResponseHandler } from '../../util/ResponseHandler';
import { JWTResponse } from '../ds/DSClientModel';

export { GenericConnection, LocalConnection, LocalAuthConnection, RemoteApiKeyConnection,
    RemoteJwtConnection, Connection, LocalTestConnection, RequestBody, RequestHeaders, RequestCallback, QueryParams };


interface Connection {
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

interface RequestBody {
    [key: string]: any
}

interface QueryParams {
    [key: string]: any
}

interface RequestHeaders {
    [key: string]: string
}

interface RequestCallback {
    (error: any, data: any): void
}

abstract class GenericConnection implements Connection {
    static readonly AUTH_TOKEN_HEADER = 'X-Authentication-Token';
    static readonly BROWSER_AUTH_TOKEN = 't1c-js-browser-id-token';

    constructor(public cfg: GCLConfig) {}


    private static disabledWithoutApiKey(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void) {
        return ResponseHandler.error(new RestException(412, '901', 'Configuration must contain API key to use this method'), callback);
    }

    private static extractAccessToken(headers: RequestHeaders, config: GCLConfig) {

        if (headers && headers.access_token) {
            config.gclJwt = headers.access_token;
        }
    }


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

    getRequestHeaders(headers: RequestHeaders): RequestHeaders {
        let reqHeaders = headers || {};
        reqHeaders['Accept-Language'] = 'en-US';
        return reqHeaders;
    }

    getSecurityConfig(): { sendGwJwt: boolean, sendGclJwt: boolean, sendApiKey: boolean, sendToken: boolean, skipCitrixCheck: boolean } {
        return {  sendGwJwt: true, sendGclJwt: false, sendApiKey: true, sendToken: true, skipCitrixCheck: false };
    }

    protected handleRequest(basePath: string,
                            suffix: string,
                            method: string,
                            gclConfig: GCLConfig,
                            securityConfig: { sendGwJwt: boolean, sendGclJwt: boolean,
                                sendApiKey: boolean, sendToken: boolean, skipCitrixCheck: boolean },
                            body?: RequestBody,
                            params?: QueryParams,
                            headers?: RequestHeaders,
                            callback?: RequestCallback): Promise<any> {
        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        // if Citrix environment, check that agentPort was defined in config
        if (securityConfig.skipCitrixCheck || !gclConfig.citrix || gclConfig.agentPort !== -1) {
            let config: AxiosRequestConfig = {
                url: UrlUtil.create(basePath, suffix, gclConfig, securityConfig.skipCitrixCheck),
                method,
                headers: this.getRequestHeaders(headers),
                responseType:  'json'
            };
            if (body) { config.data = body; }
            if (params) { config.params = params; }
            if (securityConfig.sendApiKey) { config.headers.apikey = gclConfig.apiKey; }
            if (securityConfig.sendGclJwt) { config.headers.Authorization = 'Bearer ' + gclConfig.gclJwt; }
            if (gclConfig.tokenCompatible && securityConfig.sendToken) {
                config.headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }

            return new Promise((resolve, reject) => {
                let securityPromise;
                if (securityConfig.sendGwJwt) {
                    securityPromise = gclConfig.gwJwt;
                } else { securityPromise = Promise.resolve(''); }

                securityPromise.then(jwt => {
                    if (securityConfig.sendGwJwt) { config.headers.Authorization = 'Bearer ' + jwt; }
                    axios.request(config).then((response: AxiosResponse) => {
                        // check if access-token included in headers
                        GenericConnection.extractAccessToken(response.headers, gclConfig);
                        callback(null, response.data);
                        return resolve(response.data);
                    }).catch(function (error: AxiosError) {
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
            });
        } else {
            let agentPortError: RestException = {
                description: 'Running in Citrix environment but no Agent port was defined in config.',
                status: 400,
                code: '801'
            };
            callback(agentPortError, null);
            return Promise.reject(agentPortError);
        }
    }
}

class LocalAuthConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) { super(cfg); }

    getSecurityConfig(): { sendGwJwt: boolean, sendGclJwt: boolean, sendApiKey: boolean, sendToken: boolean, skipCitrixCheck: boolean } {
        return {  sendGwJwt: false, sendGclJwt: true, sendApiKey: false, sendToken: true, skipCitrixCheck: false };
    }

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
}

class LocalConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) { super(cfg); }

    getSecurityConfig(): { sendGwJwt: boolean, sendGclJwt: boolean, sendApiKey: boolean, sendToken: boolean, skipCitrixCheck: boolean } {
        return {  sendGwJwt: false, sendGclJwt: false, sendApiKey: false, sendToken: true, skipCitrixCheck: false };
    }

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

    public requestFile(basePath: string, suffix: string, body: { path: string }, callback?: RequestCallback): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        return new Promise((resolve, reject) => {
            let headers = {};
            if (config.tokenCompatible && this.getSecurityConfig().sendToken) {
                headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
            }
            axios.post(UrlUtil.create(basePath, suffix, config, false), body, {
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

    public putFile(basePath: string, suffix: string, body: RequestBody,
                   queryParams: QueryParams, callback?: RequestCallback): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        const form = new FormData();
        // second argument  can take Buffer or Stream (lazily read during the request) too.
        // third argument is filename if you want to simulate a file upload. Otherwise omit.
        form.append('path', body.path);
        form.append('file', body.file, body.fileName);
        let headers = { 'Content-Type': 'multipart/form-data' };
        if (config.tokenCompatible && this.getSecurityConfig().sendToken) {
            headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }

        return new Promise((resolve, reject) => {
            axios.put(UrlUtil.create(basePath, suffix, config, false), form, {
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

class RemoteApiKeyConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) { super(cfg); }

    getSecurityConfig(): { sendGwJwt: boolean, sendGclJwt: boolean, sendApiKey: boolean, sendToken: boolean, skipCitrixCheck: boolean } {
        return {  sendGwJwt: false, sendGclJwt: false, sendApiKey: true, sendToken: false, skipCitrixCheck: true };
    }
}

class RemoteJwtConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) { super(cfg); }

    getSecurityConfig(): { sendGwJwt: boolean, sendGclJwt: boolean, sendApiKey: boolean, sendToken: boolean, skipCitrixCheck: boolean } {
        return {  sendGwJwt: true, sendGclJwt: false, sendApiKey: false, sendToken: false, skipCitrixCheck: true };
    }
}

class LocalTestConnection extends GenericConnection implements Connection {
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
        reqHeaders[GenericConnection.AUTH_TOKEN_HEADER] = ls.get(GenericConnection.BROWSER_AUTH_TOKEN);
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
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        // if Citrix environment, check that agentPort was defined in config
        if (gclConfig.citrix && gclConfig.agentPort === -1) {
            let agentPortError: RestException = {
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
                responseType:  'json'
            };
            if (body) { config.data = body; }
            if (params) { config.params = params; }
            if (gclConfig.gclJwt) { config.headers.Authorization = 'Bearer ' + gclConfig.gclJwt; }

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

