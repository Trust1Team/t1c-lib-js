import { AbstractEMV, EmvApplicationDataResponse, EmvApplicationsResponse, EmvCertificateResponse } from './EMVModel';
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { GenericPinCard } from '../Card';
import { LocalConnection } from '../../../core/client/Connection';
export declare class EMV extends GenericPinCard implements AbstractEMV {
    static CONTAINER_PREFIX: string;
    static APPLICATIONS: string;
    static APPLICATION_DATA: string;
    static ISSUER_PUBLIC_KEY_CERT: string;
    static ICC_PUBLIC_KEY_CERT: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    applicationData(callback?: (error: T1CLibException, data: EmvApplicationDataResponse) => void): Promise<EmvApplicationDataResponse>;
    applications(callback?: (error: T1CLibException, data: EmvApplicationsResponse) => void): Promise<EmvApplicationsResponse>;
    iccPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}
