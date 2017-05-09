/**
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection } from "../../../core/client/Connection";
import { OptionalPin } from "../Card";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { AbstractOcra, AllDataResponse, ChallengeData, ReadCounterResponse } from "./ocraModel";

function createFilterQueryParam(filters: string[]): any {
    return { filter: filters.join(",") };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_OCRA = "/plugins/ocra";
const OCRA_CHALLENGE = "/challenge";
const OCRA_READ_COUNTER = "/read-counter";
const OCRA_VERIFY_PIN = "/verify-pin";


class Ocra implements AbstractOcra {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_OCRA;
    }


    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public challenge(body: ChallengeData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + OCRA_CHALLENGE, body, callback);
    }

    public readCounter(body: OptionalPin, callback: (error: RestException, data: ReadCounterResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + OCRA_READ_COUNTER, body, callback);
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + OCRA_VERIFY_PIN, body, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { Ocra };
