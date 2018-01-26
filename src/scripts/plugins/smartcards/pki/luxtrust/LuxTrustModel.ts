/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import {
    CertificateResponse, DataObjectResponse, DataResponse,
    T1CCertificate
} from '../../../../core/service/CoreModel';
import { CertCard } from '../../Card';
import { Options } from '../../../../util/RequestHandler';

export { AbstractLuxTrust, AllCertsResponse, AllDataResponse };


interface AbstractLuxTrust extends CertCard {
    activated(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllLuxTrustCerts, public success: boolean) {
        super(data, success);
    }
}

class AllLuxTrustCerts {
    constructor(public authentication_certificate: T1CCertificate,
                public non_repudiation_certificate: T1CCertificate,
                public root_certificate: T1CCertificate[]) {}
}

class AllDataResponse extends AllCertsResponse {
    constructor(public data: AllLuxTrustCerts, public success: boolean) {
        super(data, success);
    }
}
