/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericSecuredCertCard, OptionalPin } from "../Card";
import { DataArrayResponse, DataResponse } from "../../../core/service/CoreModel";
import { AbstractPiv, AllCertsResponse, AllDataResponse, FacialImageResponse, PrintedInformationResponse } from "./pivModel";


class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static PRINTED_INFORMATION = "/printed-information";
    static FACIAL_IMAGE = "/facial-image";

    // filters
    public allDataFilters() {
        return [ "applet-info", "root_certificate", "authentication-certificate",
                 "encryption_certificate", "issuer_certificate", "signing_certificate" ];
    }

    public allCertFilters() {
        return [ "authentication-certificate", "signing_certificate" ];
    }

    public allKeyRefs() {
        return [ "authenticate", "sign", "encrypt" ];
    }

    public allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + PIV.AUTHENTICATE, callback);
    }

    public allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void) {
        this.connection.get(this.resolvedReaderURI() + PIV.SIGN_DATA, callback);
    }

    public printedInformation(body: OptionalPin, callback: (error: RestException, data: PrintedInformationResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV.PRINTED_INFORMATION, body, callback);
    }

    public facialImage(body: OptionalPin, callback: (error: RestException, data: FacialImageResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV.FACIAL_IMAGE, body, callback);
    }

    public allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllDataResponse) => void) {
        if (filters && filters.length) {
            this.connection.post(this.resolvedReaderURI(), body, callback, PIV.createFilterQueryParam(filters));
        } else { this.connection.post(this.resolvedReaderURI(), body, callback); }
    }

    public allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllCertsResponse) => void) {
        if (filters && filters.length) {
            this.connection.post(this.resolvedReaderURI() + PIV.ALL_CERTIFICATES, body, callback, PIV.createFilterQueryParam(filters));
        } else { this.connection.post(this.resolvedReaderURI() + PIV.ALL_CERTIFICATES, body, callback); }
    }

    public authenticationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV.CERT_AUTHENTICATION, body, callback);
    }

    public signingCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void) {
        this.connection.post(this.resolvedReaderURI() + PIV.CERT_SIGNING, body, callback);
    }
}

export { PIV };
