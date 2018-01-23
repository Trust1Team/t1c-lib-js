/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { PinCard } from "../Card";
import { DataObjectResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";

export { AbstractEMV, AllDataResponse, ApplicationDataResponse, ApplicationsResponse, EmvCertificateResponse };


interface AbstractEMV extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    applications(callback?: (error: RestException, data: ApplicationsResponse) => void): Promise<ApplicationsResponse>;
    applicationData(callback?: (error: RestException, data: ApplicationDataResponse) => void): Promise<ApplicationDataResponse>;
    iccPublicKeyCertificate(aid: string,
                            callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string,
                               callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}

interface AllDataResponse extends T1CResponse {
    data: {
        applications: Application[]
        application_data: ApplicationData
    }
}

class Application {
    constructor(public aid: string, public name: string, public priority: number) {}
}

interface ApplicationsResponse extends T1CResponse {
    data: Application[]
}

class ApplicationData {
    constructor(public country: string,
                public country_code: string,
                public effective_data: string,
                public expiration_date: string,
                public language: string,
                public pan: string,
                public name?: string) {}
}

interface ApplicationDataResponse extends T1CResponse {
    data: ApplicationData
}

interface EmvCertificate {
    data: string,
    exponent: string,
    remainder: string
}

interface EmvCertificateResponse extends T1CResponse {
    data: EmvCertificate
}