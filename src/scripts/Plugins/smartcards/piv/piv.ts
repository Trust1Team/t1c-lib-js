/**
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection } from "../../../core/client/Connection";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, OptionalPin } from "../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { AbstractPiv, AllCertsResponse, AllDataResponse, FacialImageResponse, PrintedInformationResponse } from "./pivModel";


function createFilterQueryParam(filters: string[]): { filter: string } {
    return { filter: filters.join(",") };
}

const SEPARATOR = "/";
const PLUGIN_CONTEXT_PIV = "/plugins/piv";
const PIV_PRINTED_INFORMATION = "/printed-information";
const PIV_FACIAL_IMAGE = "/facial-image";
const PIV_ALL_CERTIFICATES = "/certificates";
const PIV_CERT_AUTHENTICATION = PIV_ALL_CERTIFICATES + "/authentication";
const PIV_CERT_SIGNING = PIV_ALL_CERTIFICATES + "/signing";
const PIV_VERIFY_PIN = "/verify-pin";
const PIV_SIGN_DATA = "/sign";
const PIV_AUTHENTICATE = "/authenticate";


class PIV implements AbstractPiv {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_PIV;
    }

    // filters
    public allDataFilters() {
        return [ "applet-info", "root_certificate", "authentication-certificate",
                 "encryption_certificate", "issuer_certificate", "signing_certificate" ];
    }

    public allCertFilters() {
        return [ "authentication-certificate", "signing_certificate" ];
    }

    public allKeyRefs() {
        return [ "authenticate", "sign", "encrypt" ];
    }

    public allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + PIV_AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + PIV_SIGN_DATA, callback);
    }

    public printedInformation(body: OptionalPin, callback: (error: RestException, data: PrintedInformationResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_PRINTED_INFORMATION, body, callback);
    }

    public facialImage(body: OptionalPin, callback: (error: RestException, data: FacialImageResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_FACIAL_IMAGE, body, callback);
    }

    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) { this.connection.post(this.resolvedReaderURI(), body, callback, createFilterQueryParam(filters)); }
        else { this.connection.post(this.resolvedReaderURI(), body, callback); }
    }

    public allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.post(this.resolvedReaderURI() + PIV_ALL_CERTIFICATES, body, callback, createFilterQueryParam(filters));
        } else { this.connection.post(this.resolvedReaderURI() + PIV_ALL_CERTIFICATES, body, callback); }
    }

    authenticationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_CERT_AUTHENTICATION, body, callback);
    }

    signingCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_CERT_SIGNING, body, callback);
    }

    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_VERIFY_PIN, body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_SIGN_DATA, body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV_AUTHENTICATE, body, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { PIV };
