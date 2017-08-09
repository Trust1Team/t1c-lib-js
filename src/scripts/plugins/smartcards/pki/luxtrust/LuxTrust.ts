/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard } from "../../Card";
import { AbstractLuxTrust } from "./LuxTrustModel";
import { Options, RequestHandler } from "../../../../util/RequestHandler";

export { LuxTrust };


class LuxTrust extends GenericCertCard implements AbstractLuxTrust {
    static ACTIVATED = "/activated";

    public activated(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.resolvedReaderURI() + LuxTrust.ACTIVATED, undefined, callback);
    }

    public rootCertificate(options?: Options, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
}
