import { LocalConnection, QueryParams, RequestHeaders } from '../../../../core/client/Connection';
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { AuthenticateOrSignData, GenericCertCard, OptionalPin, PinTryCounterData } from '../../Card';
import { CertificateResponse, CertificatesResponse, DataResponse, T1CResponse } from '../../../../core/service/CoreModel';
import { AbstractEidLUX, AllCertsResponse, LuxAllDataResponse, LuxidBiometricResponse, LuxidPictureResponse, LuxidSignatureImageResponse, LuxPinTryCounterResponse, LuxPinResetData, LuxPinUnblockData, LuxPinChangeData } from './EidLuxModel';
import { Options, RequestOptions } from '../../../../util/RequestHandler';
export declare class EidLux extends GenericCertCard implements AbstractEidLUX {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    protected reader_id: string;
    protected can: string;
    static BIOMETRIC: string;
    static ADDRESS: string;
    static PHOTO: string;
    static SIGNATURE_IMAGE: string;
    static PIN_CHANGE: string;
    static PIN_RESET: string;
    static PIN_TRY_COUNTER: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string, can: string);
    private static EncryptedPinHeader;
    private static EncryptedCanHeader;
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(options?: string[] | Options, callback?: (error: RestException, data: LuxAllDataResponse) => void): Promise<LuxAllDataResponse>;
    allCerts(options?: string[] | Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    biometric(callback?: (error: RestException, data: LuxidBiometricResponse) => void): Promise<LuxidBiometricResponse>;
    picture(callback?: (error: RestException, data: LuxidPictureResponse) => void): Promise<LuxidPictureResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void | Promise<CertificateResponse>): Promise<CertificateResponse>;
    nonRepudiationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void | Promise<CertificateResponse>): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>): Promise<any>;
    signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): Promise<any>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>): Promise<any>;
    signatureImage(callback?: (error: RestException, data: LuxidSignatureImageResponse) => void | Promise<LuxidSignatureImageResponse>): Promise<any>;
    pinTryCounter(pin_reference: PinTryCounterData, callback?: (error: RestException, data: LuxPinTryCounterResponse) => void): Promise<LuxPinTryCounterResponse>;
    pinReset(body: LuxPinResetData, callback?: (error: RestException, data: T1CResponse) => (void | Promise<T1CResponse>)): Promise<any>;
    pinChange(body: LuxPinChangeData, callback?: (error: RestException, data: T1CResponse) => (void | Promise<T1CResponse>)): Promise<any>;
    pinUnblock(body: LuxPinUnblockData, callback?: (error: RestException, data: T1CResponse) => (void | Promise<T1CResponse>)): Promise<any>;
    protected getCertificate(certUrl: string, options: RequestOptions, params?: QueryParams, headers?: RequestHeaders): Promise<CertificateResponse>;
    protected getCertificateArray(certUrl: string, options: RequestOptions, params?: QueryParams, headers?: RequestHeaders): Promise<CertificatesResponse>;
}
