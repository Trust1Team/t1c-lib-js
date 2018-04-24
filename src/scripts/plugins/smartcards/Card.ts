import { RestException } from '../../core/exceptions/CoreExceptions';
import {
    CertificateResponse, CertificatesResponse, DataArrayResponse, DataObjectResponse, DataResponse,
    T1CResponse
} from '../../core/service/CoreModel';
import { LocalConnection } from '../../core/client/Connection';
import { PinEnforcer } from '../../util/PinEnforcer';
import { CertParser } from '../../util/CertParser';
import { ResponseHandler } from '../../util/ResponseHandler';
import { Options, RequestHandler, RequestOptions } from '../../util/RequestHandler';
/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */


export { Card, CertCard, PinCard, SecuredCertCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin,
    GenericContainer, GenericReaderContainer, GenericSmartCard, GenericPinCard, GenericCertCard, GenericSecuredCertCard };

interface Card {
    allData: (filters: string[], callback?: () => void) => Promise<DataObjectResponse>;
}

interface OptionalPin {
    pin?: string
    pace?: string
}

interface VerifyPinData extends OptionalPin {
    private_key_reference: string
}

interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback?: () => void) => Promise<T1CResponse>;
}

interface CertCard extends PinCard {
    allCerts: (filters: string[] | Options, callback?: () => void) => Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => Promise<DataResponse>
    signData: (body: any, callback?: () => void) => Promise<DataResponse>
}

interface SecuredCertCard {
    allCerts: (filters: string[] | Options, body: OptionalPin, callback?: () => void) => Promise<DataObjectResponse>
    allData: (filters: string[] | Options, body: OptionalPin, callback?: () => void) => Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => Promise<DataResponse>
    signData: (body: any, callback?: () => void) => Promise<DataResponse>
    verifyPin: (body: OptionalPin, callback?: () => void) => Promise<T1CResponse>
}

interface AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string
    data: string,
    id: string
}

interface ResetPinData {
    puk: string,
    new_pin: string
    private_key_reference: string
}

abstract class GenericContainer {

    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection) {}

    // resolves the reader_id in the base URL
    protected containerSuffix(path?: string): string {
        if (path && path.length) { return this.containerUrl + path; }
        else { return this.containerUrl; }
    }
}

abstract class GenericReaderContainer extends GenericContainer {

    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected reader_id: string) {
        super(baseUrl, containerUrl, connection);
    }

    // resolves the reader_id in the base URL
    protected containerSuffix(path?: string): string {
        if (path && path.length) { return this.containerUrl + '/' + this.reader_id + path; }
        else { return this.containerUrl + '/' + this.reader_id; }
    }
}

abstract class GenericSmartCard extends GenericReaderContainer implements Card {
    public allData(options: string[] | Options,
                   callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), requestOptions.params).then(data => {
            return CertParser.process(data, requestOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
}

abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN = '/verify-pin';

    public verifyPin(body: OptionalPin,
                     callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericPinCard.VERIFY_PIN), body, undefined, callback);
        });
    }
}

abstract class GenericCertCard extends GenericPinCard implements CertCard {
    static ALL_CERTIFICATES = '/certificates';
    static AUTHENTICATE = '/authenticate';
    static CERT_ROOT = '/root';
    static CERT_AUTHENTICATION = '/authentication';
    static CERT_NON_REPUDIATION = '/non-repudiation';
    static CERT_ISSUER = '/issuer';
    static CERT_SIGNING = '/signing';
    static CERT_ENCRYPTION = '/encryption';
    static CERT_CITIZEN = '/citizen';
    static CERT_RRN = '/rrn';
    static SIGN_DATA = '/sign';


    public allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), undefined, callback);
    }

    public allCerts(options: string[] | Options,
                    callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.ALL_CERTIFICATES),
            reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), body, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData,
                    callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) { body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase(); }
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), body, undefined, callback);
        });
    }

    protected getCertificate(certUrl: string, options: RequestOptions): Promise<CertificateResponse> {
        let self = this;
        return self.connection.get(this.baseUrl, self.containerSuffix(GenericCertCard.ALL_CERTIFICATES + certUrl),
            undefined).then(data => {
            return CertParser.process(data, options.parseCerts, options.callback);
        }, err => {
            return ResponseHandler.error(err, options.callback);
        });
    }
}

abstract class GenericSecuredCertCard extends GenericReaderContainer implements SecuredCertCard {
    static ALL_CERTIFICATES = '/certificates';
    static AUTHENTICATE = '/authenticate';
    static CERT_AUTHENTICATION = '/authentication';
    static CERT_NON_REPUDIATION = '/non-repudiation';
    static CERT_INTERMEDIATE = '/intermediate';
    static CERT_ROOT = '/root';
    static CERT_SIGNING = '/signing';
    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';


    public allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), undefined, callback);
    }


    public allData(options: string[] | Options, body: OptionalPin,
                   callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(), body, reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public allCerts(options: string[] | Options, body: OptionalPin,
                    callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES), body,
            reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public verifyPin(body: OptionalPin,
                     callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.VERIFY_PIN), body, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData,
                    callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), body, undefined, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), body, undefined, callback);
        });
    }

    protected getCertificate(certUrl: string,
                             body: OptionalPin,
                             options: RequestOptions,
                             params?: { filter?: string, pin?: string }): Promise<CertificateResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin)
                          .then(() => {
                              return self.connection.post(this.baseUrl,
                                  self.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES + certUrl), body, params);
                          })
                          .then(data => {
                              return CertParser.process(data, options.parseCerts, options.callback);
                          }).catch(err => {
                return ResponseHandler.error(err, options.callback);
            });
    }

    protected getCertificateArray(certUrl: string,
                                  body: OptionalPin,
                                  options: RequestOptions,
                                  params?: { filter?: string, pin?: string }): Promise<CertificatesResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin)
                          .then(() => {
                              return self.connection.post(this.baseUrl,
                                  self.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES + certUrl), body, params);
                          })
                          .then(data => {
                              return CertParser.process(data, options.parseCerts, options.callback);
                          }).catch(err => {
                return ResponseHandler.error(err, options.callback);
            });
    }
}
