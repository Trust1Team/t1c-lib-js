import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, OptionalPin } from '../../Card';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractEidPT extends CertCard {
    allData(filters: string[], callback?: (error: T1CLibException, data: PtAllDataResponse) => void): Promise<PtAllDataResponse>;
    allCerts(filters: string[], callback?: (error: T1CLibException, data: PtAllCertsResponse) => void): Promise<PtAllCertsResponse>;
    idData(callback?: (error: T1CLibException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    idDataWithOutPhoto(callback?: (error: T1CLibException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    address(data: OptionalPin, callback?: (error: T1CLibException, data: PtAddressResponse) => void): Promise<PtAddressResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootAuthenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootNonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
export declare class PtAllCertsResponse extends DataObjectResponse {
    data: PtAllCerts;
    success: boolean;
    constructor(data: PtAllCerts, success: boolean);
}
export declare class PtAllCerts {
    authentication_certificate?: T1CCertificate;
    non_repudiation_certificate?: T1CCertificate;
    root_authentication_certificate?: T1CCertificate;
    root_certificate?: T1CCertificate;
    root_non_repudiation_certificate?: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_authentication_certificate?: T1CCertificate, root_certificate?: T1CCertificate, root_non_repudiation_certificate?: T1CCertificate);
}
export declare class PtAllDataResponse extends DataObjectResponse {
    data: PtAllData;
    success: boolean;
    constructor(data: PtAllData, success: boolean);
}
export declare class PtAllData {
    id?: PtIdData;
    authentication_certificate?: T1CCertificate;
    non_repudiation_certificate?: T1CCertificate;
    root_authentication_certificate?: T1CCertificate;
    root_certificate?: T1CCertificate;
    root_non_repudiaton_certificate?: T1CCertificate;
    constructor(id?: PtIdData, authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_authentication_certificate?: T1CCertificate, root_certificate?: T1CCertificate, root_non_repudiaton_certificate?: T1CCertificate);
}
export declare class PtIdData {
    accidental_indications?: boolean;
    civilian_number?: string;
    country?: string;
    date_of_birth?: string;
    document_number?: string;
    document_number_pan?: string;
    document_type?: string;
    document_version?: string;
    gender?: string;
    given_name_father?: string;
    given_name_mother?: string;
    health_no?: string;
    height?: string;
    issuing_entity?: string;
    local_of_request?: string;
    mrz1?: string;
    mrz2?: string;
    mrz3?: string;
    name?: string;
    nationality?: string;
    raw_data?: string;
    social_security_no?: string;
    surname?: string;
    surname_father?: string;
    surname_mother?: string;
    tax_no?: string;
    validity_begin_date?: string;
    validity_end_date?: string;
    photo?: string;
    constructor(accidental_indications?: boolean, civilian_number?: string, country?: string, date_of_birth?: string, document_number?: string, document_number_pan?: string, document_type?: string, document_version?: string, gender?: string, given_name_father?: string, given_name_mother?: string, health_no?: string, height?: string, issuing_entity?: string, local_of_request?: string, mrz1?: string, mrz2?: string, mrz3?: string, name?: string, nationality?: string, raw_data?: string, social_security_no?: string, surname?: string, surname_father?: string, surname_mother?: string, tax_no?: string, validity_begin_date?: string, validity_end_date?: string, photo?: string);
}
export declare class PtIdDataResponse extends DataObjectResponse {
    data: PtIdData;
    success: boolean;
    constructor(data: PtIdData, success: boolean);
}
export declare class PtAddressData {
    abbr_building_type?: string;
    abbr_street_type?: string;
    building_type?: string;
    civil_parish?: string;
    civil_parish_description?: string;
    district?: string;
    district_description?: string;
    door_no?: string;
    floor?: string;
    gen_address_num?: string;
    is_national?: boolean;
    locality?: string;
    municipality?: string;
    municipality_description?: string;
    place?: string;
    postal_locality?: string;
    raw_data?: string;
    side?: string;
    street_name?: string;
    street_type?: string;
    type?: string;
    zip3?: string;
    zip4?: string;
    constructor(abbr_building_type?: string, abbr_street_type?: string, building_type?: string, civil_parish?: string, civil_parish_description?: string, district?: string, district_description?: string, door_no?: string, floor?: string, gen_address_num?: string, is_national?: boolean, locality?: string, municipality?: string, municipality_description?: string, place?: string, postal_locality?: string, raw_data?: string, side?: string, street_name?: string, street_type?: string, type?: string, zip3?: string, zip4?: string);
}
export declare class PtAddressResponse extends DataObjectResponse {
    data: PtAddressData;
    success: boolean;
    constructor(data: PtAddressData, success: boolean);
}
