import { RestException } from "../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../core/service/CoreModel";
import { LocalConnection } from "../../core/client/Connection";
/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */


export { Card, CertCard, PinCard, SecuredCertCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin,
    GenericCard, GenericSmartCard, GenericPinCard, GenericCertCard, GenericSecuredCertCard };

interface Card {
    allData: (filters: string[], callback: () => void) => void
}

interface OptionalPin {
    pin?: string
}

interface VerifyPinData extends OptionalPin {
    private_key_reference: string
}

interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback: () => void) => void
}

interface CertCard extends PinCard {
    allCerts: (filters: string[], callback: () => void) => void
    authenticate: (body: any, callback: () => void) => void
    signData: (body: any, callback: () => void) => void
}

interface SecuredCertCard {
    allCerts: (filters: string[], body: OptionalPin, callback: () => void) => void
    allData: (filters: string[], body: OptionalPin, callback: () => void) => void
    authenticate: (body: any, callback: () => void) => void
    signData: (body: any, callback: () => void) => void
}

interface AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string
    data: string
}

interface ResetPinData {
    puk: string,
    new_pin: string
    private_key_reference: string
}

abstract class GenericCard {

    constructor(protected url: string, protected connection: LocalConnection, protected reader_id: string) {}

    protected static createFilterQueryParam(filters: string[], pin?: string): { filter: string, pin?: string } {
        let filter = filters.join(",");
        if (pin) { return { filter, pin }; }
        else { return { filter }; }
    }

    // resolves the reader_id in the base URL
    protected resolvedReaderURI(): string {
        return this.url + "/" + this.reader_id;
    }
}

abstract class GenericSmartCard extends GenericCard implements Card {
    public allData(filters: string[], callback: (error: RestException, data: DataObjectResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI(), callback, GenericCard.createFilterQueryParam(filters));
        }
        else { this.connection.get(this.resolvedReaderURI(), callback); }
    }
}

abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN = "/verify-pin";

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + GenericPinCard.VERIFY_PIN, body, callback);
    }
}

abstract class GenericCertCard extends GenericPinCard implements CertCard {
    static ALL_CERTIFICATES = "/certificates";
    static AUTHENTICATE = "/authenticate";
    static CERT_ROOT = "/root";
    static CERT_AUTHENTICATION = "/authentication";
    static CERT_NON_REPUDIATION = "/non-repudiation";
    static CERT_ISSUER = "/issuer";
    static CERT_SIGNING = "/signing";
    static CERT_ENCRYPTION = "/encryption";
    static CERT_CITIZEN = "/citizen";
    static CERT_RRN = "/rrn";
    static SIGN_DATA = "/sign";


    public allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, callback);
    }

    public allCerts(filters: string[], callback: (error: RestException, data: DataObjectResponse) => void): void {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES,
                callback,
                GenericCertCard.createFilterQueryParam(filters));
        }
        else { this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES, callback); }
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        this.connection.post(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        this.connection.post(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, body, callback);
    }

    protected getCertificate(certUrl: string, callback: (error: RestException, data: DataResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES + certUrl, callback);
    }
}

abstract class GenericSecuredCertCard extends GenericCard implements SecuredCertCard {
    static ALL_CERTIFICATES = "/certificates";
    static AUTHENTICATE = "/authenticate";
    static CERT_AUTHENTICATION = "/authentication";
    static CERT_NON_REPUDIATION = "/non-repudiation";
    static CERT_ROOT = "/root";
    static CERT_SIGNING = "/signing";
    static SIGN_DATA = "/sign";
    static VERIFY_PIN = "/verify-pin";

    public allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void {
        this.connection.get(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, callback);
    }

    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void) {
        if (filters && filters.length) { this.connection.post(this.resolvedReaderURI(),
            body,
            callback,
            GenericSecuredCertCard.createFilterQueryParam(filters));
        } else { this.connection.post(this.resolvedReaderURI(), body, callback); }
    }

    public allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void) {
        if (filters && filters.length) {
            this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES,
                body,
                callback,
                GenericSecuredCertCard.createFilterQueryParam(filters));
        } else { this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES, body, callback); }
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.VERIFY_PIN, body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, body, callback);
    }

    protected getCertificate(certUrl: string,
                             body: OptionalPin,
                             callback: (error: RestException,
                                        data: DataResponse) => void,
                             params?: { filter?: string, pin?: string }): void {
        this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl, body, callback, params);
    }

    protected getCertificateArray(certUrl: string,
                                  body: OptionalPin,
                                  callback: (error: RestException,
                                             data: DataArrayResponse) => void,
                                  params?: { filter?: string, pin?: string }): void {
        this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl, body, callback, params);
    }
}
