/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
///<reference path="../../../../typings/index.d.ts"/>

import {GCLConfig} from "../GCLConfig";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as _ from "lodash";
import { Promise } from "es6-promise";
import { RestException } from "../exceptions/CoreExceptions";
import { UrlUtil } from "../../util/UrlUtil";

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
    abstract config;

    constructor(cfg: GCLConfig) {
        this.config = cfg;
    }

    public get(basePath: string,
               suffix: string,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(basePath, suffix, "GET", this.config, undefined, queryParams, callback);
    }

    public post(basePath: string,
                suffix: string,
                body: any,
                queryParams: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(basePath, suffix, "POST", this.config, body, queryParams, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(basePath, suffix, "PUT", this.config, body, queryParams, callback);
    }
}

class LocalAuthConnection extends GenericConnection implements Connection {
    config = _.omit(this.config, "apiKey");

    constructor(cfg: GCLConfig) {
        super(cfg);
    }
}

class LocalConnection extends GenericConnection implements Connection {
    config = _.omit(this.config, ["apiKey", "jwt"]);

    constructor(protected cfg: GCLConfig) {
        super(cfg);
    }
}

class RemoteConnection extends GenericConnection implements Connection {
    config = _.omit(this.config, "jwt");

    constructor(protected cfg: GCLConfig) {
        super(cfg);
    }
}

class LocalTestConnection extends GenericConnection implements Connection {
    config = undefined;

    public get(basePath: string, suffix: string,
               queryParams?: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleTestRequest(basePath, suffix, "GET", this.config,undefined, queryParams, callback);
    }

    public post(basePath: string, suffix: string,
                body: any,
                queryParams?: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        return handleTestRequest(basePath, suffix, "POST", this.config, body, queryParams, callback);
    }

    public put(basePath: string,
               suffix: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleTestRequest(basePath, suffix, "PUT", this.config, body, queryParams, callback);
    }
}

function handleRequest(basePath: string,
                       suffix: string,
                       method: string,
                       gclConfig: GCLConfig,
                       body?: any,
                       params?: any,
                       callback?: (error: any, data: any) => void): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") { callback = function () { /* no-op */ }; }

    // if Citrix environment, check that agentPort was defined in config
    if (gclConfig.citrix && gclConfig.agentPort === -1) {
        let agentPortError: RestException = {
            description: "Running in Citrix environment but no Agent port was defined in config.",
            status: 400,
            code: "801"
        };
        callback(agentPortError, null);
        return Promise.reject(agentPortError);
    } else {
        let config: AxiosRequestConfig = {
            url: UrlUtil.create(basePath, suffix, gclConfig),
            method,
            headers:  {
                "Accept-Language":  "en-US"
            },
            responseType:  "json"
        };
        if (body) { config.data = body; }
        if (params) { config.params = params; }
        if (gclConfig.apiKey) { config.headers.apikey = gclConfig.apiKey; }
        if (gclConfig.jwt) { config.headers.Authorization = "Bearer " + gclConfig.jwt; }

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

function handleTestRequest(basePath: string,
                           suffix: string,
                           method: string,
                           gclConfig: GCLConfig,
                           body?: any,
                           params?: any,
                           callback?: (error: any, data: any) => void): Promise<any> {
    // init callback if necessary
    if (!callback || typeof callback !== "function") { callback = function () { /* no-op */ }; }

    // if Citrix environment, check that agentPort was defined in config
    if (gclConfig.citrix && gclConfig.agentPort === -1) {
        let agentPortError: RestException = {
            description: "Running in Citrix environment but no Agent port was defined in config.",
            status: 400,
            code: "801"
        };
        callback(agentPortError, null);
        return Promise.reject(agentPortError);
    } else {
        let config: AxiosRequestConfig = {
            url: UrlUtil.create(basePath, suffix, gclConfig),
            method,
            headers:  {
                "Accept-Language":  "en-US",
                "X-Consumer-Username": "testorg.testapp.v1"
            },
            responseType:  "json"
        };
        if (body) { config.data = body; }
        if (params) { config.params = params; }
        if (gclConfig.jwt) { config.headers.Authorization = "Bearer " + gclConfig.jwt; }

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

