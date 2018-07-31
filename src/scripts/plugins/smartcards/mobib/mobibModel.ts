/**
 * @author Maarten Somers
 * @since 2017
 */
import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import {DataArrayResponse, DataObjectResponse, DataResponse} from '../../../core/service/CoreModel';
import { Card } from '../Card';
import {Options} from '../../../util/RequestHandler';

export interface AbstractMobib extends Card {
    allData(filters: string[]| Options, callback?: (error: T1CLibException, data: MobibAllDataResponse) => void): Promise<MobibAllDataResponse>;
    cardIssuing(callback?: (error: T1CLibException, data: MobibCardIssuingResponse) => void): Promise<MobibCardIssuingResponse>;
    contracts(callback?: (error: T1CLibException, data: MobibContractsResponse) => void): Promise<MobibContractsResponse>;
    picture(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    status(callback?: (error: T1CLibException, data: MobibStatusResponse) => void): Promise<MobibStatusResponse>;
}

export class MobibAllDataResponse extends DataObjectResponse {
    constructor(public data: { active?: boolean, 'card-issuing'?: MobibCardIssuing, contracts?: MobibContract[], picture?: string },
                public success: boolean) {
        super(data, success);
    }
}

export class MobibStatusResponse extends DataObjectResponse {
    constructor(public data: { active: boolean }, public success: boolean) {
        super(data, success);
    }
}

export class MobibCardIssuing {
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

export class MobibCardIssuingResponse extends DataObjectResponse {
    constructor(public data: MobibCardIssuing, public success: boolean) {
        super(data, success);
    }
}

export class MobibContract {
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

export class MobibContractsResponse extends DataArrayResponse {
    constructor(public data: MobibContract[], public success: boolean) {
        super(data, success);
    }
}
