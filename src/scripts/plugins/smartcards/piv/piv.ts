/**
 * @author Maarten Somers
 * @since 2017
 */
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractPiv, PivFacialImageResponse, PivPrintedInformationResponse } from './pivModel';
import { PinEnforcer } from '../../../util/PinEnforcer';
import { Options, RequestHandler } from '../../../util/RequestHandler';
import {LocalConnection} from '../../../core/client/Connection';

export class PIV extends GenericSecuredCertCard implements AbstractPiv {
    static CONTAINER_PREFIX = 'piv';
    static PRINTED_INFORMATION = '/printed-information';
    static FACIAL_IMAGE = '/facial-image';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, PIV.CONTAINER_PREFIX);
    }

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
                              callback?: (error: T1CLibException,
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
                       callback?: (error: T1CLibException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse> {
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
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(PIV.CERT_AUTHENTICATION, body, RequestHandler.determineOptions(options, callback), undefined);
    }

    public signingCertificate(body: OptionalPin,
                              options?: Options,
                              callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(PIV.CERT_SIGNING, body, RequestHandler.determineOptions(options, callback));
    }
}

