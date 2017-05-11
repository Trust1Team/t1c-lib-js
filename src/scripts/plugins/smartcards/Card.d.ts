import { RestException } from "../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../core/service/CoreModel";
import { LocalConnection } from "../../core/client/Connection";
export { Card, CertCard, PinCard, SecuredCertCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin, GenericCard, GenericSmartCard, GenericPinCard, GenericCertCard, GenericSecuredCertCard };
interface Card {
    allData: (filters: string[], callback: () => void) => void;
}
interface OptionalPin {
    pin?: string;
}
interface VerifyPinData extends OptionalPin {
    private_key_reference: string;
}
interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback: () => void) => void;
}
interface CertCard extends PinCard {
    allCerts: (filters: string[], callback: () => void) => void;
    authenticate: (body: any, callback: () => void) => void;
    signData: (body: any, callback: () => void) => void;
}
interface SecuredCertCard {
    allCerts: (filters: string[], body: OptionalPin, callback: () => void) => void;
    allData: (filters: string[], body: OptionalPin, callback: () => void) => void;
    authenticate: (body: any, callback: () => void) => void;
    signData: (body: any, callback: () => void) => void;
}
interface AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string;
    data: string;
}
interface ResetPinData {
    puk: string;
    new_pin: string;
    private_key_reference: string;
}
declare abstract class GenericCard {
    protected url: string;
    protected connection: LocalConnection;
    protected reader_id: string;
    constructor(url: string, connection: LocalConnection, reader_id: string);
    protected static createFilterQueryParam(filters: string[], pin?: string): {
        filter: string;
        pin?: string;
    };
    protected resolvedReaderURI(): string;
}
declare abstract class GenericSmartCard extends GenericCard implements Card {
    allData(filters: string[], callback: (error: RestException, data: DataObjectResponse) => void): void;
}
declare abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN: string;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
}
declare abstract class GenericCertCard extends GenericPinCard implements CertCard {
    static ALL_CERTIFICATES: string;
    static AUTHENTICATE: string;
    static CERT_ROOT: string;
    static CERT_AUTHENTICATION: string;
    static CERT_NON_REPUDIATION: string;
    static CERT_ISSUER: string;
    static CERT_SIGNING: string;
    static CERT_ENCRYPTION: string;
    static CERT_CITIZEN: string;
    static CERT_RRN: string;
    static SIGN_DATA: string;
    allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: DataObjectResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    protected getCertificate(certUrl: string, callback: (error: RestException, data: DataResponse) => void): void;
}
declare abstract class GenericSecuredCertCard extends GenericCard implements SecuredCertCard {
    static ALL_CERTIFICATES: string;
    static AUTHENTICATE: string;
    static CERT_AUTHENTICATION: string;
    static CERT_NON_REPUDIATION: string;
    static CERT_ROOT: string;
    static CERT_SIGNING: string;
    static SIGN_DATA: string;
    static VERIFY_PIN: string;
    allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void): void;
    allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    protected getCertificate(certUrl: string, body: OptionalPin, callback: (error: RestException, data: DataResponse) => void, params?: {
        filter?: string;
        pin?: string;
    }): void;
    protected getCertificateArray(certUrl: string, body: OptionalPin, callback: (error: RestException, data: DataArrayResponse) => void, params?: {
        filter?: string;
        pin?: string;
    }): void;
}
