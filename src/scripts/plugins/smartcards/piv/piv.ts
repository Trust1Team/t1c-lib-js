/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericSecuredCertCard, OptionalPin } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";
import { AbstractPiv, FacialImageResponse, PrintedInformationResponse } from "./pivModel";

export { PIV };


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

    public printedInformation(body: OptionalPin,
                              callback?: (error: RestException,
                                          data: PrintedInformationResponse) => void | Promise<PrintedInformationResponse>) {
        return this.connection.post(this.resolvedReaderURI() + PIV.PRINTED_INFORMATION, body, undefined, callback);
    }

    public facialImage(body: OptionalPin,
                       callback?: (error: RestException, data: FacialImageResponse) => void | Promise<FacialImageResponse>) {
        return this.connection.post(this.resolvedReaderURI() + PIV.FACIAL_IMAGE, body, undefined, callback);
    }

    public authenticationCertificate(body: OptionalPin,
                                     callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, callback);
    }

    public signingCertificate(body: OptionalPin, callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(PIV.CERT_SIGNING, body, callback);
    }
}

