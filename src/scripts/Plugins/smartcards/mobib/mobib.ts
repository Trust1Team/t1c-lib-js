/**
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection } from "../../../core/client/Connection";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";

interface AbstractMobib {
    allData(filters: string[], callback: (error: RestException, data: any) => void): void;
    cardIssuing(callback: (error: RestException, data: any) => void): void;
    contracts(callback: (error: RestException, data: any) => void): void;
    picture(callback: (error: RestException, data: DataResponse) => void): void;
    status(callback: (error: RestException, data: StatusResponse) => void): void;
}

interface StatusResponse extends T1CResponse {
    data: {
        active: boolean
    }
}

interface CardIssuing {
    card_expiration_date: string
    card_holder_birth_date: string
    card_holder_end_date: string
    card_holder_id: string
    card_holder_name: string
    card_holder_start_date:  string
    card_revalidation_date: string
    card_type: number
    company_id: number
    gender: number
    language: number
    version: number
}

interface CardIssuingResponse extends T1CResponse {
    data: CardIssuing
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_MOBIB = "/plugins/mobib";
const MOBIB_CARD_ISSUING = "/card-issuing";
const MOBIB_CONTRACTS = "/contracts";
const MOBIB_PHOTO = "/picture";
const MOBIB_STATUS = "/status";

function createFilter(filters: string[]): { filter: string } {
    return { filter: filters.join(",") };
}


class Mobib implements AbstractMobib {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_MOBIB;
    }


    public allData(filters: string[], callback) {
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


    // resolves the reader_id in the base URL
    private resolvedReaderURI():string{
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { Mobib };
