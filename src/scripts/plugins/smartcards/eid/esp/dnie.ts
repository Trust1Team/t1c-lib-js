/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataObjectResponse, DataResponse } from "../../../../core/service/CoreModel";
import { GenericCertCard, OptionalPin } from "../../Card";
import { AbstractDNIe, InfoResponse } from "./dnieModel";
import { Options, RequestHandler } from "../../../../util/RequestHandler";
import { CertParser } from "../../../../util/CertParser";
import { ResponseHandler } from "../../../../util/ResponseHandler";

export { DNIe };


class DNIe extends GenericCertCard implements AbstractDNIe {
    static INFO = "/info";
    static CERT_INTERMEDIATE = "/intermediate";

    public info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse> {
        return this.connection.get(this.resolvedReaderURI() + DNIe.INFO, undefined, callback);
    }

    public intermediateCertificate(options?: Options,
                                   callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        const reqOptions = RequestHandler.determineOptions(options, callback);
        let self = this;
        return self.connection.get(self.resolvedReaderURI() + DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE, undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options,
                              callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.getCertificate(DNIe.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
}
