/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractEMV{
    pan(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_EMV = "/plugins/emv";
const EMV_PAN = "/pan";
const EMV_VERIFY_PIN = "/verify-pin";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}

class EMV implements AbstractEMV{
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_EMV;}
    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{return this.url + SEPARATOR + this.reader_id;}

    allData(filters,callback):void {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters));}
        else{this.connection.get(this.resolvedReaderURI(), callback);}
    }

    verifyPin(body,callback):void {
        let _req:any = {};
        if(body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + EMV_VERIFY_PIN, _req, callback);
    }

    pan(callback):void {this.connection.get(this.resolvedReaderURI() + EMV_PAN, callback);}
}
export {AbstractEMV, EMV};