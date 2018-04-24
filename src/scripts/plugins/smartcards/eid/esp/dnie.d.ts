import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard } from '../../Card';
import { AbstractDNIe, InfoResponse } from './dnieModel';
import { Options } from '../../../../util/RequestHandler';
export { DNIe };
declare class DNIe extends GenericCertCard implements AbstractDNIe {
    static INFO: string;
    static CERT_INTERMEDIATE: string;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    intermediateCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
