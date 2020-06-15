/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, T1CResponse} from '../../../../core/service/CoreModel';
import {GenericCertCard, VerifyPinData} from '../../Card';
import {AbstractIdemia_Ias_Ecc} from './Idemia_Ias_EccModel';
import {PinEnforcer} from '../../../../util/PinEnforcer';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';


export class Idemia_Ias_Ecc extends GenericCertCard implements AbstractIdemia_Ias_Ecc {
    static CONTAINER_PREFIX = 'idemia_ias_ecc';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, Idemia_Ias_Ecc.CONTAINER_PREFIX);
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
                           callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public issuerCertificate(options?: Options,
                             callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_ISSUER, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options,
                              callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }

    public encryptionCertificate(options?: Options,
                                 callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(Idemia_Ias_Ecc.CERT_ENCRYPTION, RequestHandler.determineOptions(options, callback));
    }

    public verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Idemia_Ias_Ecc.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }

    public verifyPinWithEncryptedPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(Idemia_Ias_Ecc.VERIFY_PIN), body, undefined, undefined, callback);
        });
    }
}
