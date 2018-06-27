import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { CertCard } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractLuxTrust extends CertCard {
    activated(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: LuxtrustAllDataResponse) => void): Promise<LuxtrustAllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: LuxtrustAllCertsResponse) => void): Promise<LuxtrustAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
export declare class LuxtrustAllCertsResponse extends DataObjectResponse {
    data: LuxtrustAllCerts;
    success: boolean;
    constructor(data: LuxtrustAllCerts, success: boolean);
}
export declare class LuxtrustAllCerts {
    authentication_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_certificate: T1CCertificate[];
    constructor(authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_certificate?: T1CCertificate[]);
}
export declare class LuxtrustAllDataResponse extends LuxtrustAllCertsResponse {
    data: LuxtrustAllCerts;
    success: boolean;
    constructor(data: LuxtrustAllCerts, success: boolean);
}
