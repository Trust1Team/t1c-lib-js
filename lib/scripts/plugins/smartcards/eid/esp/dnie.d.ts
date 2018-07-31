import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse } from '../../../../core/service/CoreModel';
import { GenericSecuredCertCard } from '../../Card';
import { AbstractDNIe, DNIeInfoResponse } from './dnieModel';
import { Options } from '../../../../util/RequestHandler';
import { LocalConnection } from '../../../../core/client/Connection';
export declare class DNIe extends GenericSecuredCertCard implements AbstractDNIe {
    static CONTAINER_PREFIX: string;
    static INFO: string;
    static CERT_INTERMEDIATE: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    info(callback?: (error: T1CLibException, data: DNIeInfoResponse) => void): Promise<DNIeInfoResponse>;
    intermediateCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
