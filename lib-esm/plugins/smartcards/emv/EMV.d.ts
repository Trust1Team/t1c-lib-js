import { AbstractEMV, EmvApplicationDataResponse, EmvApplicationsResponse, EmvCertificateResponse } from './EMVModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericPinCard } from '../Card';
export declare class EMV extends GenericPinCard implements AbstractEMV {
    static APPLICATIONS: string;
    static APPLICATION_DATA: string;
    static ISSUER_PUBLIC_KEY_CERT: string;
    static ICC_PUBLIC_KEY_CERT: string;
    applicationData(callback?: (error: RestException, data: EmvApplicationDataResponse) => void): Promise<EmvApplicationDataResponse>;
    applications(callback?: (error: RestException, data: EmvApplicationsResponse) => void): Promise<EmvApplicationsResponse>;
    iccPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}
