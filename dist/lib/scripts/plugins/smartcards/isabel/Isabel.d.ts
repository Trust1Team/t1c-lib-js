import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse, DataArrayResponse, CertificateResponse } from '../../../core/service/CoreModel';
import { AbstractIsabel, IsabelAllDataResponse, IsabelSignRequest } from './IsabelModel';
import { GenericReaderContainer } from '../Card';
import { Options } from '../../../..';
export declare class Isabel extends GenericReaderContainer implements AbstractIsabel {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string, runInUserSpace: boolean);
    allDataFilters(): string[];
    allData(options: string[] | Options, callback?: (error: T1CLibException, data: IsabelAllDataResponse) => void): Promise<IsabelAllDataResponse>;
    cardId(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    signData(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticate(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
