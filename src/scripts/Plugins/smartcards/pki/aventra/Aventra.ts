/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../core/client/Connection";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { AuthenticateOrSignData, ResetPinData, VerifyPinData } from "../Card";
import { AbstractAventra, AllCertsResponse, AllDataResponse } from "./AventraModel";

const SEPARATOR = "/";
const PLUGIN_CONTEXT_BEID = "/plugins/aventra";
const AVENTRA_ALL_CERTIFICATES = "/certificates";
const AVENTRA_CERT_ROOT = AVENTRA_ALL_CERTIFICATES + "/root";
const AVENTRA_CERT_ISSUER = AVENTRA_ALL_CERTIFICATES + "/issuer";
const AVENTRA_CERT_AUTHENTICATION = AVENTRA_ALL_CERTIFICATES + "/authentication";
const AVENTRA_CERT_SIGNING = AVENTRA_ALL_CERTIFICATES + "/signing";
const AVENTRA_CERT_ENCRYPTION = AVENTRA_ALL_CERTIFICATES + "/encryption";
const AVENTRA_VERIFY_PIN = "/verify-pin";
const AVENTRA_RESET_PIN = "/reset-pin";
const AVENTRA_SIGN_DATA = "/sign";
const AVENTRA_AUTHENTICATE = "/authenticate";

function createFilter(filters: string[]): { filter: string } {
    return { filter: filters.join(",") };
}


class Aventra implements AbstractAventra {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string) {
        this.url = url + PLUGIN_CONTEXT_BEID;
    }

    // filters
    public allDataFilters() {
        return [ "applet-info", "root_certificate", "authentication-certificate",
                 "encryption_certificate", "issuer_certificate", "signing_certificate" ];
    }

    public allCertFilters() {
        return [ "root_certificate", "authentication-certificate", "encryption_certificate", "issuer_certificate", "signing_certificate" ];
    }

    public allKeyRefs() {
        return [ "authenticate", "sign", "encrypt" ];
    }

    public allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_SIGN_DATA, callback);
    }

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + AVENTRA_ALL_CERTIFICATES, callback, createFilter(filters));
        }
        else { this.connection.get(this.resolvedReaderURI() + AVENTRA_ALL_CERTIFICATES, callback); }
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_ROOT, callback);
    }

    public issuerCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_ISSUER, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_SIGNING, callback);
    }

    public encryptionCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + AVENTRA_CERT_ENCRYPTION, callback);
    }

    public verifyPin(body: VerifyPinData, callback: (error: RestException, data: T1CResponse) => void): void {
        this.connection.post(this.resolvedReaderURI() + AVENTRA_VERIFY_PIN, body, callback);
    }

    public resetPin(body: ResetPinData, callback: (error: RestException, data: T1CResponse) => void): void {
        this.connection.post(this.resolvedReaderURI() + AVENTRA_RESET_PIN, body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void {
        // only sha1 possible!
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        this.connection.post(this.resolvedReaderURI() + AVENTRA_SIGN_DATA, body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        this.connection.post(this.resolvedReaderURI() + AVENTRA_AUTHENTICATE, body, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }

}

export { Aventra };
