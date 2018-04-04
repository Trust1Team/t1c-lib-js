/**
 * @author Maarten Somers
 * @since 2017
 */
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

class AllDataResponse extends DataObjectResponse {
    constructor(public data: { active: boolean, 'card-issuing': CardIssuing, contracts: Contract[], picture: string },
                public success: boolean) {
        super(data, success);
    }
}

class StatusResponse extends DataObjectResponse {
    constructor(public data: { active: boolean }, public success: boolean) {
        super(data, success);
    }
}

class CardIssuing {
    constructor(public card_expiration_date: string,
                public card_holder_birth_date: string,
                public card_holder_end_date: string,
                public card_holder_id: string,
                public card_holder_name: string,
                public card_holder_start_date:  string,
                public card_revalidation_date: string,
                public card_type: number,
                public company_id: number,
                public gender: number,
                public language: number,
                public version: number) {}
}

class CardIssuingResponse extends DataObjectResponse {
    constructor(public data: CardIssuing, public success: boolean) {
        super(data, success);
    }
}

class Contract {
    constructor(public authenticator_kvc: number,
                public authenticator_value: number,
                public journey_interchanges_allowed: boolean,
                public passengers_max: number,
                public period_journeys: {
                    max_number_of_trips: number
                    period: number
                },
                public price_amount: number,
                public provider: number,
                public restrict_code: number,
                public restrict_time: number,
                public sale_date: string,
                public sale_sam_count: number,
                public sale_sam_id: number,
                public spatials: { type: number }[],
                public tariff: {
                    counter: {
                        time: string
                        type: number
                    },
                    multimodal: boolean
                    nameref: number
                },
                public validity_duration: {
                    unit: number
                    value: number
                },
                public validity_start_date: string,
                public vehicle_class_allowed: number,
                public version: number) {}
}

class ContractsResponse extends DataObjectResponse {
    constructor(public data: Contract[], public success: boolean) {
        super(data, success);
    }
}
