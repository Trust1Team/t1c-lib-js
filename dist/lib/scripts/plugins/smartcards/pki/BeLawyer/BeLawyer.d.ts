import { AbstractBeLawyer, BeLawyerAllCertificatesResponse, BeLawyerPersonalInfoResponse } from './BeLawyerModel';
import { GenericCertCard, Options, T1CLibException, DataResponse } from '../../../../../../lib';
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
}
