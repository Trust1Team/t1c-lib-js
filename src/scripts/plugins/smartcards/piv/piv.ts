/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractPiv, PivFacialImageResponse, PivPrintedInformationResponse } from './pivModel';
import { PinEnforcer } from '../../../util/PinEnforcer';
import { Options, RequestHandler } from '../../../util/RequestHandler';

export { PIV };


class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static PRINTED_INFORMATION = '/printed-information';
    static FACIAL_IMAGE = '/facial-image';

    // filters
    public allDataFilters() {
        return [ 'applet-info', 'root_certificate', 'authentication-certificate',
                 'encryption_certificate', 'issuer_certificate', 'signing_certificate' ];
    }

    public allCertFilters() {
        return [ 'authentication-certificate', 'signing_certificate' ];
    }

    public allKeyRefs() {
        return [ 'authenticate', 'sign', 'encrypt' ];
    }

    public printedInformation(body: OptionalPin,
                              callback?: (error: RestException,
                                          data: PivPrintedInformationResponse) => void): Promise<PivPrintedInformationResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION),
                    body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public facialImage(body: OptionalPin,
                       callback?: (error: RestException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public authenticationCertificate(body: OptionalPin,
                                     options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, RequestHandler.determineOptions(options, callback), undefined);
    }

    public signingCertificate(body: OptionalPin,
                              options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(PIV.CERT_SIGNING, body, RequestHandler.determineOptions(options, callback));
    }
}

