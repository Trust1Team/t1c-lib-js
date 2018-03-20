/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, OptionalPin } from '../../Card';
import { Options, RequestHandler } from '../../../../util/RequestHandler';
import { AbstractEidPT, IdDataResponse, PtAddressResponse } from './EidPtModel';

export { EidPt };


class EidPt extends GenericCertCard implements AbstractEidPT {
    static ADDRESS = '/address';
    static CERT_ROOT_AUTH = '/root-authentication';
    static CERT_ROOT_NON_REP = '/root-non-repudiation';
    static ID_DATA = '/id';
    static PHOTO = '/photo';


    public idData(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), undefined, undefined, callback);
    }

    public idDataWithOutPhoto(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), { photo: 'false' }, undefined, callback);
    }

    public address(data: OptionalPin, callback?: (error: RestException, data: PtAddressResponse) => void): Promise<PtAddressResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(EidPt.ADDRESS), data, undefined, undefined, callback);
    }

    public photo(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.PHOTO), undefined, undefined, callback);
    }

    public rootCertificate(options: Options,
                           callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public rootAuthenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT_AUTH, RequestHandler.determineOptions(options, callback));
    }

    public rootNonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT_NON_REP, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public nonRepudiationCertificate(options: Options,
                                     callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }
}
