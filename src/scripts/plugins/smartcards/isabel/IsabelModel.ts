import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import {DataResponse, DataObjectResponse, DataArrayResponse, CertificateResponse} from '../../../core/service/CoreModel';

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

export class IsabelAllDataResponse extends DataObjectResponse {
    constructor(public data: IsabelAllData, public success: boolean) {
        super(data, success);
    }
}

export class IsabelAllData {
    constructor(public card_id: string) {}
}

export class IsabelSignRequest {
    constructor(public data: string, public algorithm_reference: string) {
    }
}
