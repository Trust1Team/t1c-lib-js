import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { CertCard, ResetPinData, VerifyPinData } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export { AbstractAventra, AllCertsResponse, AllDataResponse, AllAventraCerts, AllAventraData, AppletInfo };
interface AbstractAventra extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllAventraCerts;
    success: boolean;
    constructor(data: AllAventraCerts, success: boolean);
}
declare class AllAventraCerts {
    authentication_certificate: T1CCertificate;
    encryption_certificate: T1CCertificate;
    issuer_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    root_certificate: T1CCertificate;
    constructor(authentication_certificate: T1CCertificate, encryption_certificate: T1CCertificate, issuer_certificate: T1CCertificate, signing_certificate: T1CCertificate, root_certificate: T1CCertificate);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllAventraData;
    success: boolean;
    constructor(data: AllAventraData, success: boolean);
}
declare class AllAventraData {
    applet_info: AppletInfo;
    authentication_certificate: T1CCertificate;
    encryption_certificate: T1CCertificate;
    issuer_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    root_certificate: T1CCertificate;
    constructor(applet_info: AppletInfo, authentication_certificate: T1CCertificate, encryption_certificate: T1CCertificate, issuer_certificate: T1CCertificate, signing_certificate: T1CCertificate, root_certificate: T1CCertificate);
}
declare class AppletInfo {
    change_counter: number;
    name: string;
    serial: string;
    version: string;
    constructor(change_counter: number, name: string, serial: string, version: string);
}
