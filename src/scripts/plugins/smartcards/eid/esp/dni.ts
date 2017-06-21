/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericSecuredCertCard, OptionalPin } from "../../Card";
import { AbstractDNI, InfoResponse } from "./dniModel";

export { DNI };


class DNI extends GenericSecuredCertCard implements AbstractDNI {
    static INFO = "/info";

    public info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse> {
        return this.connection.get(this.resolvedReaderURI() + DNI.INFO, undefined, callback);
    }

    public intermediateCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI() + DNI.ALL_CERTIFICATES + DNI.CERT_INTERMEDIATE, undefined, callback);
    }

    public authenticationCertificate(body: OptionalPin,
                                     callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(DNI.CERT_AUTHENTICATION, body, callback);
    }

    public signingCertificate(body: OptionalPin,
                              callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(DNI.CERT_SIGNING, body, callback);
    }
}
