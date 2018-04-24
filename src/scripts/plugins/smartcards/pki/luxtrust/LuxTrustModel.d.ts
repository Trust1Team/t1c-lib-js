import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { CertCard } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export { AbstractLuxTrust, AllCertsResponse, AllDataResponse, AllLuxTrustCerts };
interface AbstractLuxTrust extends CertCard {
    activated(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllLuxTrustCerts;
    success: boolean;
    constructor(data: AllLuxTrustCerts, success: boolean);
}
declare class AllLuxTrustCerts {
    authentication_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_certificate: T1CCertificate[];
    constructor(authentication_certificate: T1CCertificate, non_repudiation_certificate: T1CCertificate, root_certificate: T1CCertificate[]);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllLuxTrustCerts;
    success: boolean;
    constructor(data: AllLuxTrustCerts, success: boolean);
}
