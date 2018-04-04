/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */

import { AbstractEMV, ApplicationDataResponse, ApplicationsResponse, EmvCertificateResponse } from './EMVModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericPinCard } from '../Card';

export { EMV };


class EMV extends GenericPinCard implements AbstractEMV {
    static APPLICATIONS = '/applications';
    static APPLICATION_DATA = '/application-data';
    static ISSUER_PUBLIC_KEY_CERT = '/issuer-public-key-certificate';
    static ICC_PUBLIC_KEY_CERT = '/icc-public-key-certificate';

    public applicationData(callback?: (error: RestException, data: ApplicationDataResponse) => void): Promise<ApplicationDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EMV.APPLICATION_DATA), undefined, undefined, callback);
    }

    public applications(callback?: (error: RestException, data: ApplicationsResponse) => void): Promise<ApplicationsResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EMV.APPLICATIONS), undefined, undefined, callback);
    }

    public iccPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse)
        => void): Promise<EmvCertificateResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(EMV.ICC_PUBLIC_KEY_CERT),
            { aid }, undefined, undefined, callback);
    }

    public issuerPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse)
        => void): Promise<EmvCertificateResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(EMV.ISSUER_PUBLIC_KEY_CERT),
            { aid }, undefined, undefined, callback);
    }
}
