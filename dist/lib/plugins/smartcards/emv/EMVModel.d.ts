import { RestException } from '../../../core/exceptions/CoreExceptions';
import { PinCard } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';
export interface AbstractEMV extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: EmvAllDataResponse) => void): Promise<EmvAllDataResponse>;
    applications(callback?: (error: RestException, data: EmvApplicationsResponse) => void): Promise<EmvApplicationsResponse>;
    applicationData(callback?: (error: RestException, data: EmvApplicationDataResponse) => void): Promise<EmvApplicationDataResponse>;
    iccPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}
export declare class EmvAllDataResponse extends DataObjectResponse {
    data: {
        applications?: EmvApplication[];
        application_data?: EmvApplicationData;
    };
    success: boolean;
    constructor(data: {
        applications?: EmvApplication[];
        application_data?: EmvApplicationData;
    }, success: boolean);
}
export declare class EmvApplication {
    aid: string;
    name: string;
    priority: number;
    constructor(aid: string, name: string, priority: number);
}
export declare class EmvApplicationsResponse extends DataObjectResponse {
    data: EmvApplication[];
    success: boolean;
    constructor(data: EmvApplication[], success: boolean);
}
export declare class EmvApplicationData {
    country: string;
    country_code: string;
    effective_data: string;
    expiration_date: string;
    language: string;
    pan: string;
    name: string;
    constructor(country?: string, country_code?: string, effective_data?: string, expiration_date?: string, language?: string, pan?: string, name?: string);
}
export declare class EmvApplicationDataResponse extends DataObjectResponse {
    data: EmvApplicationData;
    success: boolean;
    constructor(data: EmvApplicationData, success: boolean);
}
export declare class EmvCertificate {
    data: string;
    exponent: string;
    remainder: string;
    constructor(data: string, exponent: string, remainder: string);
}
export declare class EmvCertificateResponse extends DataObjectResponse {
    data: EmvCertificate;
    success: boolean;
    constructor(data: EmvCertificate, success: boolean);
}
