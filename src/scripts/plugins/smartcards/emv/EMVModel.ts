/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { PinCard } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';

export { AbstractEMV, EmvAllDataResponse, EmvApplicationDataResponse, EmvApplicationsResponse,
    EmvCertificateResponse, EmvApplicationData, EmvApplication, EmvCertificate };


interface AbstractEMV extends PinCard {
    allData(filters: string[], callback?: (error: RestException, data: EmvAllDataResponse) => void): Promise<EmvAllDataResponse>;
    applications(callback?: (error: RestException, data: EmvApplicationsResponse) => void): Promise<EmvApplicationsResponse>;
    applicationData(callback?: (error: RestException, data: EmvApplicationDataResponse) => void): Promise<EmvApplicationDataResponse>;
    iccPublicKeyCertificate(aid: string,
                            callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string,
                               callback?: (error: RestException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}

class EmvAllDataResponse extends DataObjectResponse {
    constructor(public data: { applications?: EmvApplication[], application_data?: EmvApplicationData }, public success: boolean) {
        super(data, success);
    }
}

class EmvApplication {
    constructor(public aid: string, public name: string, public priority: number) {}
}

class EmvApplicationsResponse extends DataObjectResponse {
    constructor(public data: EmvApplication[], public success: boolean) {
        super(data, success);
    }
}

class EmvApplicationData {
    constructor(public country?: string,
                public country_code?: string,
                public effective_data?: string,
                public expiration_date?: string,
                public language?: string,
                public pan?: string,
                public name?: string) {}
}

class EmvApplicationDataResponse extends DataObjectResponse {
    constructor(public data: EmvApplicationData, public success: boolean) {
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