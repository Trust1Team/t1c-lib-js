import { AbstractBeLawyer, BeLawyerAllDataResponse } from './BeLawyerModel';
import { GenericCertCard, Options, T1CLibException, DataObjectResponse, DataResponse } from '../../../../../../lib';
export declare class BeLawyer extends GenericCertCard implements AbstractBeLawyer {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string);
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse>;
}
