/**
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection } from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AuthenticateOrSignData, OptionalPin } from "../../Card";
import { AbstractLuxTrust, AllCertsResponse, AllDataResponse } from "./LuxTrustModel";

function createFilterQueryParam(filters: string[]):  any {
    return { filter: filters.join(",") };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_LUXTRUST = "/plugins/luxtrust";
const LUX_ALL_CERTIFICATES = "/certificates";
const LUX_CERT_ROOT = LUX_ALL_CERTIFICATES + "/root";
const LUX_CERT_AUTHENTICATION = LUX_ALL_CERTIFICATES + "/authentication";
const LUX_CERT_SIGNING = LUX_ALL_CERTIFICATES + "/signing";
const LUX_VERIFY_PIN = "/verify-pin";
const LUX_SIGN_DATA = "/sign";
const LUX_AUTHENTICATE = "/authenticate";


class LuxTrust implements AbstractLuxTrust {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_LUXTRUST;
    }


    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createFilterQueryParam(filters));
        }
        else { this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback); }
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_CERT_ROOT, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_CERT_SIGNING, callback);
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + LUX_VERIFY_PIN, body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + LUX_SIGN_DATA, body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + LUX_AUTHENTICATE, body, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { LuxTrust };
