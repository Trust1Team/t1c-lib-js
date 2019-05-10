/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection, QueryParams, RequestHeaders} from '../../../../core/client/Connection';
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {AuthenticateOrSignData, GenericCertCard, GenericSecuredCertCard, OptionalPin, PinTryCounterData} from '../../Card';
import {CertificateResponse, CertificatesResponse, DataResponse, T1CResponse} from '../../../../core/service/CoreModel';
import {
    AbstractEidLUX, AllCertsResponse, LuxAllDataResponse, LuxidBiometricResponse, LuxidPictureResponse, LuxidSignatureImageResponse,
    LuxPinTryCounterResponse, LuxPinResetData, LuxPinUnblockData, LuxPinChangeData, PinType
} from './EidLuxModel';
import {PinEnforcer} from '../../../../util/PinEnforcer';
import {CertParser} from '../../../../util/CertParser';
import {ResponseHandler} from '../../../../util/ResponseHandler';
import {Options, RequestHandler, RequestOptions} from '../../../../util/RequestHandler';

export class EidLux extends GenericCertCard implements AbstractEidLUX {
    static CONTAINER_PREFIX = 'luxeid';
    static BIOMETRIC = '/biometric';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static SIGNATURE_IMAGE = '/signature-image';
    static PIN_CHANGE = '/change-pin';
    static PIN_RESET = '/reset-pin';
    static PIN_TRY_COUNTER = '/pin-try-counter';


    // constructor
    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected reader_id: string,
                protected pin: string,
                protected pinType: PinType) {
        super(baseUrl, containerUrl, connection, reader_id, EidLux.CONTAINER_PREFIX);
        if (!pinType) {
            this.pinType = PinType.PIN;
        }
        this.pin = PinEnforcer.encryptPin(pin);
    }

    // by default using Pace-PIN
    private static EncryptedHeader(code: string, pinType: PinType) {
        if (pinType === PinType.CAN) {
            return {'X-Encrypted-Can': code};
        } else {
            return {'X-Encrypted-Pin': code};
        }
    }

    // filters
    public allDataFilters() {
        return ['authentication-certificate', 'biometric', 'non-repudiation-certificate', 'picture', 'root-certificates'];
    }

    public allCertFilters() {
        return ['authentication-certificate', 'non-repudiation-certificate', 'root-certificates'];
    }

    public allData(options?: string[] | Options,
                   callback?: (error: T1CLibException, data: LuxAllDataResponse) => void): Promise<LuxAllDataResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), reqOptions.params,
            EidLux.EncryptedHeader(this.pin, this.pinType)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public allCerts(options?: string[] | Options,
                    callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.ALL_CERTIFICATES), reqOptions.params,
            EidLux.EncryptedHeader(this.pin, this.pinType)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public biometric(callback?: (error: T1CLibException, data: LuxidBiometricResponse) => void): Promise<LuxidBiometricResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.BIOMETRIC),
            undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }

    // in order to access the address information, we need different keys, and on Lux gov level this is protected
    /*address(callback) {this.connection.get(this.baseUrl, this.containerSuffix(LUX_ADDRESS, callback, createPinQueryParam(this.pin));}*/

    public picture(callback?: (error: T1CLibException, data: LuxidPictureResponse) => void): Promise<LuxidPictureResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.PHOTO),
            undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }

    public rootCertificate(options?: Options,
                           callback?: (error: T1CLibException, data: CertificatesResponse) => void): Promise<CertificatesResponse> {
        return this.getCertificateArray(EidLux.CERT_ROOT,
            RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void | Promise<CertificateResponse>) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION,
            RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    }

    public nonRepudiationCertificate(options?: Options,
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void | Promise<CertificateResponse>) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION,
            RequestHandler.determineOptions(options, callback), undefined, EidLux.EncryptedHeader(this.pin, this.pinType));
    }

    public verifyPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }

    public verifyPinWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.VERIFY_PIN), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }

    public signDataWithEncryptedPin(body: OptionalPin, callback?: (error: T1CLibException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.SIGN_DATA), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: T1CLibException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }

    public authenticateWithEncryptedPin(body: OptionalPin,
                                        callback?: (error: T1CLibException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.AUTHENTICATE), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
        });
    }

    public signatureImage(callback?: (error: T1CLibException, data: LuxidSignatureImageResponse) => void | Promise<LuxidSignatureImageResponse>) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.SIGNATURE_IMAGE),
            undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }

    public pinTryCounter(pin_reference: PinTryCounterData, callback?: (error: T1CLibException, data: LuxPinTryCounterResponse) => void): Promise<LuxPinTryCounterResponse> {
        return this.connection.post(this.baseUrl,
            this.containerSuffix(EidLux.PIN_TRY_COUNTER), pin_reference, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }

    public pinReset(body: LuxPinResetData, callback?: (error: T1CLibException, data: T1CResponse) => (void | Promise<T1CResponse>)) {
        body.pin = PinEnforcer.encryptPin(body.pin);
        body.puk = PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }

    public pinChange(body: LuxPinChangeData, callback?: (error: T1CLibException, data: T1CResponse) => (void | Promise<T1CResponse>)) {
        body.old_pin = PinEnforcer.encryptPin(body.old_pin);
        body.new_pin = PinEnforcer.encryptPin(body.new_pin);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_CHANGE), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
    }

    public pinUnblock(body: LuxPinUnblockData, callback?: (error: T1CLibException, data: T1CResponse) => (void | Promise<T1CResponse>)) {
        body.puk = PinEnforcer.encryptPin(body.puk);
        return this.connection.post(this.baseUrl, this.containerSuffix(EidLux.PIN_RESET), body, undefined, EidLux.EncryptedHeader(this.pin, this.pinType), callback);
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
            }, err => {
                return ResponseHandler.error(err, options.callback);
            });
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
            }, err => {
                return ResponseHandler.error(err, options.callback);
            });
        });
    }

}
