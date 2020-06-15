import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { CertCard } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractIdemia_Ias_Ecc extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: T1CLibException, data: Idemia_Ias_EccAllDataResponse) => void): Promise<Idemia_Ias_EccAllDataResponse>;
    allCerts(filters: string[], callback?: (error: T1CLibException, data: Idemia_Ias_EccAllCertsResponse) => void): Promise<Idemia_Ias_EccAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
export declare class Idemia_Ias_EccAllCertsResponse extends DataObjectResponse {
    data: Idemia_Ias_EccAllCerts;
    success: boolean;
    constructor(data: Idemia_Ias_EccAllCerts, success: boolean);
}
export declare class Idemia_Ias_EccAllCerts {
    root_certificate?: T1CCertificate;
    issuer_certificate?: T1CCertificate;
    authentication_certificate?: T1CCertificate;
    signing_certificate?: T1CCertificate;
    encryption_certificate?: T1CCertificate;
    constructor(root_certificate?: T1CCertificate, issuer_certificate?: T1CCertificate, authentication_certificate?: T1CCertificate, signing_certificate?: T1CCertificate, encryption_certificate?: T1CCertificate);
}
export declare class Idemia_Ias_EccAllDataResponse extends Idemia_Ias_EccAllCertsResponse {
    data: Idemia_Ias_EccAllCerts;
    success: boolean;
    constructor(data: Idemia_Ias_EccAllCerts, success: boolean);
}
