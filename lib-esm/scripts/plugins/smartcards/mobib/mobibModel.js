import { DataArrayResponse, DataObjectResponse } from '../../../core/service/CoreModel';
export class MobibAllDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class MobibStatusResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class MobibCardIssuing {
    constructor(card_expiration_date, card_holder_birth_date, card_holder_end_date, card_holder_id, card_holder_name, card_holder_start_date, card_revalidation_date, card_type, company_id, gender, language, version) {
        this.card_expiration_date = card_expiration_date;
        this.card_holder_birth_date = card_holder_birth_date;
        this.card_holder_end_date = card_holder_end_date;
        this.card_holder_id = card_holder_id;
        this.card_holder_name = card_holder_name;
        this.card_holder_start_date = card_holder_start_date;
        this.card_revalidation_date = card_revalidation_date;
        this.card_type = card_type;
        this.company_id = company_id;
        this.gender = gender;
        this.language = language;
        this.version = version;
    }
}
export class MobibCardIssuingResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class MobibContract {
    constructor(authenticator_kvc, authenticator_value, journey_interchanges_allowed, passengers_max, period_journeys, price_amount, provider, restrict_code, restrict_time, sale_date, sale_sam_count, sale_sam_id, spatials, tariff, validity_duration, validity_start_date, vehicle_class_allowed, version) {
        this.authenticator_kvc = authenticator_kvc;
        this.authenticator_value = authenticator_value;
        this.journey_interchanges_allowed = journey_interchanges_allowed;
        this.passengers_max = passengers_max;
        this.period_journeys = period_journeys;
        this.price_amount = price_amount;
        this.provider = provider;
        this.restrict_code = restrict_code;
        this.restrict_time = restrict_time;
        this.sale_date = sale_date;
        this.sale_sam_count = sale_sam_count;
        this.sale_sam_id = sale_sam_id;
        this.spatials = spatials;
        this.tariff = tariff;
        this.validity_duration = validity_duration;
        this.validity_start_date = validity_start_date;
        this.vehicle_class_allowed = vehicle_class_allowed;
        this.version = version;
    }
}
export class MobibContractsResponse extends DataArrayResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
//# sourceMappingURL=mobibModel.js.map