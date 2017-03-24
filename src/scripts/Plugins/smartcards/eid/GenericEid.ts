/**
 * This is the common eID interface and implementation.
 * The goal of this interface is to abstract the eID data from different custom eID implementations.
 *
 * @author Michallis Pashidis
 * @since 2017
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractEid{
    holder(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    address(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    picture(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    certificates(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    verifyPin(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    signData(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    authenticate(body:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_EID = "/plugins/eid";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}

class Eid implements AbstractEid{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_EID;}

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }
    
    holder(callback): void {
    }

    address(callback): void {
    }

    picture(callback): void {
    }

    certificates(callback): void {
    }

    verifyPin(body: any, callback): void {
    }

    signData(body: any, callback): void {
    }

    authenticate(body: any, callback): void {
    }
}