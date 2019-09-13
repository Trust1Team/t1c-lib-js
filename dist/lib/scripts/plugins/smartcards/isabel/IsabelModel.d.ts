import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { DataObjectResponse, DataArrayResponse } from '../../../core/service/CoreModel';
export interface AbstractIsabel {
    rootCertificate(body: IsabelRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    nonRepudiationCertificate(body: IsabelRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    signData(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
    authenticate(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataObjectResponse) => void): Promise<DataObjectResponse>;
}
export declare class IsabelRequest {
    card_id: string;
    constructor(card_id: string);
}
export declare class IsabelSignRequest {
    card_id: string;
    data: string;
    algorithm_reference: string;
    constructor(card_id: string, data: string, algorithm_reference: string);
}
