/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, ResetPinData, VerifyPinData } from "../../Card";
import { AbstractAventra, AllCertsResponse, AllDataResponse } from "./AventraModel";


class Aventra extends GenericCertCard implements AbstractAventra {
    static RESET_PIN = "/reset-pin";

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
        this.connection.get(this.resolvedReaderURI() + Aventra.AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + Aventra.SIGN_DATA, callback);
    }

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void {
        if (filters && filters.length) { this.connection.get(this.resolvedReaderURI(), callback, Aventra.createFilterQueryParam(filters)); }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + Aventra.ALL_CERTIFICATES, callback, Aventra.createFilterQueryParam(filters));
        }
        else { this.connection.get(this.resolvedReaderURI() + Aventra.ALL_CERTIFICATES, callback); }
    }

    public rootCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + Aventra.CERT_ROOT, callback);
    }

    public issuerCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + Aventra.CERT_ISSUER, callback);
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + Aventra.CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + Aventra.CERT_SIGNING, callback);
    }

    public encryptionCertificate(callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + Aventra.CERT_ENCRYPTION, callback);
    }

    public verifyPin(body: VerifyPinData, callback: (error: RestException, data: T1CResponse) => void): void {
        this.connection.post(this.resolvedReaderURI() + Aventra.VERIFY_PIN, body, callback);
    }

    public resetPin(body: ResetPinData, callback: (error: RestException, data: T1CResponse) => void): void {
        this.connection.post(this.resolvedReaderURI() + Aventra.RESET_PIN, body, callback);
    }
}

export { Aventra };
