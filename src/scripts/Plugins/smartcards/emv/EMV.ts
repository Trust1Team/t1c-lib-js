/**
 * @author Michallis Pashidis
 * @since 2016
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractEMV{
    pan(callback:(error:CoreExceptions.RestException, data:any) => void):void;

}

const PLUGIN_CONTEXT_EMV = "/plugins/emv";
const EMV_PAN = "/pan";

class EMV implements AbstractEMV{
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_EMV;}

    pan(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + EMV_PAN,callback);}
}
export {AbstractEMV, EMV};