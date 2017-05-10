/**
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection } from "../../../core/client/Connection";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractMobib, AllDataResponse, CardIssuingResponse, ContractsResponse, StatusResponse } from "./mobibModel";

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


    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public cardIssuing(callback: (error: RestException, data: CardIssuingResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CARD_ISSUING, callback);
    }

    public contracts(callback: (error: RestException, data: ContractsResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_CONTRACTS, callback);
    }

    public picture(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_PHOTO, callback);
    }


    public status(callback: (error: RestException, data: StatusResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + MOBIB_STATUS, callback);
    }


    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { Mobib };
