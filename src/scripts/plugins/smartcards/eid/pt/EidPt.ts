/**
 * @author Maarten Somers
 * @since 2017
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, DataResponse} from '../../../../core/service/CoreModel';
import {GenericCertCard, OptionalPin} from '../../Card';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {AbstractEidPT, PtIdDataResponse, PtAddressResponse} from './EidPtModel';
import {LocalConnection} from '../../../../core/client/Connection';
import {PinEnforcer} from '../../../../..';

export class EidPt extends GenericCertCard implements AbstractEidPT {
    static CONTAINER_PREFIX = 'pteid';
    static ADDRESS = '/address';
    static CERT_ROOT_AUTH = '/root-authentication';
    static CERT_ROOT_NON_REP = '/root-non-repudiation';
    static ID_DATA = '/id';
    static PHOTO = '/photo';
    static VERIFY_PRIV_KEY_REF = 'non-repudiation';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, EidPt.CONTAINER_PREFIX);
    }

    public idData(callback?: (error: T1CLibException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), undefined, undefined, callback);
    }

    public idDataWithOutPhoto(callback?: (error: T1CLibException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.ID_DATA), {photo: 'false'}, undefined, callback);
    }

    public address(data: OptionalPin, callback?: (error: T1CLibException, data: PtAddressResponse) => void): Promise<PtAddressResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, data).then(() => {
            let encryptedBody = Object.assign({ private_key_reference: EidPt.VERIFY_PRIV_KEY_REF }, data);
            return this.connection.post(this.baseUrl, this.containerSuffix(EidPt.ADDRESS),
                encryptedBody, undefined, undefined, callback);
        });
    }

    public photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(EidPt.PHOTO), undefined, undefined, callback);
    }

    public rootCertificate(options: Options,
                           callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT, RequestHandler.determineOptions(options, callback));
    }

    public rootAuthenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse)
        => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT_AUTH, RequestHandler.determineOptions(options, callback));
    }

    public rootNonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse)
        => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_ROOT_NON_REP, RequestHandler.determineOptions(options, callback));
    }

    public authenticationCertificate(options: Options,
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_AUTHENTICATION, RequestHandler.determineOptions(options, callback));
    }

    public nonRepudiationCertificate(options: Options,
                                     callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse> {
        return this.getCertificate(EidPt.CERT_NON_REPUDIATION, RequestHandler.determineOptions(options, callback));
    }
}
