/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard } from "../../Card";
import { AbstractDNI } from "./dniModel";

export { DNI };


class DNI extends GenericCertCard implements AbstractDNI {
    static RN_DATA = "/rn";
    static ADDRESS = "/address";
    static PHOTO = "/picture";
    static VERIFY_PRIV_KEY_REF = "non-repudiation";

    public picture(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.connection.get(this.resolvedReaderURI() + DNI.PHOTO, undefined, callback);
    }

    public rootCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(DNI.CERT_ROOT, callback);
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(DNI.CERT_AUTHENTICATION, callback);
    }

    public nonRepudiationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(DNI.CERT_NON_REPUDIATION, callback);
    }
}
