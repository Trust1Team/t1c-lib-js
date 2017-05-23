/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataObjectResponse, DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin } from "../../Card";
import { AbstractDNIe, InfoResponse } from "./dnieModel";

export { DNIe };


class DNIe extends GenericCertCard implements AbstractDNIe {
    static INFO = "/info";
    static CERT_INTERMEDIATE = "/intermediate";

    public info(callback?: (error: RestException, data: InfoResponse) => void | Promise<InfoResponse>) {
        return this.connection.get(this.resolvedReaderURI() + DNIe.INFO, undefined, callback);
    }

    public intermediateCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.connection.get(this.resolvedReaderURI() + DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE, undefined, callback);
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(DNIe.CERT_SIGNING,  callback);
    }
}
