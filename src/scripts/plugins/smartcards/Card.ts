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
    allData: (filters: string[], callback?: () => void) => void | Promise<DataObjectResponse>;
}

interface OptionalPin {
    pin?: string
}

interface VerifyPinData extends OptionalPin {
    private_key_reference: string
}

interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback?: () => void) => void | Promise<T1CResponse>;
}

interface CertCard extends PinCard {
    allCerts: (filters: string[], callback?: () => void) => void | Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => void | Promise<DataResponse>
    signData: (body: any, callback?: () => void) => void | Promise<DataResponse>
}

interface SecuredCertCard {
    allCerts: (filters: string[], body: OptionalPin, callback: () => void) => void | Promise<DataObjectResponse>
    allData: (filters: string[], body: OptionalPin, callback: () => void) => void | Promise<DataObjectResponse>
    authenticate: (body: any, callback: () => void) => void | Promise<DataResponse>
    signData: (body: any, callback: () => void) => void | Promise<DataResponse>
    verifyPin: (body: OptionalPin, callback?: () => void) => void | Promise<T1CResponse>
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
    public allData(filters: string[],
                   callback?: (error: RestException, data: DataObjectResponse) => void): void | Promise<DataObjectResponse> {
        if (filters && filters.length) {
            return this.connection.get(this.resolvedReaderURI(), GenericCard.createFilterQueryParam(filters), callback);
        }
        else { return this.connection.get(this.resolvedReaderURI(), undefined, callback); }
    }
}

abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN = "/verify-pin";

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return this.connection.post(this.resolvedReaderURI() + GenericPinCard.VERIFY_PIN, body, undefined, callback);
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


    public allAlgoRefsForAuthentication(callback?:
                                            (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, undefined, callback);
    }

    public allCerts(filters: string[],
                    callback?: (error: RestException, data: DataObjectResponse) => void): void | Promise<DataObjectResponse> {
        if (filters && filters.length) {
            return this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES,
                GenericCertCard.createFilterQueryParam(filters),
                callback);
        }
        else { return this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES, undefined, callback); }
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, body, undefined, callback);
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return this.connection.post(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, body, undefined, callback);
    }

    protected getCertificate(certUrl: string, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES + certUrl, undefined, callback);
    }
}

abstract class GenericSecuredCertCard extends GenericCard implements SecuredCertCard {
    static ALL_CERTIFICATES = "/certificates";
    static AUTHENTICATE = "/authenticate";
    static CERT_AUTHENTICATION = "/authentication";
    static CERT_NON_REPUDIATION = "/non-repudiation";
    static CERT_INTERMEDIATE = "/intermediate";
    static CERT_ROOT = "/root";
    static CERT_SIGNING = "/signing";
    static SIGN_DATA = "/sign";
    static VERIFY_PIN = "/verify-pin";

    public allAlgoRefsForAuthentication(callback?: (error: RestException,
                                                    data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, undefined, callback);
    }

    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void) {
        if (filters && filters.length) { return this.connection.post(this.resolvedReaderURI(),
            body,
            GenericSecuredCertCard.createFilterQueryParam(filters),
            callback);
        } else { return this.connection.post(this.resolvedReaderURI(), body, undefined, callback); }
    }

    public allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void) {
        if (filters && filters.length) {
            return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES,
                body,
                GenericSecuredCertCard.createFilterQueryParam(filters),
                callback);
        } else { return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES,
            body, undefined, callback);
        }
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.VERIFY_PIN, body, undefined, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, body, undefined, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, body, undefined, callback);
    }

    protected getCertificate(certUrl: string,
                             body: OptionalPin,
                             callback: (error: RestException,
                                        data: DataResponse) => void,
                             params?: { filter?: string, pin?: string }): void | Promise<DataResponse> {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl, body, params, callback);
    }

    protected getCertificateArray(certUrl: string,
                                  body: OptionalPin,
                                  callback: (error: RestException,
                                             data: DataArrayResponse) => void,
                                  params?: { filter?: string, pin?: string }): void | Promise<DataArrayResponse> {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl, body, params, callback);
    }
}
