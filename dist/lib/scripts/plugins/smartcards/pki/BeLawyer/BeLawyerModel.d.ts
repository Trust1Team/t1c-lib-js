import { CertCard } from '../../Card';
import { Options, T1CLibException, DataObjectResponse, DataResponse, DataArrayResponse } from '../../../../../../lib';
export interface AbstractBeLawyer extends CertCard {
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: () => void): Promise<DataObjectResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse>;
}
export declare class BeLawyerAllDataResponse extends DataObjectResponse {
    data: {
        active?: boolean;
        'card-issuing'?: BeLawyerCardIssuing;
        contracts?: BeLawyerContract[];
        picture?: string;
    };
    success: boolean;
    constructor(data: {
        active?: boolean;
        'card-issuing'?: BeLawyerCardIssuing;
        contracts?: BeLawyerContract[];
        picture?: string;
    }, success: boolean);
}
export declare class BeLawyerStatusResponse extends DataObjectResponse {
    data: {
        active: boolean;
    };
    success: boolean;
    constructor(data: {
        active: boolean;
    }, success: boolean);
}
export declare class BeLawyerCardIssuing {
    card_expiration_date?: string;
    card_holder_birth_date?: string;
    card_holder_end_date?: string;
    card_holder_id?: string;
    card_holder_name?: string;
    card_holder_start_date?: string;
    card_revalidation_date?: string;
    card_type?: number;
    company_id?: number;
    gender?: number;
    language?: number;
    version?: number;
    constructor(card_expiration_date?: string, card_holder_birth_date?: string, card_holder_end_date?: string, card_holder_id?: string, card_holder_name?: string, card_holder_start_date?: string, card_revalidation_date?: string, card_type?: number, company_id?: number, gender?: number, language?: number, version?: number);
}
export declare class VerifyPinRequest {
    os_dialog: boolean;
    pinpad: boolean;
    pin?: string;
    constructor(os_dialog: boolean, pinpad: boolean, pin?: string);
}
export declare class VerifyPinResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class BeLawyerCardIssuingResponse extends DataObjectResponse {
    data: BeLawyerCardIssuing;
    success: boolean;
    constructor(data: BeLawyerCardIssuing, success: boolean);
}
export declare class BeLawyerContract {
    authenticator_kvc?: number;
    authenticator_value?: number;
    journey_interchanges_allowed?: boolean;
    passengers_max?: number;
    period_journeys?: {
        max_number_of_trips?: number;
        period?: number;
    };
    price_amount?: number;
    provider?: number;
    restrict_code?: number;
    restrict_time?: number;
    sale_date?: string;
    sale_sam_count?: number;
    sale_sam_id?: number;
    spatials?: {
        type: number;
    }[];
    tariff?: {
        counter: {
            time?: string;
            type?: number;
        };
        multimodal?: boolean;
        nameref?: number;
    };
    validity_duration?: {
        unit?: number;
        value?: number;
    };
    validity_start_date?: string;
    vehicle_class_allowed?: number;
    version?: number;
    constructor(authenticator_kvc?: number, authenticator_value?: number, journey_interchanges_allowed?: boolean, passengers_max?: number, period_journeys?: {
        max_number_of_trips?: number;
        period?: number;
    }, price_amount?: number, provider?: number, restrict_code?: number, restrict_time?: number, sale_date?: string, sale_sam_count?: number, sale_sam_id?: number, spatials?: {
        type: number;
    }[], tariff?: {
        counter: {
            time?: string;
            type?: number;
        };
        multimodal?: boolean;
        nameref?: number;
    }, validity_duration?: {
        unit?: number;
        value?: number;
    }, validity_start_date?: string, vehicle_class_allowed?: number, version?: number);
}
export declare class BeLawyerContractsResponse extends DataArrayResponse {
    data: BeLawyerContract[];
    success: boolean;
    constructor(data: BeLawyerContract[], success: boolean);
}
