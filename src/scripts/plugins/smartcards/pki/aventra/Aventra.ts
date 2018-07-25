/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {RestException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, T1CResponse} from '../../../../core/service/CoreModel';
import {GenericCertCard, ResetPinData, VerifyPinData} from '../../Card';
import {AbstractAventra} from './AventraModel';
import {PinEnforcer} from '../../../../util/PinEnforcer';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';

export class Aventra extends GenericCertCard implements AbstractAventra {
    static CONTAINER_PREFIX = 'aventra';
    static DEFAULT_VERIFY_PIN = 'sign';
    static RESET_PIN = '/reset-pin';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, Aventra.CONTAINER_PREFIX);
    }

// filters
    public allDataFilters() {
        return ['applet-info', 'root_certificate', 'authentication-certificate',
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
        return this.getCertificate(Aventra.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public issuerCertificate(options?: Options,
                             callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }

    public encryptionCertificate(options?: Options,
                                 callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Aventra.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Aventra.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }

    public resetPin(body: ResetPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Aventra.RESET_PIN), body, undefined, undefined, callback);
    }
}
