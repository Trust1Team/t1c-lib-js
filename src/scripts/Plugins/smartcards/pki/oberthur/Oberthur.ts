/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection } from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AuthenticateOrSignData, VerifyPinData } from "../../Card";
import { AbstractOberthur, AllCertsResponse, AllDataResponse } from "./OberthurModel";

const SEPARATOR = "/";
const PLUGIN_CONTEXT_BEID = "/plugins/oberthur";
const OBERTHUR_ALL_CERTIFICATES = "/certificates";
const OBERTHUR_CERT_ROOT = OBERTHUR_ALL_CERTIFICATES + "/root";
const OBERTUR_CERT_ISSUER = OBERTHUR_ALL_CERTIFICATES + "/issuer";
const OBERTUR_CERT_AUTHENTICATION = OBERTHUR_ALL_CERTIFICATES + "/authentication";
const OBERTUR_CERT_SIGNING = OBERTHUR_ALL_CERTIFICATES + "/signing";
const OBERTUR_CERT_ENCRYPTION = OBERTHUR_ALL_CERTIFICATES + "/encryption";
const OBERTUR_VERIFY_PIN = "/verify-pin";
const OBERTUR_SIGN_DATA = "/sign";
const OBERTUR_AUTHENTICATE = "/authenticate";

function createFilter(filters: string[]): { filter: string } {
    return { filter: filters.join(",") };
}


class Oberthur implements AbstractOberthur {

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
        this.connection.get(this.resolvedReaderURI() + OBERTUR_AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + OBERTUR_SIGN_DATA, callback);
    }

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + OBERTHUR_ALL_CERTIFICATES, callback, createFilter(filters));
        }
        else { this.connection.get(this.resolvedReaderURI() + OBERTHUR_ALL_CERTIFICATES, callback); }
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + OBERTHUR_CERT_ROOT, callback);
    }

    public issuerCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + OBERTUR_CERT_ISSUER, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + OBERTUR_CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + OBERTUR_CERT_SIGNING, callback);
    }

    public encryptionCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + OBERTUR_CERT_ENCRYPTION, callback);
    }

    public verifyPin(body: VerifyPinData, callback: (error: RestException, data: T1CResponse) => void): void {
        this.connection.post(this.resolvedReaderURI() + OBERTUR_VERIFY_PIN, body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        this.connection.post(this.resolvedReaderURI() + OBERTUR_SIGN_DATA, body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        this.connection.post(this.resolvedReaderURI() + OBERTUR_AUTHENTICATE, body, callback);
    }

    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }
}

export { Oberthur };
