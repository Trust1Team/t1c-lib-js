import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { CertCard } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractOberthur extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: T1CLibException, data: OberthurAllDataResponse) => void): Promise<OberthurAllDataResponse>;
    allCerts(filters: string[], callback?: (error: T1CLibException, data: OberthurAllCertsResponse) => void): Promise<OberthurAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
export declare class OberthurAllCertsResponse extends DataObjectResponse {
    data: OberthurAllCerts;
    success: boolean;
    constructor(data: OberthurAllCerts, success: boolean);
}
export declare class OberthurAllCerts {
    root_certificate?: T1CCertificate;
    issuer_certificate?: T1CCertificate;
    authentication_certificate?: T1CCertificate;
    signing_certificate?: T1CCertificate;
    encryption_certificate?: T1CCertificate;
    constructor(root_certificate?: T1CCertificate, issuer_certificate?: T1CCertificate, authentication_certificate?: T1CCertificate, signing_certificate?: T1CCertificate, encryption_certificate?: T1CCertificate);
}
export declare class OberthurAllDataResponse extends OberthurAllCertsResponse {
    data: OberthurAllCerts;
    success: boolean;
    constructor(data: OberthurAllCerts, success: boolean);
}
