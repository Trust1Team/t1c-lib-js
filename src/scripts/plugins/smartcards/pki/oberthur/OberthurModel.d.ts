import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { CertCard, VerifyPinData } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export { AbstractOberthur, AllCertsResponse, AllDataResponse, AllOberthurCerts };
interface AbstractOberthur extends CertCard {
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
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllOberthurCerts;
    success: boolean;
    constructor(data: AllOberthurCerts, success: boolean);
}
declare class AllOberthurCerts {
    root_certificate: T1CCertificate;
    issuer_certificate: T1CCertificate;
    authentication_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    encryption_certificate: T1CCertificate;
    constructor(root_certificate: T1CCertificate, issuer_certificate: T1CCertificate, authentication_certificate: T1CCertificate, signing_certificate: T1CCertificate, encryption_certificate: T1CCertificate);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllOberthurCerts;
    success: boolean;
    constructor(data: AllOberthurCerts, success: boolean);
}
