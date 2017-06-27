/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, GenericSecuredCertCard, OptionalPin } from "../../Card";
import { AbstractDNI, InfoResponse } from "./dniModel";
import { Options, RequestHandler } from "../../../../util/RequestHandler";
import { CertParser } from "../../../../util/CertParser";
import { ResponseHandler } from "../../../../util/ResponseHandler";

export { DNI };


class DNI extends GenericSecuredCertCard implements AbstractDNI {
    static INFO = "/info";

    public info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse> {
        return this.connection.get(this.resolvedReaderURI() + DNI.INFO, undefined, callback);
    }

    public intermediateCertificate(options?: Options,
                                   callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        const reqOptions = RequestHandler.determineOptions(options, callback);
        let self = this;
        return self.connection.get(self.resolvedReaderURI() + DNI.ALL_CERTIFICATES + DNI.CERT_INTERMEDIATE, undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    }

    public authenticationCertificate(body: OptionalPin,
                                     options?: Options,
                                     callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(DNI.CERT_AUTHENTICATION, body, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(body: OptionalPin,
                              options?: Options,
                              callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(DNI.CERT_SIGNING, body, RequestHandler.determineOptions(options, callback));
    }
}
