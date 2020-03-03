import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { DataResponse, DataObjectResponse, DataArrayResponse, CertificateResponse } from '../../../core/service/CoreModel';
export interface AbstractIsabel {
    allDataFilters(): string[];
    allData(filters: string[], callback?: (error: T1CLibException, data: IsabelAllDataResponse) => void): Promise<IsabelAllDataResponse>;
    cardId(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    signData(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticate(body: IsabelSignRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
export declare class IsabelAllDataResponse extends DataObjectResponse {
    data: IsabelAllData;
    success: boolean;
    constructor(data: IsabelAllData, success: boolean);
}
export declare class IsabelAllData {
    card_id: string;
    constructor(card_id: string);
}
export declare class IsabelSignRequest {
    data: string;
    algorithm_reference: string;
    constructor(data: string, algorithm_reference: string);
}
