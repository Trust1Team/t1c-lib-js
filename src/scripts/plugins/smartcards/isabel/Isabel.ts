/**
 * @author William Verhaeghe
 * @since 2019
 */

import {AbstractIsabel} from './IsabelModel';
import {LocalConnection, CertificateResponse, Options, PinEnforcer, RequestHandler, T1CLibException, OptionalPin, T1CResponse, AuthenticateOrSignData, DataResponse, VerifyPinData} from '../../../..';
import {GenericCertCard} from '../Card';

export class Isabel extends GenericCertCard implements AbstractIsabel {
    static CONTAINER_PREFIX = 'isabel';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';
    static CERT_INTERMEDIATE = '/intermediate';

    constructor(baseUrl: string,
                containerUrl: string,
                connection: LocalConnection,
                reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, Isabel.CONTAINER_PREFIX);
    }

    public rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Isabel.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    // public verifyPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
    //     return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
    //         let encryptedBody = Object.assign({private_key_reference: Isabel.VERIFY_PRIV_KEY_REF}, body);
    //         return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.VERIFY_PIN),
    //             encryptedBody, undefined, undefined, callback);
    //     });
    // }

    public intermediateCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Isabel.CERT_INTERMEDIATE, RequestHandler.determineOptions(options, callback));
    }

    public nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Isabel.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return super.verifyPin(body, callback);
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return super.signData(body, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return super.authenticate(body, callback);
    }
}
