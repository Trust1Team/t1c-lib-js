import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, OptionalPin } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
import { AbstractEidPT, PtIdDataResponse, PtAddressResponse } from './EidPtModel';
export declare class EidPt extends GenericCertCard implements AbstractEidPT {
    static ADDRESS: string;
    static CERT_ROOT_AUTH: string;
    static CERT_ROOT_NON_REP: string;
    static ID_DATA: string;
    static PHOTO: string;
    idData(callback?: (error: RestException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    idDataWithOutPhoto(callback?: (error: RestException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    address(data: OptionalPin, callback?: (error: RestException, data: PtAddressResponse) => void): Promise<PtAddressResponse>;
    photo(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootAuthenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootNonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
