/**
 * @author Michallis Pashidis
 * @since 2017
 */
import {LocalConnection} from "../../../../core/client/Connection";
import * as CoreExceptions from "../../../../core/exceptions/CoreExceptions";

interface AbstractEidLUX{

}

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_LUXEID = "/plugins/luxeid";
const LUX_ALL_CERTIFICATES = "/certificates";
const LUX_HOLDER_INFO = "/";
const LUX_ADDRESS = "/address";
const LUX_PHOTO = "/picture";
const LUX_VERIFY_PIN = "/verify-pin";
const LUX_SIGN_DATA = "/sign";
const LUX_AUTHENTICATE = "/authenticate";

class EidLUX implements AbstractEidLUX{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_LUXEID;}

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }
}

export {AbstractEidLUX, EidLUX}