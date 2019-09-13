import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { DataObjectResponse, DataArrayResponse } from '../../../core/service/CoreModel';
import { AbstractIsabel, IsabelRequest, IsabelSignRequest } from './IsabelModel';
import { GenericReaderContainer } from '../Card';
export declare class Isabel extends GenericReaderContainer implements AbstractIsabel {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: any, reader_id: string, runInUserSpace: boolean);
    rootCertificate(body: IsabelRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    nonRepudiationCertificate(body: IsabelRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    signData(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    authenticate(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
}
