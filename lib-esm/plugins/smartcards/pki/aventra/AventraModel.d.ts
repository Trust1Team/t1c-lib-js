import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { CertCard, ResetPinData, VerifyPinData } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractAventra extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AventraAllDataResponse) => void): Promise<AventraAllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AventraAllCertsResponse) => void): Promise<AventraAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}
export declare class AventraAllCertsResponse extends DataObjectResponse {
    data: AventraAllCerts;
    success: boolean;
    constructor(data: AventraAllCerts, success: boolean);
}
export declare class AventraAllCerts {
    authentication_certificate?: T1CCertificate;
    encryption_certificate?: T1CCertificate;
    issuer_certificate?: T1CCertificate;
    signing_certificate?: T1CCertificate;
    root_certificate?: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, encryption_certificate?: T1CCertificate, issuer_certificate?: T1CCertificate, signing_certificate?: T1CCertificate, root_certificate?: T1CCertificate);
}
export declare class AventraAllDataResponse extends DataObjectResponse {
    data: AventraAllData;
    success: boolean;
    constructor(data: AventraAllData, success: boolean);
}
export declare class AventraAllData {
    applet_info?: AventraAppletInfo;
    authentication_certificate?: T1CCertificate;
    encryption_certificate?: T1CCertificate;
    issuer_certificate?: T1CCertificate;
    signing_certificate?: T1CCertificate;
    root_certificate?: T1CCertificate;
    constructor(applet_info?: AventraAppletInfo, authentication_certificate?: T1CCertificate, encryption_certificate?: T1CCertificate, issuer_certificate?: T1CCertificate, signing_certificate?: T1CCertificate, root_certificate?: T1CCertificate);
}
export declare class AventraAppletInfo {
    change_counter?: number;
    name?: string;
    serial?: string;
    version?: string;
    constructor(change_counter?: number, name?: string, serial?: string, version?: string);
}
