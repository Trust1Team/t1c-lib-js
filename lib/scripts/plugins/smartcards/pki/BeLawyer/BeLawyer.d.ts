import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard } from '../../Card';
import { AbstractBeLawyer, BeLawyerAllCertificatesResponse, BeLawyerPersonalInfoResponse } from './BeLawyerModel';
import { Options } from '../../../../util/RequestHandler';
export declare class BeLawyer extends GenericCertCard implements AbstractBeLawyer {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string);
    authenticationCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse>;
    personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
