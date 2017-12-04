/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
///<reference path='../../../../typings/index.d.ts'/>

import {GCLConfig} from '../GCLConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as _ from 'lodash';
import { Promise } from 'es6-promise';
import { RestException } from '../exceptions/CoreExceptions';
import { UrlUtil } from '../../util/UrlUtil';
import * as ls from 'local-storage';
import { BrowserFingerprint } from '../../util/BrowserFingerprint';
import { FormData } from 'form-data';

export { GenericConnection, LocalConnection, LocalAuthConnection, RemoteConnection, Connection, LocalTestConnection };


interface Connection {
    get(basePath: string,
        suffix: string,
        queryParams: { [key: string]: string },
        callback?: (error: any, data: any) => void): Promise<any>;

    post(basePath: string,
         suffix: string,
         body: { [key: string]: any },
         queryParams?: { [key: string]: string },
         callback?: (error: any, data: any) => void): Promise<any>;

    put(basePath: string,
        suffix: string,
        body: { [key: string]: any },
        queryParams?: { [key: string]: string },
        callback?: (error: any, data: any) => void): Promise<any>;
}

abstract class GenericConnection implements Connection {
    static readonly AUTH_TOKEN_HEADER = 'X-Authentication-Token';
    static readonly BROWSER_AUTH_TOKEN = 't1c-js-browser-id-token';
    static readonly SHOULD_SEND_TOKEN = true;

    constructor(public cfg: GCLConfig) {}

    public get(basePath: string,
               suffix: string,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(basePath, suffix, 'GET', this.cfg, GenericConnection.SHOULD_SEND_TOKEN, undefined, queryParams, callback);
    }

    public post(basePath: string,
                suffix: string,
                body: any,
                queryParams: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(basePath, suffix, 'POST', this.cfg, GenericConnection.SHOULD_SEND_TOKEN, body, queryParams, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(basePath, suffix, 'PUT', this.cfg, GenericConnection.SHOULD_SEND_TOKEN, body, queryParams, callback);
    }
}

class LocalAuthConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) { super(cfg); }

    public get(basePath: string,
               suffix: string,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'apiKey');
        return handleRequest(basePath, suffix, 'GET', config, GenericConnection.SHOULD_SEND_TOKEN, undefined, queryParams, callback);
    }

    public getSkipCitrix(basePath: string,
                         suffix: string,
                         queryParams: { [key: string]: string },
                         callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'apiKey');
        return handleRequest(basePath, suffix, 'GET', config, GenericConnection.SHOULD_SEND_TOKEN, undefined, queryParams, callback, true);
    }

    public post(basePath: string,
                suffix: string,
                body: any,
                queryParams: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'apiKey');
        return handleRequest(basePath, suffix, 'POST', config, GenericConnection.SHOULD_SEND_TOKEN, body, queryParams, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'apiKey');
        return handleRequest(basePath, suffix, 'PUT', config, GenericConnection.SHOULD_SEND_TOKEN, body, queryParams, callback);
    }
}

class LocalConnection extends GenericConnection implements Connection {
    constructor(public cfg: GCLConfig) { super(cfg); }

    public get(basePath: string,
               suffix: string,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        return handleRequest(basePath, suffix, 'GET', config, GenericConnection.SHOULD_SEND_TOKEN, undefined, queryParams, callback);
    }

    public getSkipCitrix(basePath: string,
                         suffix: string,
                         queryParams: { [key: string]: string },
                         callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        return handleRequest(basePath, suffix, 'GET', config, GenericConnection.SHOULD_SEND_TOKEN, undefined, queryParams, callback, true);
    }

    public post(basePath: string,
                suffix: string,
                body: any,
                queryParams: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        return handleRequest(basePath, suffix, 'POST', config, GenericConnection.SHOULD_SEND_TOKEN, body, queryParams, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        return handleRequest(basePath, suffix, 'PUT', config, GenericConnection.SHOULD_SEND_TOKEN, body, queryParams, callback);
    }

    public putFile(basePath: string, suffix: string, body: any,
                   queryParams: { [key: string]: string }, callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, ['apiKey', 'jwt']);
        // init callback if necessary
        if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

        const form = new FormData();
        // second argument  can take Buffer or Stream (lazily read during the request) too.
        // third argument is filename if you want to simulate a file upload. Otherwise omit.
        form.append('path', body.path);
        form.append('file', body.file, body.fileName);
        let headers = form.getHeaders();
        if (config.tokenCompatible && GenericConnection.SHOULD_SEND_TOKEN) {
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

class RemoteConnection extends GenericConnection implements Connection {
    private readonly SHOULD_SEND_TOKEN = false;
    constructor(public cfg: GCLConfig) { super(cfg); }

    public get(basePath: string,
               suffix: string,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'jwt');
        return handleRequest(basePath, suffix, 'GET', config, this.SHOULD_SEND_TOKEN, undefined, queryParams, callback, true);
    }

    public post(basePath: string,
                suffix: string,
                body: any,
                queryParams: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'jwt');
        return handleRequest(basePath, suffix, 'POST', config, this.SHOULD_SEND_TOKEN, body, queryParams, callback, true);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        let config: any = _.omit(this.cfg, 'jwt');
        return handleRequest(basePath, suffix, 'PUT', config, this.SHOULD_SEND_TOKEN, body, queryParams, callback, true);
    }
}

class LocalTestConnection extends GenericConnection implements Connection {
    config = undefined;

    public get(basePath: string, suffix: string,
               queryParams?: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleTestRequest(basePath, suffix, 'GET', this.config, undefined, queryParams, callback);
    }

    public post(basePath: string, suffix: string,
                body: any,
                queryParams?: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        return handleTestRequest(basePath, suffix, 'POST', this.config, body, queryParams, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleTestRequest(basePath, suffix, 'PUT', this.config, body, queryParams, callback);
    }
}

function handleRequest(basePath: string,
                       suffix: string,
                       method: string,
                       gclConfig: GCLConfig,
                       sendToken: boolean,
                       body?: any,
                       params?: any,
                       callback?: (error: any, data: any) => void,
                       skipCitrixCheck?: boolean): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== 'function') { callback = function () { /* no-op */ }; }

    // if Citrix environment, check that agentPort was defined in config
    if (skipCitrixCheck || !gclConfig.citrix || gclConfig.agentPort !== -1) {
        let config: AxiosRequestConfig = {
            url: UrlUtil.create(basePath, suffix, gclConfig, skipCitrixCheck),
            method,
            headers:  {
                'Accept-Language':  'en-US'
            },
            responseType:  'json'
        };
        if (body) { config.data = body; }
        if (params) { config.params = params; }
        if (gclConfig.apiKey) { config.headers.apikey = gclConfig.apiKey; }
        if (gclConfig.jwt) { config.headers.Authorization = 'Bearer ' + gclConfig.jwt; }
        if (gclConfig.tokenCompatible && sendToken) {
            config.headers[GenericConnection.AUTH_TOKEN_HEADER] = BrowserFingerprint.get();
        }

        return new Promise((resolve, reject) => {
            axios.request(config).then((response: AxiosResponse) => {
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

function handleTestRequest(basePath: string,
                           suffix: string,
                           method: string,
                           gclConfig: GCLConfig,
                           body?: any,
                           params?: any,
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
            headers:  {
                'Accept-Language':  'en-US',
                'X-Consumer-Username': 'testorg.testapp.v1',
                [GenericConnection.AUTH_TOKEN_HEADER]: ls.get(GenericConnection.BROWSER_AUTH_TOKEN)
            },
            responseType:  'json'
        };
        if (body) { config.data = body; }
        if (params) { config.params = params; }
        if (gclConfig.jwt) { config.headers.Authorization = 'Bearer ' + gclConfig.jwt; }

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

