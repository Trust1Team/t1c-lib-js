import { RestException } from '../../../core/exceptions/CoreExceptions';
import { DataArrayResponse, DataObjectResponse, DataResponse } from '../../../core/service/CoreModel';
import { Card } from '../Card';
import { Options } from '../../../util/RequestHandler';
export interface AbstractMobib extends Card {
    allData(filters: string[] | Options, callback?: (error: RestException, data: MobibAllDataResponse) => void): Promise<MobibAllDataResponse>;
    cardIssuing(callback?: (error: RestException, data: MobibCardIssuingResponse) => void): Promise<MobibCardIssuingResponse>;
    contracts(callback?: (error: RestException, data: MobibContractsResponse) => void): Promise<MobibContractsResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    status(callback?: (error: RestException, data: MobibStatusResponse) => void): Promise<MobibStatusResponse>;
}
export declare class MobibAllDataResponse extends DataObjectResponse {
    data: {
        active?: boolean;
        'card-issuing'?: MobibCardIssuing;
        contracts?: MobibContract[];
        picture?: string;
    };
    success: boolean;
    constructor(data: {
        active?: boolean;
        'card-issuing'?: MobibCardIssuing;
        contracts?: MobibContract[];
        picture?: string;
    }, success: boolean);
}
export declare class MobibStatusResponse extends DataObjectResponse {
    data: {
        active: boolean;
    };
    success: boolean;
    constructor(data: {
        active: boolean;
    }, success: boolean);
}
export declare class MobibCardIssuing {
    card_expiration_date: string;
    card_holder_birth_date: string;
    card_holder_end_date: string;
    card_holder_id: string;
    card_holder_name: string;
    card_holder_start_date: string;
    card_revalidation_date: string;
    card_type: number;
    company_id: number;
    gender: number;
    language: number;
    version: number;
    constructor(card_expiration_date?: string, card_holder_birth_date?: string, card_holder_end_date?: string, card_holder_id?: string, card_holder_name?: string, card_holder_start_date?: string, card_revalidation_date?: string, card_type?: number, company_id?: number, gender?: number, language?: number, version?: number);
}
export declare class MobibCardIssuingResponse extends DataObjectResponse {
    data: MobibCardIssuing;
    success: boolean;
    constructor(data: MobibCardIssuing, success: boolean);
}
export declare class MobibContract {
    authenticator_kvc: number;
    authenticator_value: number;
    journey_interchanges_allowed: boolean;
    passengers_max: number;
    period_journeys: {
        max_number_of_trips?: number;
        period?: number;
    };
    price_amount: number;
    provider: number;
    restrict_code: number;
    restrict_time: number;
    sale_date: string;
    sale_sam_count: number;
    sale_sam_id: number;
    spatials: {
        type: number;
    }[];
    tariff: {
        counter: {
            time?: string;
            type?: number;
        };
        multimodal?: boolean;
        nameref?: number;
    };
    validity_duration: {
        unit?: number;
        value?: number;
    };
    validity_start_date: string;
    vehicle_class_allowed: number;
    version: number;
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
export declare class MobibContractsResponse extends DataArrayResponse {
    data: MobibContract[];
    success: boolean;
    constructor(data: MobibContract[], success: boolean);
}
