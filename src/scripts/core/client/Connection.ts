/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
///<reference path="../../../../typings/index.d.ts"/>

import {GCLConfig} from "../GCLConfig";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RestException } from "../exceptions/CoreExceptions";

export { LocalConnection, LocalAuthConnection, RemoteConnection, Connection, LocalTestConnection };


interface Connection {
    get(url: string,
        callback: (error: any, data: any) => void,
        queryParams?: { [key: string]: string }): void;
    post(url: string,
         body: { [key: string]: any },
         callback: (error: any, data: any) => void,
         queryParams?: { [key: string]: string }): void;
    put(url: string,
        body: { [key: string]: any },
        callback: (error: any, data: any) => void,
        queryParams?: { [key: string]: string }): void;
}

class LocalAuthConnection implements Connection {
    constructor(private cfg:  GCLConfig) {}

    // using Callback
    public get(url: string, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "GET", callback, undefined, queryParams, undefined, this.cfg.jwt);
    }

    public post(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "POST", callback, body, undefined, undefined, this.cfg.jwt);
    }

    public put(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "PUT", callback, body, undefined, undefined, this.cfg.jwt);
    }
}

class LocalConnection implements Connection {
    constructor(private cfg: GCLConfig) {}

    public get(url: string, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "GET", callback, undefined, queryParams, undefined, this.cfg.jwt);
    }

    public post(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "POST", callback, body, queryParams, undefined, this.cfg.jwt);
    }

    public put(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "PUT", callback, body, undefined, undefined, this.cfg.jwt);
    }
}

class RemoteConnection implements Connection {
    constructor(private cfg: GCLConfig) {}

    // using Callback
    public get(url: string, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string} ): void {
        return handleRequest(url, "GET", callback, undefined, queryParams, this.cfg.apiKey, undefined);
    }

    public post(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "POST", callback, body, undefined, this.cfg.apiKey, undefined);
    }

    public put(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleRequest(url, "PUT", callback, body, undefined, this.cfg.apiKey, undefined);
    }
}

class LocalTestConnection implements Connection {
    constructor(private cfg: GCLConfig) {}

    // using Callback
    public get(url: string, callback: (error: RestException, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleTestRequest(url, "GET", callback, undefined, queryParams, undefined);
    }

    public post(url: string,
                body: any,
                callback: (error: RestException, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleTestRequest(url, "POST", callback, body, undefined, undefined);
    }

    public put(url: string, body: any, callback: (error: RestException, data: any) => void, queryParams?: { [key: string]: string }): void {
        return handleTestRequest(url, "PUT", callback, body, undefined, undefined);
    }
}


function handleRequest(url: string,
                       method: string,
                       callback: (error: any, data: any) => void,
                       body?: any,
                       params?: any,
                       apikey?: string,
                       jwt?: string): void {
    let request: AxiosRequestConfig = {
        url,
        method,
        headers:  {
            "Accept-Language":  "en-US"
        },
        responseType:  "json"
    };
    if (body) { request.data = body; }
    if (params) { request.params = params; }
    if (apikey) { request.headers.apikey = apikey; }
    if (jwt) { request.headers.Authorization = "Bearer " + jwt; }

    axios.request(request).then(function (response: AxiosResponse) {
        return callback(null, response.data);
    }).catch(function (error: AxiosError) {
        if (error.response) { return callback(error.response, null); }
        else { return callback(error, null); }
    });
}

function handleTestRequest(url: string,
                           method: string,
                           callback: (error: any, data: any) => void,
                           body?: any,
                           params?: any,
                           jwt?: string): void {
    let request: AxiosRequestConfig = {
        url,
        method,
        headers:  {
            "Accept-Language":  "en-US",
            "X-Consumer-Username": "testorg.testapp.v1"
        },
        responseType:  "json"
    };
    if (body) { request.data = body; }
    if (params) { request.params = params; }
    if (jwt) { request.headers.Authorization = "Bearer " + jwt; }

    axios.request(request).then(function (response: AxiosResponse) {
        return callback(null, response.data);
    }).catch(function (error: AxiosError) {
        if (error.response) { return callback(error.response, null); }
        else { return callback(error, null); }
    });
}

