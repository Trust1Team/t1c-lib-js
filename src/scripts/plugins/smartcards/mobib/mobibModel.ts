/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataObjectResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { Card } from "../Card";
import * as Bluebird from 'bluebird';

export { AbstractMobib, AllDataResponse, StatusResponse, CardIssuing, CardIssuingResponse, Contract, ContractsResponse };


interface AbstractMobib extends Card {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    cardIssuing(callback?: (error: RestException, data: CardIssuingResponse) => void): Bluebird<CardIssuingResponse>;
    contracts(callback?: (error: RestException, data: ContractsResponse) => void): Bluebird<ContractsResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse>;
    status(callback?: (error: RestException, data: StatusResponse) => void): Bluebird<StatusResponse>;
}

interface AllDataResponse extends DataObjectResponse {
    data: {
        active: boolean
        'card-issuing': CardIssuing
        contracts: Contract[]
        picture: string
    }
}

interface StatusResponse extends DataObjectResponse {
    data: {
        active: boolean
    }
}

interface CardIssuing {
    card_expiration_date: string
    card_holder_birth_date: string
    card_holder_end_date: string
    card_holder_id: string
    card_holder_name: string
    card_holder_start_date:  string
    card_revalidation_date: string
    card_type: number
    company_id: number
    gender: number
    language: number
    version: number
}

interface CardIssuingResponse extends DataObjectResponse {
    data: CardIssuing
}

interface Contract {
    authenticator_kvc: number
    authenticator_value: number
    journey_interchanges_allowed: boolean
    passengers_max: number
    period_journeys: {
        max_number_of_trips: number
        period: number
    },
    price_amount: number
    provider: number
    restrict_code: number
    restrict_time: number
    sale_date: string
    sale_sam_count: number
    sale_sam_id: number
    spatials: { type: number }[]
    tariff: {
        counter: {
            time: string
            type: number
        },
        multimodal: boolean
        nameref: number
    },
    validity_duration: {
        unit: number
        value: number
    },
    validity_start_date: string
    vehicle_class_allowed: number
    version: number
}

interface ContractsResponse extends T1CResponse {
    data: Contract[]
}
