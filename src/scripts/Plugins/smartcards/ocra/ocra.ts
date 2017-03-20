/**
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractOcra {
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    challenge(body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    readCounter(body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any, callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

function createFilterQueryParam(filters:string[]):any {
    return { filter: filters.join(',') };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_OCRA = "/plugins/ocra";
const OCRA_CHALLENGE = '/challenge';
const OCRA_READ_COUNTER = '/read-counter';
const OCRA_VERIFY_PIN = '/verify-pin';


class Ocra implements AbstractOcra {
    // constructor
    constructor(private url:string, private connection:LocalConnection, private reader_id:string) {
        this.url = url + PLUGIN_CONTEXT_OCRA;
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    public allData(filters, callback) {
        if(filters && filters.length>0){this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters));}
        else{this.connection.get(this.resolvedReaderURI(), callback);}
    }

    challenge(body, callback) {
        let _req:any = {};
        if (body) {
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + OCRA_CHALLENGE, _req, callback);
    }

    readCounter(body, callback) {
        let _req:any = {};
        if (body) {
            if(body.pin) {_req.pin = body.pin;}
        }
        this.connection.post(this.resolvedReaderURI() + OCRA_READ_COUNTER, _req, callback);
    }

    verifyPin(body, callback) {
        let _req:any = {};
        if (body.pin) {_req.pin = body.pin;}
        this.connection.post(this.resolvedReaderURI() + OCRA_VERIFY_PIN, _req, callback);
    }


}

export { AbstractOcra, Ocra }