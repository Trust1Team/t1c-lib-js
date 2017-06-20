import { RestException } from "../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../core/service/CoreModel";
import { LocalConnection } from "../../core/client/Connection";
import { Promise } from "es6-promise";
import { PinEnforcer } from "../../util/PinEnforcer";
import { CertParser } from "../../util/CertParser";
import { ResponseHandler } from "../../util/ResponseHandler";

/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */


export { Card, CertCard, PinCard, SecuredCertCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin,
    GenericCard, GenericSmartCard, GenericPinCard, GenericCertCard, GenericSecuredCertCard };

interface Card {
    allData: (filters: string[], callback?: () => void) => void | Promise<DataObjectResponse>;
}

interface OptionalPin {
    pin?: string
}

interface VerifyPinData extends OptionalPin {
    private_key_reference: string
}

interface PinCard extends Card {
    verifyPin: (body: VerifyPinData, callback?: () => void) => void | Promise<any>;
}

interface CertCard extends PinCard {
    allCerts: (filters: string[], callback?: () => void) => void | Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => void | Promise<any>
    signData: (body: any, callback?: () => void) => void | Promise<any>
}

interface SecuredCertCard {
    allCerts: (filters: string[], body: OptionalPin, callback: () => void) => void | Promise<DataObjectResponse>
    allData: (filters: string[], body: OptionalPin, callback: () => void) => void | Promise<DataObjectResponse>
    authenticate: (body: any, callback: () => void) => void | Promise<any>
    signData: (body: any, callback: () => void) => void | Promise<any>
    verifyPin: (body: OptionalPin, callback?: () => void) => void | Promise<any>
}

interface AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string
    data: string
}

interface ResetPinData {
    puk: string,
    new_pin: string
    private_key_reference: string
}

abstract class GenericCard {

    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected reader_id: string) {}

    protected static createFilterQueryParam(filters: string[]): { filter: string } {
        if (filters && filters.length) {
            return { filter: filters.join(",") };
        } else { return undefined; }
    }

    // resolves the reader_id in the base URL
    protected resolvedReaderURI(): string {
        return this.baseUrl + this.containerUrl + "/" + this.reader_id;
    }
}

abstract class GenericSmartCard extends GenericCard implements Card {
    public allData(filters: string[],
                   callback?: (error: RestException, data: DataObjectResponse) => void): void | Promise<DataObjectResponse> {
        return this.connection.get(this.resolvedReaderURI(), GenericCard.createFilterQueryParam(filters)).then(data => {
            return CertParser.process(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
}

abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN = "/verify-pin";

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericCertCard.VERIFY_PIN, body, undefined, callback);
        });
    }
}

abstract class GenericCertCard extends GenericPinCard implements CertCard {
    static ALL_CERTIFICATES = "/certificates";
    static AUTHENTICATE = "/authenticate";
    static CERT_ROOT = "/root";
    static CERT_AUTHENTICATION = "/authentication";
    static CERT_NON_REPUDIATION = "/non-repudiation";
    static CERT_ISSUER = "/issuer";
    static CERT_SIGNING = "/signing";
    static CERT_ENCRYPTION = "/encryption";
    static CERT_CITIZEN = "/citizen";
    static CERT_RRN = "/rrn";
    static SIGN_DATA = "/sign";


    public allAlgoRefsForAuthentication(callback?:
                                            (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, undefined, callback);
    }

    public allCerts(filters: string[],
                    callback?: (error: RestException, data: DataObjectResponse) => void): void | Promise<DataObjectResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES,
            GenericCertCard.createFilterQueryParam(filters)).then(data => {
            return CertParser.process(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, body, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, body, undefined, callback);
        });
    }

    protected getCertificate(certUrl: string, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        let self = this;
        return self.connection.get(self.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES + certUrl,
            undefined).then(data => {
            return CertParser.process(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }
}

abstract class GenericSecuredCertCard extends GenericCard implements SecuredCertCard {
    static ALL_CERTIFICATES = "/certificates";
    static AUTHENTICATE = "/authenticate";
    static CERT_AUTHENTICATION = "/authentication";
    static CERT_NON_REPUDIATION = "/non-repudiation";
    static CERT_INTERMEDIATE = "/intermediate";
    static CERT_ROOT = "/root";
    static CERT_SIGNING = "/signing";
    static SIGN_DATA = "/sign";
    static VERIFY_PIN = "/verify-pin";

    public allAlgoRefsForAuthentication(callback?: (error: RestException,
                                                    data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, undefined, callback);
    }

    public allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse> {
        return this.connection.get(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, undefined, callback);
    }

    public allData(filters: string[], body: OptionalPin): Promise<DataObjectResponse>;
    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void): void;
    public allData(filters: string[], body: OptionalPin,
                   callback?: (error: RestException, data: DataObjectResponse) => void): void | Promise<DataObjectResponse> {
        return this.connection.post(this.resolvedReaderURI(), body, GenericSecuredCertCard.createFilterQueryParam(filters)).then(data => {
            return CertParser.process(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public allCerts(filters: string[], body: OptionalPin,
                    callback?: (error: RestException, data: DataObjectResponse) => void): Promise<DataObjectResponse> {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES,
            body,
            GenericSecuredCertCard.createFilterQueryParam(filters)).then(data => {
            return CertParser.process(data, callback);
        }, err => {
            return ResponseHandler.error(err, callback);
        });
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.VERIFY_PIN, body, undefined, callback);
        });
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, body, undefined, callback);
        });
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
            return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, body, undefined, callback);
        });
    }

    protected getCertificate(certUrl: string, body: OptionalPin,
                             callback: (error: RestException, data: DataResponse) => void,
                             params?: { filter?: string, pin?: string }): void | Promise<DataResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin)
                          .then(() => {
                              return self.connection.post(self.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl,
                                  body, params);
                          })
                          .then(data => {
                              return CertParser.process(data, callback);
                          }).catch(err => {
                return ResponseHandler.error(err, callback);
            });
    }

    protected getCertificateArray(certUrl: string,
                                  body: OptionalPin,
                                  callback: (error: RestException,
                                             data: DataArrayResponse) => void,
                                  params?: { filter?: string, pin?: string }): void | Promise<DataArrayResponse> {
        let self = this;

        return PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin)
                          .then(() => {
                              return self.connection.post(self.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl,
                                  body, params);
                          })
                          .then(data => {
                              return CertParser.process(data, callback);
                          }).catch(err => {
                return ResponseHandler.error(err, callback);
            });
    }
}
