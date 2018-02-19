import { RestException } from '../../core/exceptions/CoreExceptions';
import {
    CertificateResponse, CertificatesResponse, DataArrayResponse, DataObjectResponse, DataResponse,
    T1CResponse
} from '../../core/service/CoreModel';
import { LocalConnection } from '../../core/client/Connection';
import { Promise } from 'es6-promise';
import { PinEnforcer } from '../../util/PinEnforcer';
import { CertParser } from '../../util/CertParser';
import { ResponseHandler } from '../../util/ResponseHandler';
import { Options, RequestHandler, RequestOptions } from '../../util/RequestHandler';
import * as _ from 'lodash';
/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */


export { Card, CertCard, PinCard, SecuredCertCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin,
    GenericContainer, GenericReaderContainer, GenericSmartCard, GenericPinCard, GenericCertCard, GenericSecuredCertCard };


// interfaces
interface Card {
    allData: (filters: string[], callback?: () => void) => Promise<DataObjectResponse>;
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


// classes
class OptionalPin {
    constructor(public pin?: string, public pace?: string) {}
}

class AuthenticateOrSignData extends OptionalPin {
    constructor(public algorithm_reference: string, public data: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

class VerifyPinData extends OptionalPin {
    constructor(public private_key_reference: string, public pin: string, public pace?: string) {
        super(pin, pace);
    }
}

class ResetPinData {
    constructor(public puk: string, public new_pin: string, public private_key_reference: string) {}
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
        let suffix = this.containerUrl;
        if (this.reader_id && this.reader_id.length) { suffix += '/' + this.reader_id; }
        if (path && path.length) { suffix += _.startsWith(path, '/') ? path : '/' + path; }
        return suffix;
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
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericPinCard.VERIFY_PIN),
                body, undefined, undefined, callback);
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
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), undefined, undefined, callback);
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
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE),
                body, undefined, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData,
                    callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) { body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase(); }
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA),
                body, undefined, undefined, callback);
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
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), undefined, undefined, callback);
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
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.VERIFY_PIN),
                body, undefined, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData,
                    callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA),
                body, undefined, undefined, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE),
                body, undefined, undefined, callback);
        });
    }

    protected getCertificate(certUrl: string,
                             body: OptionalPin,
                             options: RequestOptions,
                             params?: { filter?: string, pin?: string }): Promise<CertificateResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.reader_id, body)
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

        return PinEnforcer.check(this.connection, this.reader_id, body)
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
