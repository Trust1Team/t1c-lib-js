import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, OptionalPin } from '../../Card';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export { AbstractEidPT, AllCertsResponse, AllDataResponse, IdDataResponse, PtAddressResponse, AllPtData, AllPtCerts, IdData, PtAddressData };
interface AbstractEidPT extends CertCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    idData(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse>;
    idDataWithOutPhoto(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse>;
    address(data: OptionalPin, callback?: (error: RestException, data: PtAddressResponse) => void): Promise<PtAddressResponse>;
    photo(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootAuthenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootNonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllPtCerts;
    success: boolean;
    constructor(data: AllPtCerts, success: boolean);
}
declare class AllPtCerts {
    authentication_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_authentication_certificate: T1CCertificate;
    root_certificate: T1CCertificate;
    root_non_repudiation_certificate: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_authentication_certificate?: T1CCertificate, root_certificate?: T1CCertificate, root_non_repudiation_certificate?: T1CCertificate);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllPtData;
    success: boolean;
    constructor(data: AllPtData, success: boolean);
}
declare class AllPtData {
    id: IdData;
    authentication_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_authentication_certificate: T1CCertificate;
    root_certificate: T1CCertificate;
    root_non_repudiaton_certificate: T1CCertificate;
    constructor(id?: IdData, authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_authentication_certificate?: T1CCertificate, root_certificate?: T1CCertificate, root_non_repudiaton_certificate?: T1CCertificate);
}
declare class IdData {
    accidental_indications: boolean;
    civilian_number: string;
    country: string;
    date_of_birth: string;
    document_number: string;
    document_number_pan: string;
    document_type: string;
    document_version: string;
    gender: string;
    given_name_father: string;
    given_name_mother: string;
    health_no: string;
    height: string;
    issuing_entity: string;
    local_of_request: string;
    mrz1: string;
    mrz2: string;
    mrz3: string;
    name: string;
    nationality: string;
    raw_data: string;
    social_security_no: string;
    surname: string;
    surname_father: string;
    surname_mother: string;
    tax_no: string;
    validity_begin_date: string;
    validity_end_date: string;
    photo: string;
    constructor(accidental_indications: boolean, civilian_number: string, country: string, date_of_birth: string, document_number: string, document_number_pan: string, document_type: string, document_version: string, gender: string, given_name_father: string, given_name_mother: string, health_no: string, height: string, issuing_entity: string, local_of_request: string, mrz1: string, mrz2: string, mrz3: string, name: string, nationality: string, raw_data: string, social_security_no: string, surname: string, surname_father: string, surname_mother: string, tax_no: string, validity_begin_date: string, validity_end_date: string, photo?: string);
}
declare class IdDataResponse extends DataObjectResponse {
    data: IdData;
    success: boolean;
    constructor(data: IdData, success: boolean);
}
declare class PtAddressData {
    abbr_building_type: string;
    abbr_street_type: string;
    building_type: string;
    civil_parish: string;
    civil_parish_description: string;
    district: string;
    district_description: string;
    door_no: string;
    floor: string;
    gen_address_num: string;
    is_national: boolean;
    locality: string;
    municipality: string;
    municipality_description: string;
    place: string;
    postal_locality: string;
    raw_data: string;
    side: string;
    street_name: string;
    street_type: string;
    type: string;
    zip3: string;
    zip4: string;
    constructor(abbr_building_type: string, abbr_street_type: string, building_type: string, civil_parish: string, civil_parish_description: string, district: string, district_description: string, door_no: string, floor: string, gen_address_num: string, is_national: boolean, locality: string, municipality: string, municipality_description: string, place: string, postal_locality: string, raw_data: string, side: string, street_name: string, street_type: string, type: string, zip3: string, zip4: string);
}
declare class PtAddressResponse extends DataObjectResponse {
    data: PtAddressData;
    success: boolean;
    constructor(data: PtAddressData, success: boolean);
}
