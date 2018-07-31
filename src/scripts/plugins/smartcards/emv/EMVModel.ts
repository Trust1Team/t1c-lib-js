/**
 * @author Maarten Somers
 * @since 2017
 */
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { PinCard } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';


export interface AbstractEMV extends PinCard {
    allData(filters: string[], callback?: (error: T1CLibException, data: EmvAllDataResponse) => void): Promise<EmvAllDataResponse>;
    applications(callback?: (error: T1CLibException, data: EmvApplicationsResponse) => void): Promise<EmvApplicationsResponse>;
    applicationData(callback?: (error: T1CLibException, data: EmvApplicationDataResponse) => void): Promise<EmvApplicationDataResponse>;
    iccPublicKeyCertificate(aid: string,
                            callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
    issuerPublicKeyCertificate(aid: string,
                               callback?: (error: T1CLibException, data: EmvCertificateResponse) => void): Promise<EmvCertificateResponse>;
}

export class EmvAllDataResponse extends DataObjectResponse {
    constructor(public data: { applications?: EmvApplication[], application_data?: EmvApplicationData }, public success: boolean) {
        super(data, success);
    }
}

export class EmvApplication {
    constructor(public aid: string, public name: string, public priority: number) {}
}

export class EmvApplicationsResponse extends DataObjectResponse {
    constructor(public data: EmvApplication[], public success: boolean) {
        super(data, success);
    }
}

export class EmvApplicationData {
    constructor(public country?: string,
                public country_code?: string,
                public effective_data?: string,
                public expiration_date?: string,
                public language?: string,
                public pan?: string,
                public name?: string) {}
}

export class EmvApplicationDataResponse extends DataObjectResponse {
    constructor(public data: EmvApplicationData, public success: boolean) {
        super(data, success);
    }
}

export class EmvCertificate {
    constructor(public data: string, public exponent: string, public remainder: string) {}
}

export class EmvCertificateResponse extends DataObjectResponse {
    constructor(public data: EmvCertificate, public success: boolean) {
        super(data, success);
    }
}