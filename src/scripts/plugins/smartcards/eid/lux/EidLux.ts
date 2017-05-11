/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2017
 */
import {LocalConnection} from "../../../../core/client/Connection";
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, OptionalPin } from "../../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AbstractEidLUX, AllCertsResponse, AllDataResponse,
    BiometricResponse, PictureResponse, SignatureImageResponse } from "./EidLuxModel";

export { EidLux };


function createFilterQueryParam(filters: string[], pin: string): { filter: string, pin: string } {
    return { filter: filters.join(","), pin };
}
function createPinQueryParam(pin: string): { pin: string } {
    return { pin };
}

const SEPARATOR = "/";
const LUX_ALL_CERTIFICATES = "/certificates";
const LUX_BIOMETRIC = "/biometric";
const LUX_ADDRESS = "/address";
const LUX_PHOTO = "/picture";
const LUX_CERT_ROOT = LUX_ALL_CERTIFICATES + "/root";
const LUX_CERT_AUTHENTICATION = LUX_ALL_CERTIFICATES + "/authentication";
const LUX_CERT_NON_REPUDIATION = LUX_ALL_CERTIFICATES + "/non-repudiation";
const LUX_VERIFY_PIN = "/verify-pin";
const LUX_SIGN_DATA = "/sign";
const LUX_AUTHENTICATE = "/authenticate";
const LUX_SIGNATURE_IMAGE = "/signature-image";


class EidLux implements AbstractEidLUX {
    // constructor
    constructor(private url: string, private connection: LocalConnection, private reader_id: string, private pin: string) {}

    // filters
    public allDataFilters() {
        return [ "authentication-certificate", "biometric", "non-repudiation-certificate", "picture", "root-certificates" ];
    }

    public allCertFilters() {
        return [ "authentication-certificate", "non-repudiation-certificate", "root-certificates" ];
    }

    public allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters, this.pin));
        } else { this.connection.get(this.resolvedReaderURI(), callback, createPinQueryParam(this.pin)); }
    }

    public allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createFilterQueryParam(filters, this.pin));
        } else { this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createPinQueryParam(this.pin)); }
    }

    public biometric(callback: (error: RestException, data: BiometricResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_BIOMETRIC, callback, createPinQueryParam(this.pin));
    }

    // in order to access the address information, we need different keys, and on Lux gov level this is protected
    /*address(callback) {this.connection.get(this.resolvedReaderURI() + LUX_ADDRESS, callback, createPinQueryParam(this.pin));}*/

    public picture(callback: (error: RestException, data: PictureResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_PHOTO, callback, createPinQueryParam(this.pin));
    }

    public rootCertificate(callback: (error: RestException, data: DataArrayResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_CERT_ROOT, callback, createPinQueryParam(this.pin));
    }

    public authenticationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_CERT_AUTHENTICATION, callback, createPinQueryParam(this.pin));
    }

    public nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_CERT_NON_REPUDIATION, callback, createPinQueryParam(this.pin));
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + LUX_VERIFY_PIN, body, callback, createPinQueryParam(this.pin));
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + LUX_SIGN_DATA, body, callback, createPinQueryParam(this.pin));
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + LUX_AUTHENTICATE, body, callback, createPinQueryParam(this.pin));
    }

    public signatureImage(callback: (error: RestException, data: SignatureImageResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + LUX_SIGNATURE_IMAGE, callback, createPinQueryParam(this.pin));
    }


    // resolves the reader_id in the base URL
    private resolvedReaderURI(): string {
        return this.url + SEPARATOR + this.reader_id;
    }

}