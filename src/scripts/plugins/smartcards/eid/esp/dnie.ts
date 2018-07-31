/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse} from '../../../../core/service/CoreModel';
import {GenericSecuredCertCard} from '../../Card';
import {AbstractDNIe, DNIeInfoResponse} from './dnieModel';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {CertParser} from '../../../../util/CertParser';
import {ResponseHandler} from '../../../../util/ResponseHandler';
import {LocalConnection} from '../../../../core/client/Connection';

export class DNIe extends GenericSecuredCertCard implements AbstractDNIe {
    static CONTAINER_PREFIX = 'dnie';
    static INFO = '/info';
    static CERT_INTERMEDIATE = '/intermediate';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, DNIe.CONTAINER_PREFIX);
    }

    public info(callback?: (error: T1CLibException, data: DNIeInfoResponse) => void): Promise<DNIeInfoResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(DNIe.INFO), undefined, undefined, callback);
    }

    public intermediateCertificate(options?: Options,
                                   callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        const reqOptions = RequestHandler.determineOptions(options, callback);
        let self = this;
        return self.connection.get(self.baseUrl,
            self.containerSuffix(DNIe.ALL_CERTIFICATES + DNIe.CERT_INTERMEDIATE), undefined).then(data => {
            return CertParser.process(data, reqOptions.parseCerts, reqOptions.callback);
        }, err => {
            return ResponseHandler.error(err, reqOptions.callback);
        });
    }

    // TODO is optional pace/pin needed?
    public authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(DNIe.CERT_AUTHENTICATION, {}, RequestHandler.determineOptions(options, callback));
    }

    // TODO is optional pace/pin needed?
    public signingCertificate(options?: Options,
                              callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(DNIe.CERT_SIGNING, {}, RequestHandler.determineOptions(options, callback));
    }
}
