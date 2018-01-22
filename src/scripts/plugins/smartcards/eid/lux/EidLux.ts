/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from '../../../../core/client/Connection';
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { AuthenticateOrSignData, GenericSecuredCertCard, OptionalPin } from '../../Card';
import { CertificateResponse, CertificatesResponse, DataResponse, T1CResponse } from '../../../../core/service/CoreModel';
import {
    AbstractEidLUX, AllCertsResponse, AllDataResponse,
    BiometricResponse, PictureResponse, SignatureImageResponse
} from './EidLuxModel';
import { Promise } from 'es6-promise';
import { Certificate } from 'pkijs';
import { PinEnforcer } from '../../../../util/PinEnforcer';
import { CertParser } from '../../../../util/CertParser';
import { ResponseHandler } from '../../../../util/ResponseHandler';
import { Options, RequestHandler, RequestOptions } from '../../../../util/RequestHandler';

export { EidLux };


function createFilterQueryParam(filterParams: { filter?: string }, pin: string): { filter?: string, pin: string } {
    return {
        filter: filterParams.filter,
        pin
    };
}
function createPinQueryParam(pin: string): { pin: string } {
    return { pin };
}


class EidLux extends GenericSecuredCertCard implements AbstractEidLUX {
    static BIOMETRIC = '/biometric';
    static ADDRESS = '/address';
    static PHOTO = '/picture';
    static SIGNATURE_IMAGE = '/signature-image';


    // constructor
    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected reader_id: string,
                private pin: string) {
        super(baseUrl, containerUrl, connection, reader_id);
    }

    // filters
    public allDataFilters() {
        return [ 'authentication-certificate', 'biometric', 'non-repudiation-certificate', 'picture', 'root-certificates' ];
    }

    public allCertFilters() {
        return [ 'authentication-certificate', 'non-repudiation-certificate', 'root-certificates' ];
    }

    public allData(options?: string[] | Options,
                   callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), createFilterQueryParam(reqOptions.params, this.pin)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public allCerts(options?: string[] | Options,
                    callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.ALL_CERTIFICATES),
            createFilterQueryParam(reqOptions.params, this.pin)).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public biometric(callback?: (error: RestException, data: BiometricResponse) => void): Promise<BiometricResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.BIOMETRIC), createPinQueryParam(this.pin), callback);
    }

    // in order to access the address information, we need different keys, and on Lux gov level this is protected
    /*address(callback) {this.connection.get(this.baseUrl, this.containerSuffix(LUX_ADDRESS, callback, createPinQueryParam(this.pin));}*/

    public picture(callback?: (error: RestException, data: PictureResponse) => void): Promise<PictureResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.PHOTO), createPinQueryParam(this.pin), callback);
    }

    public rootCertificate(options?: Options,
                           callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse> {
        return this.getCertificateArray(EidLux.CERT_ROOT,
            RequestHandler.determineOptions(options, callback), createPinQueryParam(this.pin));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void | Promise<CertificateResponse>) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION,
            RequestHandler.determineOptions(options, callback), createPinQueryParam(this.pin));
    }

    public nonRepudiationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void | Promise<CertificateResponse>) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION,
            RequestHandler.determineOptions(options, callback), createPinQueryParam(this.pin));
    }

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.VERIFY_PIN), body, createPinQueryParam(this.pin), callback);
        });
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.SIGN_DATA), body, createPinQueryParam(this.pin), callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl,
                this.containerSuffix(EidLux.AUTHENTICATE), body, createPinQueryParam(this.pin), callback);
        });
    }

    public signatureImage(callback?: (error: RestException, data: SignatureImageResponse) => void | Promise<SignatureImageResponse>) {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidLux.SIGNATURE_IMAGE), createPinQueryParam(this.pin), callback);
    }

    protected getCertificate(certUrl: string,
                             options: RequestOptions,
                             params?: { filter?: string, pin?: string }): Promise<CertificateResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, params.pin).then(() => {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params).then(certData => {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, err => { return ResponseHandler.error(err, options.callback); });
        });
    }

    protected getCertificateArray(certUrl: string,
                                  options: RequestOptions,
                                  params?: { filter?: string, pin?: string }): Promise<CertificatesResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, params.pin).then(() => {
            return self.connection.get(self.baseUrl, self.containerSuffix(EidLux.ALL_CERTIFICATES + certUrl), params).then(certData => {
                return CertParser.process(certData, options.parseCerts, options.callback);
            }, err => { return ResponseHandler.error(err, options.callback); });
        });
    }
}
