import { AbstractEidBE, BeidAddressResponse, BeidRnDataResponse, BeidTokenDataResponse } from './EidBeModel';
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse, T1CResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, OptionalPin } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
import { LocalConnection } from '../../../../core/client/Connection';
export declare class EidBe extends GenericCertCard implements AbstractEidBE {
    static CONTAINER_PREFIX: string;
    static RN_DATA: string;
    static ADDRESS: string;
    static PHOTO: string;
    static TOKEN: string;
    static VERIFY_PRIV_KEY_REF: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    rnData(callback?: (error: T1CLibException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse>;
    address(callback?: (error: T1CLibException, data: BeidAddressResponse) => void): Promise<BeidAddressResponse>;
    tokenData(callback?: (error: T1CLibException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
    picture(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
}
