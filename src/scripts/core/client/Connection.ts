/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */
///<reference path="../../../../typings/index.d.ts"/>

import {GCLConfig} from "../GCLConfig";
import axios from "axios";

interface Connection {
    get(url:string, callback:(error:any, data:any) => void, queryParams?:any);
    post(url:string, body:any, callback:(error:any, data:any) => void);
    put(url:string, body:any, callback:(error:any, data:any) => void);
}

class LocalAuthConnection implements Connection {
    constructor(private cfg:GCLConfig) {}

    // using Callback
    public get(url:string, callback:(error:any, data:any)=>void, queryParams?:any):void {
        return handleRequest(url, 'GET', callback, undefined, queryParams, undefined, this.cfg.jwt);
    }

    public post(url:string, body:any, callback:(error:any, data:any) => void):void{
        return handleRequest(url, 'POST', callback, body, undefined, undefined, this.cfg.jwt);
    }

    public put(url:string, body:any, callback:(error:any, data:any) => void):void{
        return handleRequest(url, 'PUT', callback, body, undefined, undefined, this.cfg.jwt);
    }
}

class LocalConnection implements Connection {
    constructor(private cfg:GCLConfig) {}

    public get(url:string, callback:(error:any, data:any)=>void, queryParams?:any):void{
        return handleRequest(url, 'GET', callback, undefined, queryParams, undefined, this.cfg.jwt);
    }

    public post(url:string, body:any, callback:(error:any, data:any) => void):void{
        return handleRequest(url, 'POST', callback, body, undefined, undefined, this.cfg.jwt);
    }

    public put(url:string, body:any, callback:(error:any, data:any) => void):void{
        return handleRequest(url, 'PUT', callback, body, undefined, undefined, this.cfg.jwt);
    }
}

class RemoteConnection implements Connection {
    constructor(private cfg:GCLConfig) {}

    // using Callback
    public get(url:string, callback:(error:any, data:any)=>void, queryParams?:any):void{
        return handleRequest(url, 'GET', callback, undefined, queryParams, this.cfg.apiKey, undefined);
    }

    public post(url:string, body:any, callback:(error:any, data:any) => void):void{
        return handleRequest(url, 'POST', callback, body, undefined, this.cfg.apiKey, undefined);
    }

    public put(url:string, body:any, callback:(error:any, data:any) => void):void{
        return handleRequest(url, 'PUT', callback, body, undefined, this.cfg.apiKey, undefined);
    }
}

function handleRequest(url:string, method:string, callback:(error:any, data:any) => void, body?:any, params?:any, apikey?:string, jwt?:string):void {
    let request = {
        url: url,
        method: method,
        headers: {
            'Accept-Language': 'en-US'
        },
        responseType: 'json'
    };
    if (body) request['data'] = body;
    if (params) {
        request['params'] = params;
    }
    if (apikey) request.headers['apikey'] = apikey;
    if (jwt) request.headers['Authorization'] = 'Bearer ' + jwt;

    axios.request(request).then(function (response) {
        return callback(null, response.data);
    }).catch(function (error) {
        return callback(error, null);
    })
}


export {LocalConnection,LocalAuthConnection,RemoteConnection,Connection}
