/**
 * @author William Verhaeghe
 * @since 2019
 */

import {AbstractIsabel, IsabelApplicationDataResponse, IsabelApplicationsResponse, IsabelCertificateResponse} from './IsabelModel';
import {LocalConnection, CertificateResponse, Options, PinEnforcer, RequestHandler, T1CLibException, OptionalPin, T1CResponse} from '../../../..';
import {GenericCertCard} from '../Card';

export class Isabel extends GenericCertCard implements AbstractIsabel {
    static CONTAINER_PREFIX = 'isabel';
    static APPLICATIONS = '/applications';
    static APPLICATION_DATA = '/application-data';
    static ISSUER_PUBLIC_KEY_CERT = '/issuer-public-key-certificate';
    static ICC_PUBLIC_KEY_CERT = '/icc-public-key-certificate';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';

    constructor(baseUrl: string,
                containerUrl: string,
                connection: LocalConnection,
                reader_id: string) {
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
            {aid}, undefined, undefined, callback);
    }

    public issuerPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: IsabelCertificateResponse)
        => void): Promise<IsabelCertificateResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Isabel.ISSUER_PUBLIC_KEY_CERT),
            {aid}, undefined, undefined, callback);
    }

    public rootCertificate(options: Options,
                           callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Isabel.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: OptionalPin,
                     callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            let encryptedBody = Object.assign({ private_key_reference: Isabel.VERIFY_PRIV_KEY_REF }, body);
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.VERIFY_PIN),
                encryptedBody, undefined, undefined, callback);
        });
    }
}
