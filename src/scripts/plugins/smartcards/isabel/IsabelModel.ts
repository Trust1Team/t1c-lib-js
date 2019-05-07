/**
 * @author William Verhaeghe
 * @since 2019
 */
import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {PinCard} from '../Card';
import {DataObjectResponse} from '../../../core/service/CoreModel';


export interface AbstractIsabel extends PinCard {
    allData(filters: string[], callback?: (error: T1CLibException, data: IsabelAllDataResponse) => void): Promise<IsabelAllDataResponse>;

    applications(callback?: (error: T1CLibException, data: IsabelApplicationsResponse) => void): Promise<IsabelApplicationsResponse>;

    applicationData(callback?: (error: T1CLibException, data: IsabelApplicationDataResponse) => void): Promise<IsabelApplicationDataResponse>;

    iccPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: IsabelCertificateResponse) => void): Promise<IsabelCertificateResponse>;

    issuerPublicKeyCertificate(aid: string, callback?: (error: T1CLibException, data: IsabelCertificateResponse) => void): Promise<IsabelCertificateResponse>;
}

export class IsabelAllDataResponse extends DataObjectResponse {
    constructor(public data: { applications?: IsabelApplication[], application_data?: IsabelApplicationData }, public success: boolean) {
        super(data, success);
    }
}

export class IsabelApplication {
    constructor(public aid: string, public name: string, public priority: number) {
    }
}

export class IsabelApplicationsResponse extends DataObjectResponse {
    constructor(public data: IsabelApplication[], public success: boolean) {
        super(data, success);
    }
}

export class IsabelApplicationData {
    constructor(public country?: string,
                public country_code?: string,
                public effective_data?: string,
                public expiration_date?: string,
                public language?: string,
                public pan?: string,
                public name?: string) {
    }
}

export class IsabelApplicationDataResponse extends DataObjectResponse {
    constructor(public data: IsabelApplicationData, public success: boolean) {
        super(data, success);
    }
}

export class IsabelCertificate {
    constructor(public data: string, public exponent: string, public remainder: string) {
    }
}

export class IsabelCertificateResponse extends DataObjectResponse {
    constructor(public data: IsabelCertificate, public success: boolean) {
        super(data, success);
    }
}
