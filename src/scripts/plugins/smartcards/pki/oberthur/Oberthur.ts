/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {RestException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, T1CResponse} from '../../../../core/service/CoreModel';
import {GenericCertCard, VerifyPinData} from '../../Card';
import {AbstractOberthur} from './OberthurModel';
import {PinEnforcer} from '../../../../util/PinEnforcer';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';


export class Oberthur extends GenericCertCard implements AbstractOberthur {
    static CONTAINER_PREFIX = 'oberthur';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, Oberthur.CONTAINER_PREFIX);
    }

// filters
    public allDataFilters() {
        return ['root_certificate', 'authentication-certificate',
            'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }

    public allCertFilters() {
        return ['root_certificate', 'authentication-certificate', 'encryption_certificate', 'issuer_certificate', 'signing_certificate'];
    }

    public allKeyRefs() {
        return ['authenticate', 'sign', 'encrypt'];
    }

    public rootCertificate(options?: Options,
                           callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public issuerCertificate(options?: Options,
                             callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }

    public encryptionCertificate(options?: Options,
                                 callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Oberthur.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Oberthur.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
}
