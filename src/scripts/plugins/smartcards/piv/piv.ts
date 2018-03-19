/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractPiv, FacialImageResponse, PrintedInformationResponse } from './pivModel';
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
                                          data: PrintedInformationResponse) => void): Promise<PrintedInformationResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise<PrintedInformationResponse>((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.PRINTED_INFORMATION), body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public facialImage(body: OptionalPin,
                       callback?: (error: RestException, data: FacialImageResponse) => void): Promise<FacialImageResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise<FacialImageResponse>((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(PIV.FACIAL_IMAGE), body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public authenticationCertificate(body: OptionalPin,
                                     options?: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, RequestHandler.determineOptions(options, callback));
    }

    public signingCertificate(body: OptionalPin,
                              options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(PIV.CERT_SIGNING, body, RequestHandler.determineOptions(options, callback));
    }
}

