/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { PinCard } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';

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

class AllDataResponse extends DataObjectResponse {
    constructor(public data: { applications: Application[], application_data: ApplicationData }, public success: boolean) {
        super(data, success);
    }
}

class Application {
    constructor(public aid: string, public name: string, public priority: number) {}
}

class ApplicationsResponse extends DataObjectResponse {
    constructor(public data: Application[], public success: boolean) {
        super(data, success);
    }
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

class ApplicationDataResponse extends DataObjectResponse {
    constructor(public data: ApplicationData, public success: boolean) {
        super(data, success);
    }
}

class EmvCertificate {
    constructor(public data: string, public exponent: string, public remainder: string) {}
}

class EmvCertificateResponse extends DataObjectResponse {
    constructor(public data: EmvCertificate, public success: boolean) {
        super(data, success);
    }
}