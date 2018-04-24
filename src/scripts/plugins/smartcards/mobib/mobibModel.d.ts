import { RestException } from '../../../core/exceptions/CoreExceptions';
import { DataObjectResponse, DataResponse } from '../../../core/service/CoreModel';
import { Card } from '../Card';
export { AbstractMobib, AllDataResponse, StatusResponse, CardIssuing, CardIssuingResponse, Contract, ContractsResponse };
interface AbstractMobib extends Card {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    cardIssuing(callback?: (error: RestException, data: CardIssuingResponse) => void): Promise<CardIssuingResponse>;
    contracts(callback?: (error: RestException, data: ContractsResponse) => void): Promise<ContractsResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    status(callback?: (error: RestException, data: StatusResponse) => void): Promise<StatusResponse>;
}
declare class AllDataResponse extends DataObjectResponse {
    data: {
        active: boolean;
        'card-issuing': CardIssuing;
        contracts: Contract[];
        picture: string;
    };
    success: boolean;
    constructor(data: {
        active: boolean;
        'card-issuing': CardIssuing;
        contracts: Contract[];
        picture: string;
    }, success: boolean);
}
declare class StatusResponse extends DataObjectResponse {
    data: {
        active: boolean;
    };
    success: boolean;
    constructor(data: {
        active: boolean;
    }, success: boolean);
}
declare class CardIssuing {
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
    constructor(card_expiration_date: string, card_holder_birth_date: string, card_holder_end_date: string, card_holder_id: string, card_holder_name: string, card_holder_start_date: string, card_revalidation_date: string, card_type: number, company_id: number, gender: number, language: number, version: number);
}
declare class CardIssuingResponse extends DataObjectResponse {
    data: CardIssuing;
    success: boolean;
    constructor(data: CardIssuing, success: boolean);
}
declare class Contract {
    authenticator_kvc: number;
    authenticator_value: number;
    journey_interchanges_allowed: boolean;
    passengers_max: number;
    period_journeys: {
        max_number_of_trips: number;
        period: number;
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
            time: string;
            type: number;
        };
        multimodal: boolean;
        nameref: number;
    };
    validity_duration: {
        unit: number;
        value: number;
    };
    validity_start_date: string;
    vehicle_class_allowed: number;
    version: number;
    constructor(authenticator_kvc: number, authenticator_value: number, journey_interchanges_allowed: boolean, passengers_max: number, period_journeys: {
        max_number_of_trips: number;
        period: number;
    }, price_amount: number, provider: number, restrict_code: number, restrict_time: number, sale_date: string, sale_sam_count: number, sale_sam_id: number, spatials: {
        type: number;
    }[], tariff: {
        counter: {
            time: string;
            type: number;
        };
        multimodal: boolean;
        nameref: number;
    }, validity_duration: {
        unit: number;
        value: number;
    }, validity_start_date: string, vehicle_class_allowed: number, version: number);
}
declare class ContractsResponse extends DataObjectResponse {
    data: Contract[];
    success: boolean;
    constructor(data: Contract[], success: boolean);
}
