import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse } from '../../../../core/service/CoreModel';
import { GenericSecuredCertCard } from '../../Card';
import { AbstractDNIe, DNIeInfoResponse } from './dnieModel';
import { Options } from '../../../../util/RequestHandler';
export declare class DNIe extends GenericSecuredCertCard implements AbstractDNIe {
    static INFO: string;
    static CERT_INTERMEDIATE: string;
    info(callback?: (error: RestException, data: DNIeInfoResponse) => void): Promise<DNIeInfoResponse>;
    intermediateCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
