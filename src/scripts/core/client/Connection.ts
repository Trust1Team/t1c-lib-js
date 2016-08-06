/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {Promise} from "es6-promise";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import {GCLConfig} from "../GCLConfig";

interface Connection {
    //get(url:string, callback:(error:CoreExceptions.RestException, data:any, queryParams?:any) => void);
    get(url:string, callback:(error:any, data:any, queryParams?:any) => void);
    post(url:string, body:any, callback:(error:CoreExceptions.RestException, data:any) => void);
}

class LocalAuthConnection implements Connection {
    constructor() {}

    // using Callback
    public get(url:string, callback:(error:any, data:any)=>void, queryParams?:any):void{
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: queryParams,
            headers: { 'Authorization':('Bearer ' + GCLConfig.Instance.jwt) },
            success: function(successResponse,status,jqXHR) {
                return callback(null,successResponse);
            },
            error: function(errorResponse,status,jqXHR) {
                return callback(errorResponse,null);
            }
        });
    }

    public post(url:string, body:any, callback:(error:any, data:any) => void):void{
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: 'json',
            mimeType: 'application/json',
            headers: { 'Authorization':('Bearer ' + GCLConfig.Instance.jwt) },
            success: function(successResponse, status) {
                return callback(null,successResponse);
            },
            error: function(errorResponse, status, jqXHR) {
                return callback(errorResponse,null);
            }
        });
    }
}

class LocalConnection implements Connection {
    constructor() {}

    public get(url:string, callback:(error:any, data:any)=>void, queryParams?:any):void{
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: queryParams,
            headers: { 'Authorization':('Bearer ' + GCLConfig.Instance.jwt) },
            success: function(successResponse,status,jqXHR) {
                return callback(null,successResponse);
            },
            error: function(errorResponse,status,jqXHR) {
                return callback(errorResponse,null);
            }
        });
    }

    public post(url:string, body:any, callback:(error:any, data:any) => void):void{
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: 'json',
            mimeType: 'application/json',
            headers: { 'Authorization':('Bearer ' + GCLConfig.Instance.jwt) },
            success: function(successResponse, status) {
                return callback(null,successResponse);
            },
            error: function(errorResponse, status, jqXHR) {
                return callback(errorResponse,null);
            }
        });
    }
}

class RemoteConnection implements Connection {
    constructor() {}

    // using Callback
    public get(url:string, callback:(error:any, data:any)=>void, queryParams?:any):void{
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: queryParams,
            headers: { 'apikey': GCLConfig.Instance.apiKey },
            success: function(successResponse,status,jqXHR) {
                return callback(null,successResponse);
            },
            error: function(errorResponse,status,jqXHR) {
                return callback(errorResponse,null);
            }
        });
    }

    public post(url:string, body:any, callback:(error:any, data:any) => void):void{
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: 'json',
            headers: { 'apikey': GCLConfig.Instance.apiKey },
            mimeType: 'application/json',
            success: function(successResponse, status,jqXHR) {
                return callback(null,successResponse);
            },
            error: function(errorResponse, status, jqXHR) {
                return callback(errorResponse,null);
            }
        });
    }
}

export {LocalConnection,LocalAuthConnection,RemoteConnection}