/**
 * @author William Verhaeghe
 * @since 2019
 */

import { AbstractIsabel, IsabelApplicationDataResponse, IsabelApplicationsResponse, IsabelCertificateResponse } from './IsabelModel';
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { GenericPinCard } from '../Card';
import {LocalConnection} from '../../../core/client/Connection';

export class Isabel extends GenericPinCard implements AbstractIsabel {
    static CONTAINER_PREFIX = 'isabel';
    static APPLICATIONS = '/applications';
    static APPLICATION_DATA = '/application-data';
    static ISSUER_PUBLIC_KEY_CERT = '/issuer-public-key-certificate';
    static ICC_PUBLIC_KEY_CERT = '/icc-public-key-certificate';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, Isabel.CONTAINER_PREFIX);
    }

    public applicationData(callback?: (error: T1CLibException, data: IsabelApplicationDataResponse) => void): Promise<IsabelApplicationDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(Isabel.APPLICATION_DATA), undefined, undefined, callback);
    }

    public applications(callback?: (error: T1CLibException, data: IsabelApplicationsResponse) => void): Promise<IsabelApplicationsResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(Isabel.APPLICATIONS), undefined, undefined, callback);
    }

    public iccPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: IsabelCertificateResponse)
        => void): Promise<IsabelCertificateResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Isabel.ICC_PUBLIC_KEY_CERT),
            { aid }, undefined, undefined, callback);
    }

    public issuerPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: IsabelCertificateResponse)
        => void): Promise<IsabelCertificateResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Isabel.ISSUER_PUBLIC_KEY_CERT),
            { aid }, undefined, undefined, callback);
    }
}
