import { AbstractBeLawyer, AuthenticateDataResponse, BeLawyerAllCertificatesResponse, BeLawyerPersonalInfoResponse, VerifyPinRequest } from './BeLawyerModel';
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../../core/service/CoreModel';
import { AuthenticateOrSignData, GenericCertCard } from '../../Card';
import { Options } from '../../../../util/RequestHandler';
export declare class BeLawyer extends GenericCertCard implements AbstractBeLawyer {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string);
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticationCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticateMethods(callback?: (error: T1CLibException, data: AuthenticateDataResponse) => void): Promise<AuthenticateDataResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    verifyPin(body: VerifyPinRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
