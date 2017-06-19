import { RestException } from "../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../core/service/CoreModel";
import { LocalConnection } from "../../core/client/Connection";
import { Promise } from "es6-promise";
import * as _ from "lodash";
import * as asn1js from "asn1js";
import * as Base64 from "Base64";
import { Certificate } from "pkijs";
import { PinEnforcer } from "../../util/PinEnforcer";

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
    verifyPin: (body: VerifyPinData, callback?: () => void) => void | Promise<T1CResponse>;
}

interface CertCard extends PinCard {
    allCerts: (filters: string[], callback?: () => void) => void | Promise<DataObjectResponse>
    authenticate: (body: any, callback?: () => void) => void | Promise<DataResponse>
    signData: (body: any, callback?: () => void) => void | Promise<DataResponse>
}

interface SecuredCertCard {
    allCerts: (filters: string[], body: OptionalPin, callback: () => void) => void | Promise<DataObjectResponse>
    allData: (filters: string[], body: OptionalPin, callback: () => void) => void | Promise<DataObjectResponse>
    authenticate: (body: any, callback: () => void) => void | Promise<DataResponse>
    signData: (body: any, callback: () => void) => void | Promise<DataResponse>
    verifyPin: (body: OptionalPin, callback?: () => void) => void | Promise<T1CResponse>
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

    protected static createFilterQueryParam(filters: string[], pin?: string): { filter: string, pin?: string } {
        let filter = filters.join(",");
        if (pin) { return { filter, pin }; }
        else { return { filter }; }
    }

    // resolves the reader_id in the base URL
    protected resolvedReaderURI(): string {
        return this.baseUrl + this.containerUrl + "/" + this.reader_id;
    }
}

abstract class GenericSmartCard extends GenericCard implements Card {
    public allData(filters: string[],
                   callback?: (error: RestException, data: DataObjectResponse) => void): void | Promise<DataObjectResponse> {
        if (filters && filters.length) {
            return this.connection.get(this.resolvedReaderURI(), GenericCard.createFilterQueryParam(filters), callback);
        }
        else { return this.connection.get(this.resolvedReaderURI(), undefined, callback); }
    }
}

abstract class GenericPinCard extends GenericSmartCard implements PinCard {
    static VERIFY_PIN = "/verify-pin";

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>) {
        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.resolvedReaderURI() + GenericCertCard.VERIFY_PIN, body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.resolvedReaderURI() + GenericCertCard.VERIFY_PIN, body, undefined));
                }, error => { reject(error); });
            });
        }
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
        if (filters && filters.length) {
            return this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES,
                GenericCertCard.createFilterQueryParam(filters),
                callback);
        }
        else { return this.connection.get(this.resolvedReaderURI() + GenericCertCard.ALL_CERTIFICATES, undefined, callback); }
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();

        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.resolvedReaderURI() + GenericCertCard.AUTHENTICATE, body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();

        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.resolvedReaderURI() + GenericCertCard.SIGN_DATA, body, undefined));
                }, error => { reject(error); });
            });
        }

    }

    protected getCertificate(certUrl: string, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse> {
        let self = this;

        if (callback && typeof callback === "function") {
            self.retrieveAndParseCert(self, certUrl, callback);
        } else {
            return new Promise((resolve, reject) => {
                self.retrieveAndParseCert(self, certUrl, callback, resolve, reject);
            });
        }
    }

    protected retrieveAndParseCert(self: GenericCertCard,
                                   certUrl: string,
                                   callback: (error: RestException, data: T1CResponse) => void,
                                   resolve?: (data: any) => void, reject?: (data: any) => void) {
        self.connection.get(self.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl, undefined).then(certData => {
            if (_.isArray(certData.data)) {
                let newData = [];
                _.forEach(certData.data, certificate => {
                    newData.push({ certificate, parsed: processCert(certificate) });
                });
                certData.data = newData;
            } else {
                let certificate = certData.data;
                certData.data = { certificate, parsed: processCert(certificate) };
            }
            if (resolve) { resolve(certData); }
            else { callback(null, certData); }
        }, err => {
            if (reject) { reject(err); }
            else { callback(err, null); }
        });

        function processCert(certificate: string): Certificate {
            let rawCert = Base64.atob(certificate);
            let buffer = str2ab(rawCert);
            const asn1 = asn1js.fromBER(buffer);
            return new Certificate({ schema: asn1.result });
        }

        // function to convert string to ArrayBuffer
        function str2ab(str: string) {
            let buf = new ArrayBuffer(str.length);
            let bufView = new Uint8Array(buf);

            for (let i = 0, strLen = str.length; i < strLen; i++) { bufView[i] = str.charCodeAt(i); }

            return buf;
        }
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

    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void) {
        if (filters && filters.length) { return this.connection.post(this.resolvedReaderURI(),
            body,
            GenericSecuredCertCard.createFilterQueryParam(filters),
            callback);
        } else { return this.connection.post(this.resolvedReaderURI(), body, undefined, callback); }
    }

    public allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: DataObjectResponse) => void) {
        if (filters && filters.length) {
            return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES,
                body,
                GenericSecuredCertCard.createFilterQueryParam(filters),
                callback);
        } else { return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES,
            body, undefined, callback);
        }
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.VERIFY_PIN, body, undefined, callback);
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.SIGN_DATA, body, undefined, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        return this.connection.post(this.resolvedReaderURI() + GenericSecuredCertCard.AUTHENTICATE, body, undefined, callback);
    }

    protected getCertificate(certUrl: string, body: OptionalPin,
                             callback: (error: RestException, data: DataResponse) => void,
                             params?: { filter?: string, pin?: string }): void | Promise<DataResponse> {
        let self = this;

        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                self.retrieveAndParseCert(self, certUrl, body, params, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    self.retrieveAndParseCert(self, certUrl, body, params, callback, resolve, reject);
                }, error => { reject(error); });
            });
        }
    }

    protected getCertificateArray(certUrl: string,
                                  body: OptionalPin,
                                  callback: (error: RestException,
                                             data: DataArrayResponse) => void,
                                  params?: { filter?: string, pin?: string }): void | Promise<DataArrayResponse> {
        let self = this;

        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                self.retrieveAndParseCert(self, certUrl, body, params, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    self.retrieveAndParseCert(self, certUrl, body, params, callback, resolve, reject);
                }, error => { reject(error); });
            });
        }
    }

    protected retrieveAndParseCert(self: GenericSecuredCertCard, certUrl: string,
                                   body: OptionalPin,
                                   params: { filter?: string, pin?: string },
                                   callback: (error: RestException, data: T1CResponse) => void,
                                   resolve?: (data: any) => void, reject?: (data: any) => void) {
        self.connection.post(self.resolvedReaderURI() + GenericSecuredCertCard.ALL_CERTIFICATES + certUrl, body, params).then(certData => {
            if (_.isArray(certData.data)) {
                let newData = [];
                _.forEach(certData.data, certificate => {
                    newData.push({ certificate, parsed: processCert(certificate) });
                });
                certData.data = newData;
            } else {
                let certificate = certData.data;
                certData.data = { certificate, parsed: processCert(certificate) };
            }
            if (resolve) { resolve(certData); }
            else { callback(null, certData); }
        }, err => {
            if (reject) { reject(err); }
            else { callback(err, null); }
        });

        function processCert(certificate: string): Certificate {
            let rawCert = Base64.atob(certificate);
            let buffer = str2ab(rawCert);
            const asn1 = asn1js.fromBER(buffer);
            return new Certificate({ schema: asn1.result });
        }

        // function to convert string to ArrayBuffer
        function str2ab(str: string) {
            let buf = new ArrayBuffer(str.length);
            let bufView = new Uint8Array(buf);

            for (let i = 0, strLen = str.length; i < strLen; i++) { bufView[i] = str.charCodeAt(i); }

            return buf;
        }
    }
}
