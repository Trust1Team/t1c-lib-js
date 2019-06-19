import {AbstractBeLawyer, AuthenticateDataResponse, BeLawyerAllCertificatesResponse, BeLawyerAllDataResponse, BeLawyerPersonalInfoResponse, VerifyPinRequest} from './BeLawyerModel';
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, DataResponse, T1CResponse} from '../../../../core/service/CoreModel';
import {AuthenticateOrSignData, GenericCertCard, OptionalPin, VerifyPinData} from '../../Card';
import {PinEnforcer} from '../../../../util/PinEnforcer';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';

const BELAWYER_CERTIFICATE_ROOT = '/certificates/root';
const BELAWYER_CERTIFICATE_SIGN = '/certificates/signing';
const BELAWYER_CERTIFICATE_ISSUER = '/certificates/issuer';
const BELAWYER_CERTIFICATE_AUTHENTICATION = '/certificates/authentication';
const BELAWYER_CERTIFICATE_ALL = '/certificates';
// const BELAWYER_ALL_DATA = '';
const BELAWYER_SIGN = '/sign';
const BELAWYER_AUTHENTICATE = '/authenticate';
const BELAWYER_VERIFY_PIN = '/verify-pin';
const BELAWYER_PHOTO = '/photo';
const BELAWYER_PERSONAL_INFO = '/personal-info';

export class BeLawyer extends GenericCertCard implements AbstractBeLawyer {
    static CONTAINER_PREFIX = 'diplad';

    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, BeLawyer.CONTAINER_PREFIX);
    }

    public signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_SIGN), undefined, undefined, callback);
    }

    public issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ISSUER), undefined, undefined, callback);
    }

    public allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ALL), undefined, undefined, callback);
    }

    public rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_ROOT), undefined, undefined, callback);
    }

    public authenticationCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_CERTIFICATE_AUTHENTICATION), undefined, undefined, callback);
    }

    // public allData(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse> {
    //     return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_ALL_DATA), undefined, undefined, callback);
    // }

    public personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_PERSONAL_INFO), undefined, undefined, callback);
    }

    public photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_PHOTO), undefined, undefined, callback);
    }

    public signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (body.algorithm_reference) {
            body.algorithm_reference = body.algorithm_reference.toLocaleLowerCase();
        }
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(BELAWYER_SIGN), body, undefined, undefined, callback);
        });
    }

    public authenticateMethods(callback?: (error: T1CLibException, data: AuthenticateDataResponse) => void): Promise<AuthenticateDataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(BELAWYER_AUTHENTICATE), undefined, undefined, callback);
    }

    public authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(BELAWYER_AUTHENTICATE),
                body, undefined, undefined, callback);
        });
    }

    public verifyPin(body: VerifyPinRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        return PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
            return this.connection.post(this.baseUrl, this.containerSuffix(BELAWYER_VERIFY_PIN),
                body, undefined, undefined, callback);
        });
    }
}
