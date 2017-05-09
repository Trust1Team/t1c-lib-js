/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import { AbstractEMV, AllDataResponse } from "./EMVModel";
import { LocalConnection } from "../../../core/client/Connection";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { OptionalPin } from "../Card";
import { DataResponse, T1CResponse } from "../../../core/service/CoreModel";

const SEPARATOR = "/";
const PLUGIN_CONTEXT_EMV = "/plugins/emv";
const EMV_PAN = "/pan";
const EMV_VERIFY_PIN = "/verify-pin";

function createFilter(filters: string[]): any {
    return { filter: filters.join(",") };
}

class EMV implements AbstractEMV {
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_EMV;
    }


    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void {
        let _req: any = {};
        if (body.pin) { _req.pin = body.pin; }
        this.connection.post(this.resolvedReaderURI() + EMV_VERIFY_PIN, _req, callback);
    }

    public pan(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + EMV_PAN, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string { return this.url + SEPARATOR + this.reader_id; }
}
export { EMV };
