import { AbstractEidBE, BeidAddressResponse, BeidRnDataResponse, BeidTokenDataResponse } from './EidBeModel';
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse, T1CResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, OptionalPin } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export declare class EidBe extends GenericCertCard implements AbstractEidBE {
    static RN_DATA: string;
    static ADDRESS: string;
    static PHOTO: string;
    static TOKEN: string;
    static VERIFY_PRIV_KEY_REF: string;
    rnData(callback?: (error: RestException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse>;
    address(callback?: (error: RestException, data: BeidAddressResponse) => void): Promise<BeidAddressResponse>;
    tokenData(callback?: (error: RestException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}
