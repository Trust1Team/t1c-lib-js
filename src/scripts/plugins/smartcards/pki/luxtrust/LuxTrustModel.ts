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

export { AbstractLuxTrust, LuxtrustAllCertsResponse, LuxtrustAllDataResponse, LuxtrustAllCerts };


interface AbstractLuxTrust extends CertCard {
    activated(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: LuxtrustAllDataResponse) => void): Promise<LuxtrustAllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: LuxtrustAllCertsResponse) => void): Promise<LuxtrustAllCertsResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

class LuxtrustAllCertsResponse extends DataObjectResponse {
    constructor(public data: LuxtrustAllCerts, public success: boolean) {
        super(data, success);
    }
}

class LuxtrustAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate[]) {}
}

class LuxtrustAllDataResponse extends LuxtrustAllCertsResponse {
    constructor(public data: LuxtrustAllCerts, public success: boolean) {
        super(data, success);
    }
}
