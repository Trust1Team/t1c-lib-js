/**
 * @author Maarten Somers
 * @since 2017
 */
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard } from '../../Card';
import { AbstractLuxTrust } from './LuxTrustModel';
import { Options, RequestHandler } from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';


export class LuxTrust extends GenericCertCard implements AbstractLuxTrust {
    static CONTAINER_PREFIX = 'luxtrust';
    static ACTIVATED = '/activated';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, LuxTrust.CONTAINER_PREFIX);
    }

    public activated(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(LuxTrust.ACTIVATED), undefined, undefined, callback);
    }

    public rootCertificate(options?: Options,
                           callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options,
                              callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
}
