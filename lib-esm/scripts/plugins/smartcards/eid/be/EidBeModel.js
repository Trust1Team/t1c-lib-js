import { DataObjectResponse } from '../../../../core/service/CoreModel';
export class BeidAddressResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class BeidAddress {
    constructor(municipality, raw_data, signature, street_and_number, version, zipcode) {
        this.municipality = municipality;
        this.raw_data = raw_data;
        this.signature = signature;
        this.street_and_number = street_and_number;
        this.version = version;
        this.zipcode = zipcode;
    }
}
export class BeidAllCertsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class BeidAllCerts {
    constructor(authentication_certificate, citizen_certificate, non_repudiation_certificate, root_certificate, rrn_certificate) {
        this.authentication_certificate = authentication_certificate;
        this.citizen_certificate = citizen_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.root_certificate = root_certificate;
        this.rrn_certificate = rrn_certificate;
    }
}
export class BeidAllDataResponse extends BeidAllCertsResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class BeidAllData {
    constructor(address, authentication_certificate, citizen_certificate, non_repudiation_certificate, picture, rn, root_certificate, rrn_certificate, token_data) {
        this.address = address;
        this.authentication_certificate = authentication_certificate;
        this.citizen_certificate = citizen_certificate;
        this.non_repudiation_certificate = non_repudiation_certificate;
        this.picture = picture;
        this.rn = rn;
        this.root_certificate = root_certificate;
        this.rrn_certificate = rrn_certificate;
        this.token_data = token_data;
    }
}
export class BeidTokenData {
    constructor(eid_compliant, electrical_perso_interface_version, electrical_perso_version, graphical_perso_version, label, prn_generation, raw_data, serial_number, version, version_rfu) {
        this.eid_compliant = eid_compliant;
        this.electrical_perso_interface_version = electrical_perso_interface_version;
        this.electrical_perso_version = electrical_perso_version;
        this.graphical_perso_version = graphical_perso_version;
        this.label = label;
        this.prn_generation = prn_generation;
        this.raw_data = raw_data;
        this.serial_number = serial_number;
        this.version = version;
        this.version_rfu = version_rfu;
    }
}
export class BeidTokenDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class BeidRnData {
    constructor(birth_date, birth_location, card_delivery_municipality, card_number, card_validity_date_begin, card_validity_date_end, chip_number, document_type, first_names, name, national_number, nationality, noble_condition, picture_hash, raw_data, sex, signature, special_status, third_name, version) {
        this.birth_date = birth_date;
        this.birth_location = birth_location;
        this.card_delivery_municipality = card_delivery_municipality;
        this.card_number = card_number;
        this.card_validity_date_begin = card_validity_date_begin;
        this.card_validity_date_end = card_validity_date_end;
        this.chip_number = chip_number;
        this.document_type = document_type;
        this.first_names = first_names;
        this.name = name;
        this.national_number = national_number;
        this.nationality = nationality;
        this.noble_condition = noble_condition;
        this.picture_hash = picture_hash;
        this.raw_data = raw_data;
        this.sex = sex;
        this.signature = signature;
        this.special_status = special_status;
        this.third_name = third_name;
        this.version = version;
    }
}
export class BeidRnDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
//# sourceMappingURL=EidBeModel.js.map