/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {Promise} from "es6-promise";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import {GCLConfig} from "../GCLConfig";

interface Connection {
    get(url:string, callback:(error:CoreExceptions.RestException, data:any, queryParams?:any) => void);
    post(url:string, body:any, callback:(error:CoreExceptions.RestException, data:any) => void);
}

class LocalConnection implements Connection {
    private jwt:string;

    constructor(config:GCLConfig) {
        this.jwt = config.jwt;
    }

    // using Callback
    public get(url:string, callback:(error:CoreExceptions.RestException, data:any)=>void, queryParams?:any):void{
/*        $.ajaxSetup({
            headers: { 'Authorization':('Bearer ' + this.jwt) }
        });*/

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: queryParams,
            success: function(data,status,jqXHR) {
                return callback(null,data);
            },
            error: function(data,status,jqXHR) {
                let error = {} as CoreExceptions.RestException;
                error.status = data.status;
                error.description = data.responseJSON.Error.description;
                error.code = data.responseJSON.Error.code;
                return callback(error,null);
            }
        });
    }

    public post(url:string, body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void{
/*        $.ajaxSetup({
            headers: { 'Authorization':('Bearer ' + this.jwt) }
        });*/

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: 'json',
            mimeType: 'application/json',
            success: function(response, status) {
                return callback(null,response);
            },
            error: function(data, status, jqXHR) {
                let error = {} as CoreExceptions.RestException;
                error.status = data.status;
                error.description = data.responseJSON.Error.description;
                error.code = data.responseJSON.Error.code;
                return callback(error,null);
            }
        });
    }
}

class RemoteConnection implements Connection {
    private apikey:string;

    constructor(config:GCLConfig) {
        this.apikey = config.apiKey;
    }

    // using Callback
    public get(url:string, callback:(error:CoreExceptions.RestException, data:any)=>void, queryParams?:any):void{
        $.ajaxSetup({
            headers: { 'apikey': this.apikey }
        });

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: queryParams,
            success: function(data,status,jqXHR) {
                return callback(null,data);
            },
            error: function(data,status,jqXHR) {
                let error = {} as CoreExceptions.RestException;
                error.status = data.status;
                error.description = data.responseJSON.Error.description;
                error.code = data.responseJSON.Error.code;
                return callback(error,null);
            }
        });
    }

    public post(url:string, body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void{
        $.ajaxSetup({
            headers: { 'apikey': this.apikey }
        });

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: 'json',
            mimeType: 'application/json',
            success: function(response, status) {
                return callback(null,response);
            },
            error: function(data, status, jqXHR) {
                let error = {} as CoreExceptions.RestException;
                error.status = data.status;
                error.description = data.responseJSON.Error.description;
                error.code = data.responseJSON.Error.code;
                return callback(error,null);
            }
        });
    }
}

export {LocalConnection,RemoteConnection}
