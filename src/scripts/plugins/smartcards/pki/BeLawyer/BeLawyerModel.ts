/**
 * @author Maarten Somers
 * @since 2017
 */
import {AuthenticateOrSignData, Card, CertCard, VerifyPinData} from '../../Card';
import {Options, T1CLibException, DataObjectResponse, DataResponse, DataArrayResponse} from '../../../../../../lib';

export interface AbstractBeLawyer extends CertCard {
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: () => void): Promise<DataObjectResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[]| Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse>;
    // signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    // authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    // verifyPin(body: VerifyPinRequest, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<VerifyPinResponse>;
}

export class BeLawyerAllDataResponse extends DataObjectResponse {
    constructor(public data: { active?: boolean, 'card-issuing'?: BeLawyerCardIssuing, contracts?: BeLawyerContract[], picture?: string },
                public success: boolean) {
        super(data, success);
    }
}

export class BeLawyerStatusResponse extends DataObjectResponse {
    constructor(public data: { active: boolean }, public success: boolean) {
        super(data, success);
    }
}

export class BeLawyerCardIssuing {
    constructor(public card_expiration_date?: string,
                public card_holder_birth_date?: string,
                public card_holder_end_date?: string,
                public card_holder_id?: string,
                public card_holder_name?: string,
                public card_holder_start_date?:  string,
                public card_revalidation_date?: string,
                public card_type?: number,
                public company_id?: number,
                public gender?: number,
                public language?: number,
                public version?: number) {}
}

export class VerifyPinRequest {
    constructor(public os_dialog: boolean, public pinpad: boolean, public pin?: string) {
    }
}

export class VerifyPinResponse {
    constructor(public data: boolean, public success: boolean) {
    }
}

export class BeLawyerCardIssuingResponse extends DataObjectResponse {
    constructor(public data: BeLawyerCardIssuing, public success: boolean) {
        super(data, success);
    }
}

export class BeLawyerContract {
    constructor(public authenticator_kvc?: number,
                public authenticator_value?: number,
                public journey_interchanges_allowed?: boolean,
                public passengers_max?: number,
                public period_journeys?: {
                    max_number_of_trips?: number
                    period?: number
                },
                public price_amount?: number,
                public provider?: number,
                public restrict_code?: number,
                public restrict_time?: number,
                public sale_date?: string,
                public sale_sam_count?: number,
                public sale_sam_id?: number,
                public spatials?: { type: number }[],
                public tariff?: {
                    counter: {
                        time?: string
                        type?: number
                    },
                    multimodal?: boolean
                    nameref?: number
                },
                public validity_duration?: {
                    unit?: number
                    value?: number
                },
                public validity_start_date?: string,
                public vehicle_class_allowed?: number,
                public version?: number) {}
}

export class BeLawyerContractsResponse extends DataArrayResponse {
    constructor(public data: BeLawyerContract[], public success: boolean) {
        super(data, success);
    }
}
