import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, OptionalPin } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
import { AbstractEidPT, PtIdDataResponse, PtAddressResponse } from './EidPtModel';
import { LocalConnection } from '../../../../core/client/Connection';
export declare class EidPt extends GenericCertCard implements AbstractEidPT {
    static CONTAINER_PREFIX: string;
    static ADDRESS: string;
    static CERT_ROOT_AUTH: string;
    static CERT_ROOT_NON_REP: string;
    static ID_DATA: string;
    static PHOTO: string;
    static VERIFY_PRIV_KEY_REF: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    idData(callback?: (error: T1CLibException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    idDataWithOutPhoto(callback?: (error: T1CLibException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    address(data: OptionalPin, callback?: (error: T1CLibException, data: PtAddressResponse) => void): Promise<PtAddressResponse>;
    addressWithEncryptedPin(data: OptionalPin, callback?: (error: T1CLibException, data: PtAddressResponse) => void): Promise<PtAddressResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootAuthenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootNonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
