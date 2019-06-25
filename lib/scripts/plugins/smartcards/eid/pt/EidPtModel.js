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
Object.defineProperty(exports, "__esModule", { value: true });
var CoreModel_1 = require("../../../../core/service/CoreModel");
var PtAllCertsResponse = (function (_super) {
    __extends(PtAllCertsResponse, _super);
    function PtAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PtAllCertsResponse;
}(CoreModel_1.DataObjectResponse));
exports.PtAllCertsResponse = PtAllCertsResponse;
var PtAllCerts = (function () {
    function PtAllCerts(authentication_certificate, non_repudiation_certificate, root_authentication_certificate, root_certificate, root_non_repudiation_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_authentication_certificate = root_authentication_certificate;
        this.root_certificate = root_certificate;
        this.root_non_repudiation_certificate = root_non_repudiation_certificate;
    }
    return PtAllCerts;
}());
exports.PtAllCerts = PtAllCerts;
var PtAllDataResponse = (function (_super) {
    __extends(PtAllDataResponse, _super);
    function PtAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PtAllDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.PtAllDataResponse = PtAllDataResponse;
var PtAllData = (function () {
    function PtAllData(id, authentication_certificate, non_repudiation_certificate, root_authentication_certificate, root_certificate, root_non_repudiaton_certificate) {
        this.id = id;
        this.authentication_certificate = authentication_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_authentication_certificate = root_authentication_certificate;
        this.root_certificate = root_certificate;
        this.root_non_repudiaton_certificate = root_non_repudiaton_certificate;
    }
    return PtAllData;
}());
exports.PtAllData = PtAllData;
var PtIdData = (function () {
    function PtIdData(accidental_indications, civilian_number, country, date_of_birth, document_number, document_number_pan, document_type, document_version, gender, given_name_father, given_name_mother, health_no, height, issuing_entity, local_of_request, mrz1, mrz2, mrz3, name, nationality, raw_data, social_security_no, surname, surname_father, surname_mother, tax_no, validity_begin_date, validity_end_date, photo) {
        this.accidental_indications = accidental_indications;
        this.civilian_number = civilian_number;
        this.country = country;
        this.date_of_birth = date_of_birth;
        this.document_number = document_number;
        this.document_number_pan = document_number_pan;
        this.document_type = document_type;
        this.document_version = document_version;
        this.gender = gender;
        this.given_name_father = given_name_father;
        this.given_name_mother = given_name_mother;
        this.health_no = health_no;
        this.height = height;
        this.issuing_entity = issuing_entity;
        this.local_of_request = local_of_request;
        this.mrz1 = mrz1;
        this.mrz2 = mrz2;
        this.mrz3 = mrz3;
        this.name = name;
        this.nationality = nationality;
        this.raw_data = raw_data;
        this.social_security_no = social_security_no;
        this.surname = surname;
        this.surname_father = surname_father;
        this.surname_mother = surname_mother;
        this.tax_no = tax_no;
        this.validity_begin_date = validity_begin_date;
        this.validity_end_date = validity_end_date;
        this.photo = photo;
    }
    return PtIdData;
}());
exports.PtIdData = PtIdData;
var PtIdDataResponse = (function (_super) {
    __extends(PtIdDataResponse, _super);
    function PtIdDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PtIdDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.PtIdDataResponse = PtIdDataResponse;
var PtAddressData = (function () {
    function PtAddressData(abbr_building_type, abbr_street_type, building_type, civil_parish, civil_parish_description, district, district_description, door_no, floor, gen_address_num, is_national, locality, municipality, municipality_description, place, postal_locality, raw_data, side, street_name, street_type, type, zip3, zip4) {
        this.abbr_building_type = abbr_building_type;
        this.abbr_street_type = abbr_street_type;
        this.building_type = building_type;
        this.civil_parish = civil_parish;
        this.civil_parish_description = civil_parish_description;
        this.district = district;
        this.district_description = district_description;
        this.door_no = door_no;
        this.floor = floor;
        this.gen_address_num = gen_address_num;
        this.is_national = is_national;
        this.locality = locality;
        this.municipality = municipality;
        this.municipality_description = municipality_description;
        this.place = place;
        this.postal_locality = postal_locality;
        this.raw_data = raw_data;
        this.side = side;
        this.street_name = street_name;
        this.street_type = street_type;
        this.type = type;
        this.zip3 = zip3;
        this.zip4 = zip4;
    }
    return PtAddressData;
}());
exports.PtAddressData = PtAddressData;
var PtAddressResponse = (function (_super) {
    __extends(PtAddressResponse, _super);
    function PtAddressResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return PtAddressResponse;
}(CoreModel_1.DataObjectResponse));
exports.PtAddressResponse = PtAddressResponse;
//# sourceMappingURL=EidPtModel.js.map