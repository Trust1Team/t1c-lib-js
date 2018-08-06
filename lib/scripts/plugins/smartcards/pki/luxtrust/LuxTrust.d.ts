import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard } from '../../Card';
import { AbstractLuxTrust } from './LuxTrustModel';
import { Options } from '../../../../util/RequestHandler';
import { LocalConnection } from '../../../../core/client/Connection';
export declare class LuxTrust extends GenericCertCard implements AbstractLuxTrust {
    static CONTAINER_PREFIX: string;
    static ACTIVATED: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    activated(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
