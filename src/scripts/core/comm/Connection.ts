/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {Promise} from "es6-promise";
import * as CoreExceptions from "./CoreExceptions";

interface Connection {
    getPromise(url:string, body?:any):Promise<any>;
    postPromise(url:string, body?:any):Promise<any>;
    get(url:string, callback:(error:CoreExceptions.RestException, data:any) => void);
    post(url:string, callback:(error:CoreExceptions.RestException, data:any) => void);
}

class LocalConnection implements Connection {

    constructor() {}

    // using Promises
    private request(method:string, url:string, body:any):Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let xmlHttp:XMLHttpRequest = new XMLHttpRequest();
            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        if (xmlHttp.responseText && xmlHttp.responseText.length > 0) {
                            resolve(JSON.parse(xmlHttp.responseText));
                        } else {
                            resolve('');
                        }
                    } else {
                        reject(JSON.parse(xmlHttp.responseText));
                    }
                }
            };
            xmlHttp.onerror = function (e) {
                reject(e);
            };
            xmlHttp.open(method, url, true); // true for asynchronous
            if (method === 'POST') {
                xmlHttp.setRequestHeader('Content-Type', 'application/json');
            }
            xmlHttp.send(body);
        });
    }

    public getPromise(url:string, body?:any):Promise<any> {
        $.getJSON( url, function( data ) {
            console.log("jquery data: "+JSON.stringify(data));
        });
        return this.request('GET', url, body || '');
    }

    public postPromise(url:string, body?:any):Promise<any> {
        return this.request('POST', url, body || '');
    }

    // using Callback
    public get(url:string, callback):void{
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(data,status,jqXHR) {
                data.capture_date = new Date();
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

    public post(url:string, callback):void{
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            success: function(data,status,jqXHR) {
                data.capture_date = new Date();
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
}

export const connection = new LocalConnection();
