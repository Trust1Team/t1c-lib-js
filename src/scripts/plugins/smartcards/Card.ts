import {T1CLibException} from '../../core/exceptions/CoreExceptions';
import {
    CertificateResponse, CertificatesResponse, DataArrayResponse, DataObjectResponse, DataResponse,
    T1CResponse
} from '../../core/service/CoreModel';
import {LocalConnection} from '../../core/client/Connection';
import {PinEnforcer} from '../../util/PinEnforcer';
import {CertParser} from '../../util/CertParser';
import {ResponseHandler} from '../../util/ResponseHandler';
import {Options, RequestHandler, RequestOptions} from '../../util/RequestHandler';
import {GenericContainer} from '../GenericContainer';

/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */


// interfaces
export interface Card {
    allData: (filters: string[] | Options, callback?: () => void) => Promise<DataObjectResponse>;
}

export interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback?: () => void) => Promise<T1CResponse>;
    verifyPinWithEncryptedPin: (body: VerifyPinData, callback?: () => void) => Promise<T1CResponse>;
}

export interface CertCard extends PinCard {
    allCerts: (filters: string[] | Options, callback?: () => void) => Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => Promise<DataResponse>
    authenticateWithEncryptedPin: (body: any, callback?: () => void) => Promise<DataResponse>
    signData: (body: any, callback?: () => void) => Promise<DataResponse>
    signDataWithEncryptedPin: (body: any, callback?: () => void) => Promise<DataResponse>
}

export interface SecuredCertCard {
    allCerts: (filters: string[] | Options, body: OptionalPin, callback?: () => void) => Promise<DataObjectResponse>
    allData: (filters: string[] | Options, body: OptionalPin, callback?: () => void) => Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => Promise<DataResponse>
    signData: (body: any, callback?: () => void) => Promise<DataResponse>
    verifyPin: (body: OptionalPin, callback?: () => void) => Promise<T1CResponse>
}


// classes
export class OptionalPin {
    constructor(public pin?: string, public pace?: string, private_key_reference?: string ) {
    }
}

export class AuthenticateOrSignData extends OptionalPin {
    constructor(public algorithm_reference: string, public data: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

export class VerifyPinData extends OptionalPin {
    constructor(public private_key_reference?: string, public pin?: string, public pace?: string) {
        super(pin, pace);
    }
}

export class ResetPinData {
    constructor(public puk: string, public new_pin: string, public private_key_reference: string) {
    }
}

export class PinTryCounterData {
    constructor(public pin_reference: string) {
    }
}

export abstract class GenericReaderContainer extends GenericContainer {

    CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE = '/agent/0';

    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected reader_id: string,
                protected containerPrefix: string,
                protected runInUserSpace?: boolean) {
        super(baseUrl, containerUrl, connection, containerPrefix, runInUserSpace);
    }

    // resolves the reader_id in the base URL
    protected containerSuffix(path?: string): string {
        super.containerSuffix(path);
        let suffix = this.containerUrl;
        if (this.reader_id && this.reader_id.length) {
            suffix += '/' + this.reader_id;
        }
        if (path && path.length) {
            suffix += path.startsWith('/') ? path : '/' + path;
        }

        if (this.runInUserSpace) {
            suffix = this.CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE + suffix;
        }

        return suffix;
    }
}

export abstract class GenericSmartCard extends GenericReaderContainer implements Card {
    public allData(options: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const requestOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(), requestOptions.params).then(data => {
            return CertParser.process(data, requestOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
}

export abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN = '/verify-pin';

    public verifyPin(body: VerifyPinData,
                     callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericPinCard.VERIFY_PIN),
                body, undefined, undefined, callback);
        });
    }

    public verifyPinWithEncryptedPin(body: VerifyPinData,
                                     callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericPinCard.VERIFY_PIN),
                body, undefined, undefined, callback);
        });
    }
}

export abstract class GenericCertCard extends GenericPinCard implements CertCard {
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


    public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA), undefined, undefined, callback);
    }

    public allCerts(options: string[] | Options,
                    callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericCertCard.ALL_CERTIFICATES),
            reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE),
                body, undefined, undefined, callback);
        });
    }

    public authenticateWithEncryptedPin(body: AuthenticateOrSignData,
                                        callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.AUTHENTICATE),
                body, undefined, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData,
                    callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericCertCard.SIGN_DATA),
                body, undefined, undefined, callback);
        });
    }

    public signDataWithEncryptedPin(body: AuthenticateOrSignData,
                                    callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
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

export abstract class GenericSecuredCertCard extends GenericReaderContainer implements SecuredCertCard {
    static ALL_CERTIFICATES = '/certificates';
    static AUTHENTICATE = '/authenticate';
    static CERT_AUTHENTICATION = '/authentication';
    static CERT_NON_REPUDIATION = '/non-repudiation';
    static CERT_INTERMEDIATE = '/intermediate';
    static CERT_ROOT = '/root';
    static CERT_SIGNING = '/signing';
    static SIGN_DATA = '/sign';
    static VERIFY_PIN = '/verify-pin';


    public allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE), undefined, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA), undefined, undefined, callback);
    }


    public allData(options: string[] | Options, body: OptionalPin,
                   callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(), body, reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public allCerts(options: string[] | Options, body: OptionalPin,
                    callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        const reqOptions = RequestHandler.determineOptionsWithFilter(options);
        return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.ALL_CERTIFICATES), body,
            reqOptions.params).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public verifyPin(body: OptionalPin,
                     callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.VERIFY_PIN),
                body, undefined, undefined, callback);
        });
    }

    public verifyPinWithEncryptedPin(body: OptionalPin,
                                     callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse> {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.VERIFY_PIN),
                body, undefined, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData,
                    callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA),
                body, undefined, undefined, callback);
        });
    }

    public signDataWithEncryptedPin(body: AuthenticateOrSignData,
                                    callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.SIGN_DATA),
                body, undefined, undefined, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(GenericSecuredCertCard.AUTHENTICATE),
                body, undefined, undefined, callback);
        });
    }

    public authenticateWithEncryptedPin(body: AuthenticateOrSignData,
                                        callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
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

    protected getCertificateWithEncryptedPin(certUrl: string,
                                             body: OptionalPin,
                                             options: RequestOptions,
                                             params?: { filter?: string, pin?: string }): Promise<CertificateResponse> {
        let self = this;

        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body)
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

    protected getCertificateArrayWithEncryptedPin(certUrl: string,
                                                  body: OptionalPin,
                                                  options: RequestOptions,
                                                  params?: { filter?: string, pin?: string }): Promise<CertificatesResponse> {
        let self = this;

        return PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body)
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
