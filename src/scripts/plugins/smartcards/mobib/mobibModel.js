"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CoreModel_1 = require("../../../core/service/CoreModel");
var MobibAllDataResponse = /** @class */ (function (_super) {
    __extends(MobibAllDataResponse, _super);
    function MobibAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return MobibAllDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.MobibAllDataResponse = MobibAllDataResponse;
var MobibStatusResponse = /** @class */ (function (_super) {
    __extends(MobibStatusResponse, _super);
    function MobibStatusResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return MobibStatusResponse;
}(CoreModel_1.DataObjectResponse));
exports.MobibStatusResponse = MobibStatusResponse;
var MobibCardIssuing = /** @class */ (function () {
    function MobibCardIssuing(card_expiration_date, card_holder_birth_date, card_holder_end_date, card_holder_id, card_holder_name, card_holder_start_date, card_revalidation_date, card_type, company_id, gender, language, version) {
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
    return MobibCardIssuing;
}());
exports.MobibCardIssuing = MobibCardIssuing;
var MobibCardIssuingResponse = /** @class */ (function (_super) {
    __extends(MobibCardIssuingResponse, _super);
    function MobibCardIssuingResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return MobibCardIssuingResponse;
}(CoreModel_1.DataObjectResponse));
exports.MobibCardIssuingResponse = MobibCardIssuingResponse;
var MobibContract = /** @class */ (function () {
    function MobibContract(authenticator_kvc, authenticator_value, journey_interchanges_allowed, passengers_max, period_journeys, price_amount, provider, restrict_code, restrict_time, sale_date, sale_sam_count, sale_sam_id, spatials, tariff, validity_duration, validity_start_date, vehicle_class_allowed, version) {
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
    return MobibContract;
}());
exports.MobibContract = MobibContract;
var MobibContractsResponse = /** @class */ (function (_super) {
    __extends(MobibContractsResponse, _super);
    function MobibContractsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return MobibContractsResponse;
}(CoreModel_1.DataArrayResponse));
exports.MobibContractsResponse = MobibContractsResponse;
