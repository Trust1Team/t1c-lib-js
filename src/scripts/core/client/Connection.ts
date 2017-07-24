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

export { GenericConnection, LocalConnection, LocalAuthConnection, RemoteConnection, Connection, LocalTestConnection };


interface Connection {
    get(url: string,
        queryParams: { [key: string]: string },
        callback?: (error: any, data: any) => void): Promise<any>;

    post(url: string,
         body: { [key: string]: any },
         queryParams?: { [key: string]: string },
         callback?: (error: any, data: any) => void): Promise<any>;

    put(url: string,
        body: { [key: string]: any },
        queryParams?: { [key: string]: string },
        callback?: (error: any, data: any) => void): Promise<any>;
}

abstract class GenericConnection implements Connection {
    abstract config;

    constructor(cfg: GCLConfig) {
        this.config = cfg;
    }

    public get(url: string,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(url, "GET", undefined, queryParams, this.config.apiKey, this.config.jwt, callback);
    }

    public post(url: string,
                body: any,
                queryParams: { [key: string]: string },
                callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(url, "POST", body, queryParams, this.config.apiKey, this.config.jwt, callback);
    }

    public put(url: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): Promise<any> {
        return handleRequest(url, "PUT", body, queryParams, this.config.apiKey, this.config.jwt, callback);
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

    public get(url: string,
               queryParams: { [key: string]: string }): Promise<any>;
    public get(url: string,
               queryParams: { [key: string]: string },
               callback: (error: any, data: any) => void): void;
    public get(url: string,
               queryParams?: { [key: string]: string },
               callback?: (error: any, data: any) => void): void | Promise<any> {
        return handleTestRequest(url, "GET", undefined, queryParams, undefined, callback);
    }

    public post(url: string,
                body: any,
                queryParams: { [key: string]: string }): Promise<any>;
    public post(url: string,
                body: any,
                queryParams: { [key: string]: string },
                callback: (error: any, data: any) => void): void;
    public post(url: string,
                body: any,
                queryParams?: { [key: string]: string },
                callback?: (error: any, data: any) => void): void | Promise<any> {
        return handleTestRequest(url, "POST", body, queryParams, undefined, callback);
    }

    public put(url: string,
               body: any,
               queryParams: { [key: string]: string }): Promise<any>;
    public put(url: string,
               body: any,
               queryParams: { [key: string]: string },
               callback: (error: any, data: any) => void): void;
    public put(url: string,
               body: any,
               queryParams: { [key: string]: string },
               callback?: (error: any, data: any) => void): void | Promise<any> {
        return handleTestRequest(url, "PUT", body, queryParams, undefined, callback);
    }
}

function handleRequest(url: string,
                       method: string,
                       body?: any,
                       params?: any,
                       apikey?: string,
                       jwt?: string,
                       callback?: (error: any, data: any) => void): Promise<any> {
    let config: AxiosRequestConfig = {
        url,
        method,
        headers:  {
            "Accept-Language":  "en-US"
        },
        responseType:  "json"
    };
    if (body) { config.data = body; }
    if (params) { config.params = params; }
    if (apikey) { config.headers.apikey = apikey; }
    if (jwt) { config.headers.Authorization = "Bearer " + jwt; }
    if (!callback || typeof callback !== "function") { callback = function () { /* no-op */ }; }

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

function handleTestRequest(url: string,
                           method: string,
                           body?: any,
                           params?: any,
                           jwt?: string,
                           callback?: (error: any, data: any) => void): void | Promise<any> {
    let config: AxiosRequestConfig = {
        url,
        method,
        headers:  {
            "Accept-Language":  "en-US",
            "X-Consumer-Username": "testorg.testapp.v1"
        },
        responseType:  "json"
    };
    if (body) { config.data = body; }
    if (params) { config.params = params; }
    if (jwt) { config.headers.Authorization = "Bearer " + jwt; }

    callback = callback || function () {
            // no-op
        };

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

