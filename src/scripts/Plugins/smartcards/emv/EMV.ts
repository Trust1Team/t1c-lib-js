/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractEMV{
    pan(callback:(error:CoreExceptions.RestException, data:any) => void):void;

}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_EMV = "/plugins/emv";
const EMV_PAN = "/pan";
const EMV_VERIFY = "/verify-pin";

class EMV implements AbstractEMV{
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_EMV;}

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    pan(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.resolvedReaderURI() + EMV_PAN,callback);}
}
export {AbstractEMV, EMV};