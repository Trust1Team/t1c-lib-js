import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard } from '../../Card';
import { AbstractLuxTrust } from './LuxTrustModel';
import { Options } from '../../../../util/RequestHandler';
export declare class LuxTrust extends GenericCertCard implements AbstractLuxTrust {
    static ACTIVATED: string;
    activated(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
