/**
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../core/client/Connection";
import * as CoreExceptions from "../../../core/exceptions/CoreExceptions";

interface AbstractMobib {
    allData(filters:string[],callback:(error:CoreExceptions.RestException, data:any) => void):void;
    cardIssuing(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    contracts(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    picture(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    status(callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_MOBIB = "/plugins/mobib";
const MOBIB_CARD_ISSUING = "/card-issuing";
const MOBIB_CONTRACTS = "/contracts";
const MOBIB_PHOTO = "/picture";
const MOBIB_STATUS = "/status";

function createFilter(filters:string[]):any {
    return { filter: filters.join(',') };
}


class Mobib implements AbstractMobib{
    // constructor
    constructor(private url:string,private connection:LocalConnection,private reader_id:string) {this.url = url + PLUGIN_CONTEXT_MOBIB;}

    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }

    public allData(filters, callback) {
        if (filters && filters.length > 0) { this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public cardIssuing(callback) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CARD_ISSUING, callback);
    }

    public contracts(callback) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CONTRACTS, callback);
    }

    public picture(callback) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_PHOTO, callback);
    }


    public status(callback) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_STATUS, callback);
    }
}

export { AbstractMobib, Mobib }