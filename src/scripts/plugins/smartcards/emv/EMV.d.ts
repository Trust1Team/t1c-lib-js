import { AbstractEMV, ApplicationDataResponse, ApplicationsResponse, EmvCertificateResponse } from './EMVModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericPinCard } from '../Card';
export { EMV };
declare class EMV extends GenericPinCard implements AbstractEMV {
    static APPLICATIONS: string;
    static APPLICATION_DATA: string;
    static ISSUER_PUBLIC_KEY_CERT: string;
    static ICC_PUBLIC_KEY_CERT: string;
    applicationData(callback?: (error: RestException, data: ApplicationDataResponse) => void): Promise<ApplicationDataResponse>;
    applications(callback?: (error: RestException, data: ApplicationsResponse) => void): Promise<ApplicationsResponse>;
    iccPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}
