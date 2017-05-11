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
    constructor(protected url: string, protected connection: LocalConnection, protected reader_id: string, private pin: string) {
        super(url, connection, reader_id);
    }

    // filters
    public allDataFilters() {
        return [ "authentication-certificate", "biometric", "non-repudiation-certificate", "picture", "root-certificates" ];
    }

    public allCertFilters() {
        return [ "authentication-certificate", "non-repudiation-certificate", "root-certificates" ];
    }

    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) {
            this.connection.post(this.resolvedReaderURI(), body, callback, createFilterQueryParam(filters, this.pin));
        } else { this.connection.post(this.resolvedReaderURI(), body, callback, createPinQueryParam(this.pin)); }
    }

    public allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.post(this.resolvedReaderURI() + EidLux.ALL_CERTIFICATES,
                body, callback, createFilterQueryParam(filters, this.pin));
        } else { this.connection.post(this.resolvedReaderURI() + EidLux.ALL_CERTIFICATES, body, callback, createPinQueryParam(this.pin)); }
    }

    public biometric(body: OptionalPin, callback: (error: RestException, data: BiometricResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + EidLux.BIOMETRIC, body, callback, createPinQueryParam(this.pin));
    }

    // in order to access the address information, we need different keys, and on Lux gov level this is protected
    /*address(callback) {this.connection.get(this.resolvedReaderURI() + LUX_ADDRESS, callback, createPinQueryParam(this.pin));}*/

    public picture(body: OptionalPin, callback: (error: RestException, data: PictureResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + EidLux.PHOTO, body, callback, createPinQueryParam(this.pin));
    }

    public rootCertificate(body: OptionalPin, callback: (error: RestException, data: DataArrayResponse) => void) {
        this.getCertificateArray(EidLux.CERT_ROOT, body, callback, createPinQueryParam(this.pin));
    }

    public authenticationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void) {
        this.getCertificate(EidLux.CERT_AUTHENTICATION, body, callback, createPinQueryParam(this.pin));
    }

    public nonRepudiationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void) {
        this.getCertificate(EidLux.CERT_NON_REPUDIATION, body, callback, createPinQueryParam(this.pin));
    }

    public verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + EidLux.VERIFY_PIN, body, callback, createPinQueryParam(this.pin));
    }

    public signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + EidLux.SIGN_DATA, body, callback, createPinQueryParam(this.pin));
    }

    public authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + EidLux.AUTHENTICATE, body, callback, createPinQueryParam(this.pin));
    }

    public signatureImage(body: OptionalPin, callback: (error: RestException, data: SignatureImageResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + EidLux.SIGNATURE_IMAGE, body, callback, createPinQueryParam(this.pin));
    }
}
