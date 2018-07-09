/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import { LocalConnection, QueryParams, RequestHeaders } from '../../../../core/client/Connection';
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import {AuthenticateOrSignData, GenericCertCard, GenericSecuredCertCard, OptionalPin} from '../../Card';
import { CertificateResponse, CertificatesResponse, DataResponse, T1CResponse } from '../../../../core/service/CoreModel';
import {
    AbstractEidLUX, AllCertsResponse, LuxAllDataResponse,
    LuxidBiometricResponse, LuxidPictureResponse, LuxidSignatureImageResponse, LuxPinResetData
} from './EidLuxModel';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { CertParser } from '../../../../util/CertParser';
import { ResponseHandler } from '../../../../util/ResponseHandler';
import { Options, RequestHandler, RequestOptions } from '../../../../util/RequestHandler';

export class EidLux extends GenericCertCard implements AbstractEidLUX {
    static BIOMETRIC = '/biometric';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static SIGNATURE_IMAGE = '/signature-image';
    static PIN_RESET = 'reset-pin';


    // constructor
    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected reader_id: string,
                private pin: string) {
        super(baseUrl, containerUrl, connection, reader_id);
        this.pin = PinEnforcer.encryptPin(pin);
    }

    private static EncryptedPinHeader(pin: string) {
        return { 'X-Encrypted-Pin': pin };
    }

    // filters
    public allDataFilters() {
        return [ 'authentication-certificate', 'biometric', 'non-repudiation-certificate', 'picture', 'root-certificates' ];
    }

    public allCertFilters() {
        return [ 'authentication-certificate', 'non-repudiation-certificate', 'root-certificates' ];
    }

    public allData(options?: string[] | Options,
                   callback?: (error: RestException, data: LuxAllDataResponse) => void): Promise<LuxAllDataResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), reqOptions.params,
            EidLux.EncryptedPinHeader(this.pin)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public allCerts(options?: string[] | Options,
                    callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.ALL_CERTIFICATES), reqOptions.params,
            EidLux.EncryptedPinHeader(this.pin)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public biometric(callback?: (error: RestException, data: LuxidBiometricResponse) => void): Promise<LuxidBiometricResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.BIOMETRIC),
            undefined, EidLux.EncryptedPinHeader(this.pin), callback);
    }

    // in order to access the address information, we need different keys, and on Lux gov level this is protected
    /*address(callback) {this.connection.get(this.baseUrl, this.containerSuffix(LUX_ADDRESS, callback, createPinQueryParam(this.pin));}*/

    public picture(callback?: (error: RestException, data: LuxidPictureResponse) => void): Promise<LuxidPictureResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.PHOTO),
            undefined, EidLux.EncryptedPinHeader(this.pin), callback);
    }

    public rootCertificate(options?: Options,
                           callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse> {
        return this.getCertificateArray(EidLux.CERT_ROOT,
            RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedPinHeader(this.pin));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void | Promise<CertificateResponse>) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION,
            RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedPinHeader(this.pin));
    }

    public nonRepudiationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void | Promise<CertificateResponse>) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION,
            RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedPinHeader(this.pin));
    }

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedPinHeader(this.pin), callback);
        });
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedPinHeader(this.pin), callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedPinHeader(this.pin), callback);
        });
    }

    public signatureImage(callback?: (error: RestException, data: LuxidSignatureImageResponse) => void | Promise<LuxidSignatureImageResponse>) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.SIGNATURE_IMAGE),
            undefined, EidLux.EncryptedPinHeader(this.pin), callback);
    }

    public pinReset(body: LuxPinResetData, callback?: (error: RestException, data: T1CResponse) => (void | Promise<T1CResponse>)) {
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, undefined, callback);
    }

    protected getCertificate(certUrl: string,
                             options: RequestOptions,
                             params?: QueryParams,
                             headers?: RequestHeaders): Promise<CertificateResponse> {
        let self = this;

        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, this.pin).then(() => {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl),
                params, headers).then(certData => {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, err => { return ResponseHandler.error(err, options.callback); });
        });
    }

    protected getCertificateArray(certUrl: string,
                                  options: RequestOptions,
                                  params?: QueryParams, headers?: RequestHeaders): Promise<CertificatesResponse> {
        let self = this;

        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, this.pin).then(() => {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl),
                params, headers).then(certData => {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, err => { return ResponseHandler.error(err, options.callback); });
        });
    }


}
