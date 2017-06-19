/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, GenericSecuredCertCard, OptionalPin } from "../../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import {
    AbstractEidLUX, AllCertsResponse,
    BiometricResponse, PictureResponse, SignatureImageResponse
} from "./EidLuxModel";
import { AllDataResponse } from "../../pki/luxtrust/LuxTrustModel";
import { Promise } from "es6-promise";
import * as _ from "lodash";
import * as asn1js from "asn1js";
import * as Base64 from "Base64";
import { Certificate } from "pkijs";

export { EidLux };


function createFilterQueryParam(filters: string[], pin: string): { filter: string, pin: string } {
    return { filter: filters.join(","), pin };
}
function createPinQueryParam(pin: string): { pin: string } {
    return { pin };
}


class EidLux extends GenericSecuredCertCard implements AbstractEidLUX {
    static BIOMETRIC = "/biometric";
    static ADDRESS = "/address";
    static PHOTO = "/picture";
    static SIGNATURE_IMAGE = "/signature-image";


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
        return [ "authentication-certificate", "biometric", "non-repudiation-certificate", "picture", "root-certificates" ];
    }

    public allCertFilters() {
        return [ "authentication-certificate", "non-repudiation-certificate", "root-certificates" ];
    }

    public allData(filters: string[],
                   callback?: (error: RestException, data: AllDataResponse) => void | Promise<AllDataResponse>) {
        if (filters && filters.length) {
            return this.connection.get(this.resolvedReaderURI(), createFilterQueryParam(filters, this.pin), callback);
        } else { return this.connection.get(this.resolvedReaderURI(), createPinQueryParam(this.pin), callback); }
    }

    public allCerts(filters: string[],
                    callback?: (error: RestException, data: AllCertsResponse) => void | Promise<AllCertsResponse>) {
        if (filters && filters.length) {
            return this.connection.get(this.resolvedReaderURI() + EidLux.ALL_CERTIFICATES,
                createFilterQueryParam(filters, this.pin), callback);
        } else {
            return this.connection.get(this.resolvedReaderURI() + EidLux.ALL_CERTIFICATES, createPinQueryParam(this.pin), callback);
        }
    }

    public biometric(callback?: (error: RestException, data: BiometricResponse) => void | Promise<BiometricResponse>) {
        return this.connection.get(this.resolvedReaderURI() + EidLux.BIOMETRIC, createPinQueryParam(this.pin), callback);
    }

    // in order to access the address information, we need different keys, and on Lux gov level this is protected
    /*address(callback) {this.connection.get(this.resolvedReaderURI() + LUX_ADDRESS, callback, createPinQueryParam(this.pin));}*/

    public picture(callback?: (error: RestException, data: PictureResponse) => void | Promise<PictureResponse>) {
        return this.connection.get(this.resolvedReaderURI() + EidLux.PHOTO, createPinQueryParam(this.pin), callback);
    }

    public rootCertificate(callback?: (error: RestException, data: DataArrayResponse) => void | Promise<DataArrayResponse>) {
        return this.getCertificateArray(EidLux.CERT_ROOT, callback, createPinQueryParam(this.pin));
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(EidLux.CERT_AUTHENTICATION, callback, createPinQueryParam(this.pin));
    }

    public nonRepudiationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(EidLux.CERT_NON_REPUDIATION, callback, createPinQueryParam(this.pin));
    }

    public verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>) {
        return this.connection.post(this.resolvedReaderURI() + EidLux.VERIFY_PIN, body, createPinQueryParam(this.pin), callback);
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.connection.post(this.resolvedReaderURI() + EidLux.SIGN_DATA, body, createPinQueryParam(this.pin), callback);
    }

    public authenticate(body: AuthenticateOrSignData,
                        callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.connection.post(this.resolvedReaderURI() + EidLux.AUTHENTICATE, body, createPinQueryParam(this.pin), callback);
    }

    public signatureImage(callback?: (error: RestException, data: SignatureImageResponse) => void | Promise<SignatureImageResponse>) {
        return this.connection.get(this.resolvedReaderURI() + EidLux.SIGNATURE_IMAGE, createPinQueryParam(this.pin), callback);
    }

    protected getCertificate(certUrl: string,
                             callback: (error: RestException, data: DataResponse) => void,
                             params?: { filter?: string, pin?: string }): void | Promise<DataResponse> {
        let self = this;

        if (callback && typeof callback === "function") {
            self.retrieveAndParseCert(self, certUrl, params, callback);
        } else {
            return new Promise((resolve, reject) => {
                self.retrieveAndParseCert(self, certUrl, params, callback, resolve, reject);
            });
        }
    }

    protected getCertificateArray(certUrl: string,
                                  callback: (error: RestException,
                                             data: DataArrayResponse) => void,
                                  params?: { filter?: string, pin?: string }): void | Promise<DataArrayResponse> {
        let self = this;

        if (callback && typeof callback === "function") {
            self.retrieveAndParseCert(self, certUrl, params, callback);
        } else {
            return new Promise((resolve, reject) => {
                self.retrieveAndParseCert(self, certUrl, params, callback, resolve, reject);
            });
        }
    }

    protected retrieveAndParseCert(self: EidLux, certUrl: string,
                                   params: { filter?: string, pin?: string },
                                   callback: (error: RestException, data: T1CResponse) => void,
                                   resolve?: (data: any) => void, reject?: (data: any) => void) {
        self.connection.get(self.resolvedReaderURI() + EidLux.ALL_CERTIFICATES + certUrl, params).then(certData => {
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
