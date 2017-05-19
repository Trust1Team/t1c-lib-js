/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard } from "../../Card";
import { AbstractLuxTrust } from "./LuxTrustModel";

export { LuxTrust };


class LuxTrust extends GenericCertCard implements AbstractLuxTrust {

    public rootCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(LuxTrust.CERT_ROOT, callback);
    }

    public authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, callback);
    }

    public signingCertificate(callback?: (error: RestException, data: DataResponse) => void | Promise<DataResponse>) {
        return this.getCertificate(LuxTrust.CERT_SIGNING, callback);
    }
}
