import { RestException } from '../../core/exceptions/CoreExceptions';
import { CertificateResponse, CertificatesResponse, DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from '../../core/service/CoreModel';
import { LocalConnection } from '../../core/client/Connection';
import { Options, RequestOptions } from '../../util/RequestHandler';
export { Card, CertCard, PinCard, SecuredCertCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin, GenericContainer, GenericReaderContainer, GenericSmartCard, GenericPinCard, GenericCertCard, GenericSecuredCertCard };
interface Card {
    allData: (filters: string[], callback?: () => void) => Promise<DataObjectResponse>;
}
interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback?: () => void) => Promise<T1CResponse>;
}
interface CertCard extends PinCard {
    allCerts: (filters: string[] | Options, callback?: () => void) => Promise<DataObjectResponse>;
    authenticate: (body: any, callback?: () => void) => Promise<DataResponse>;
    signData: (body: any, callback?: () => void) => Promise<DataResponse>;
}
interface SecuredCertCard {
    allCerts: (filters: string[] | Options, body: OptionalPin, callback?: () => void) => Promise<DataObjectResponse>;
    allData: (filters: string[] | Options, body: OptionalPin, callback?: () => void) => Promise<DataObjectResponse>;
    authenticate: (body: any, callback?: () => void) => Promise<DataResponse>;
    signData: (body: any, callback?: () => void) => Promise<DataResponse>;
    verifyPin: (body: OptionalPin, callback?: () => void) => Promise<T1CResponse>;
}
declare class OptionalPin {
    pin: string;
    pace: string;
    constructor(pin?: string, pace?: string);
}
declare class AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string;
    data: string;
    pin: string;
    pace: string;
    constructor(algorithm_reference: string, data: string, pin?: string, pace?: string);
}
declare class VerifyPinData extends OptionalPin {
    private_key_reference: string;
    pin: string;
    pace: string;
    constructor(private_key_reference: string, pin: string, pace?: string);
}
declare class ResetPinData {
    puk: string;
    new_pin: string;
    private_key_reference: string;
    constructor(puk: string, new_pin: string, private_key_reference: string);
}
declare abstract class GenericContainer {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    protected containerSuffix(path?: string): string;
}
declare abstract class GenericReaderContainer extends GenericContainer {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    protected reader_id: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    protected containerSuffix(path?: string): string;
}
declare abstract class GenericSmartCard extends GenericReaderContainer implements Card {
    allData(options: string[] | Options, callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
}
declare abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN: string;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
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
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allCerts(options: string[] | Options, callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    protected getCertificate(certUrl: string, options: RequestOptions): Promise<CertificateResponse>;
}
declare abstract class GenericSecuredCertCard extends GenericReaderContainer implements SecuredCertCard {
    static ALL_CERTIFICATES: string;
    static AUTHENTICATE: string;
    static CERT_AUTHENTICATION: string;
    static CERT_NON_REPUDIATION: string;
    static CERT_INTERMEDIATE: string;
    static CERT_ROOT: string;
    static CERT_SIGNING: string;
    static SIGN_DATA: string;
    static VERIFY_PIN: string;
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(options: string[] | Options, body: OptionalPin, callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    allCerts(options: string[] | Options, body: OptionalPin, callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    protected getCertificate(certUrl: string, body: OptionalPin, options: RequestOptions, params?: {
        filter?: string;
        pin?: string;
    }): Promise<CertificateResponse>;
    protected getCertificateArray(certUrl: string, body: OptionalPin, options: RequestOptions, params?: {
        filter?: string;
        pin?: string;
    }): Promise<CertificatesResponse>;
}
