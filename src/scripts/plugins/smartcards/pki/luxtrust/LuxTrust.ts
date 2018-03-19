/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard } from '../../Card';
import { AbstractLuxTrust } from './LuxTrustModel';
import { Options, RequestHandler } from '../../../../util/RequestHandler';
import * as Bluebird from 'bluebird';

export { LuxTrust };


class LuxTrust extends GenericCertCard implements AbstractLuxTrust {
    static ACTIVATED = '/activated';

    public activated(callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(LuxTrust.ACTIVATED), undefined, callback);
    }

    public rootCertificate(options?: Options,
                           callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse> {
        return this.getCertificate(LuxTrust.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse> {
        return this.getCertificate(LuxTrust.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse> {
        return this.getCertificate(LuxTrust.CERT_SIGNING, RequestHandler.determineOptions(options, callback));
    }
}
