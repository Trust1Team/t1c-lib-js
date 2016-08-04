/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {Promise} from "es6-promise";
import * as CoreExceptions from "../exceptions/CoreExceptions";

interface Connection {
    get(url:string, callback:(error:CoreExceptions.RestException, data:any) => void);
    post(url:string, body:any, callback:(error:CoreExceptions.RestException, data:any) => void);
}

class LocalConnection implements Connection {

    constructor() {}

    // using Callback
    public get(url:string, callback, queryParams?:any):void{
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: queryParams,
            success: function(data,status,jqXHR) {
                /*data.capture_date = new Date();*/
                return callback(null,data);
            },
            error: function(data,status,jqXHR) {
                let error = {} as CoreExceptions.RestException;
                error.status = data.status;
                error.description = data.responseJSON.Error.description;
                error.code = data.responseJSON.Error.code;
                return callback(error);
            }
        });
    }

    public post(url:string, body, callback):void{
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            processData: false,
            dataType: 'json',
            mimeType: 'application/json',
            success: function(response, status) {
                response.capture_date = new Date();
                return callback(null,response);
            },
            error: function(response, status) {
                return callback(response);
            }
        });
    }
}

export {LocalConnection}
