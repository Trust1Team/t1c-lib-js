import { RestException } from '../../../core/exceptions/CoreExceptions';
import { PinCard } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';
export { AbstractEMV, AllDataResponse, ApplicationDataResponse, ApplicationsResponse, EmvCertificateResponse, ApplicationData, Application, EmvCertificate };
interface AbstractEMV extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    applications(callback?: (error: RestException, data: ApplicationsResponse) => void): Promise<ApplicationsResponse>;
    applicationData(callback?: (error: RestException, data: ApplicationDataResponse) => void): Promise<ApplicationDataResponse>;
    iccPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string, callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}
declare class AllDataResponse extends DataObjectResponse {
    data: {
        applications: Application[];
        application_data: ApplicationData;
    };
    success: boolean;
    constructor(data: {
        applications: Application[];
        application_data: ApplicationData;
    }, success: boolean);
}
declare class Application {
    aid: string;
    name: string;
    priority: number;
    constructor(aid: string, name: string, priority: number);
}
declare class ApplicationsResponse extends DataObjectResponse {
    data: Application[];
    success: boolean;
    constructor(data: Application[], success: boolean);
}
declare class ApplicationData {
    country: string;
    country_code: string;
    effective_data: string;
    expiration_date: string;
    language: string;
    pan: string;
    name: string;
    constructor(country: string, country_code: string, effective_data: string, expiration_date: string, language: string, pan: string, name?: string);
}
declare class ApplicationDataResponse extends DataObjectResponse {
    data: ApplicationData;
    success: boolean;
    constructor(data: ApplicationData, success: boolean);
}
declare class EmvCertificate {
    data: string;
    exponent: string;
    remainder: string;
    constructor(data: string, exponent: string, remainder: string);
}
declare class EmvCertificateResponse extends DataObjectResponse {
    data: EmvCertificate;
    success: boolean;
    constructor(data: EmvCertificate, success: boolean);
}
