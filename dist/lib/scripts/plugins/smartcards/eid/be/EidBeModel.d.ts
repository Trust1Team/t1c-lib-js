import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, OptionalPin } from '../../Card';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractEidBE extends CertCard {
    allData(filters: string[] | Options, callback?: (error: RestException, data: BeidAllDataResponse) => void): Promise<BeidAllDataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: RestException, data: BeidAllCertsResponse) => void): Promise<BeidAllCertsResponse>;
    rnData(callback?: (error: RestException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse>;
    tokenData(callback?: (error: RestException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
    address(callback?: (error: RestException, data: BeidAddressResponse) => void): Promise<BeidAddressResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    tokenData(callback?: (error: RestException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
}
export declare class BeidAddressResponse extends DataObjectResponse {
    data: BeidAddress;
    success: boolean;
    constructor(data: BeidAddress, success: boolean);
}
export declare class BeidAddress {
    municipality: string;
    raw_data: string;
    signature: string;
    street_and_number: string;
    version: number;
    zipcode: string;
    constructor(municipality: string, raw_data: string, signature: string, street_and_number: string, version: number, zipcode: string);
}
export declare class BeidAllCertsResponse extends DataObjectResponse {
    data: BeidAllCerts;
    success: boolean;
    constructor(data: BeidAllCerts, success: boolean);
}
export declare class BeidAllCerts {
    authentication_certificate: T1CCertificate;
    citizen_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_certificate: T1CCertificate;
    rrn_certificate: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, citizen_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_certificate?: T1CCertificate, rrn_certificate?: T1CCertificate);
}
export declare class BeidAllDataResponse extends BeidAllCertsResponse {
    data: BeidAllData;
    success: boolean;
    constructor(data: BeidAllData, success: boolean);
}
export declare class BeidAllData {
    address: BeidAddress;
    authentication_certificate: T1CCertificate;
    citizen_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    picture: string;
    rn: BeidRnData;
    root_certificate: T1CCertificate;
    rrn_certificate: T1CCertificate;
    token_data: BeidTokenData;
    constructor(address?: BeidAddress, authentication_certificate?: T1CCertificate, citizen_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, picture?: string, rn?: BeidRnData, root_certificate?: T1CCertificate, rrn_certificate?: T1CCertificate, token_data?: BeidTokenData);
}
export declare class BeidTokenData {
    eid_compliant: number;
    electrical_perso_interface_version: number;
    electrical_perso_version: number;
    graphical_perso_version: number;
    label: string;
    prn_generation: string;
    raw_data: string;
    serial_number: string;
    version: number;
    version_rfu: number;
    constructor(eid_compliant?: number, electrical_perso_interface_version?: number, electrical_perso_version?: number, graphical_perso_version?: number, label?: string, prn_generation?: string, raw_data?: string, serial_number?: string, version?: number, version_rfu?: number);
}
export declare class BeidTokenDataResponse extends DataObjectResponse {
    data: BeidTokenData;
    success: boolean;
    constructor(data: BeidTokenData, success: boolean);
}
export declare class BeidRnData {
    birth_date: string;
    birth_location: string;
    card_delivery_municipality: string;
    card_number: string;
    card_validity_date_begin: string;
    card_validity_date_end: string;
    chip_number: string;
    document_type: string;
    first_names: string;
    name: string;
    national_number: string;
    nationality: string;
    noble_condition: string;
    picture_hash: string;
    raw_data: string;
    sex: string;
    signature: string;
    special_status: string;
    third_name: string;
    version: number;
    constructor(birth_date: string, birth_location: string, card_delivery_municipality: string, card_number: string, card_validity_date_begin: string, card_validity_date_end: string, chip_number: string, document_type: string, first_names: string, name: string, national_number: string, nationality: string, noble_condition: string, picture_hash: string, raw_data: string, sex: string, signature: string, special_status: string, third_name: string, version: number);
}
export declare class BeidRnDataResponse extends DataObjectResponse {
    data: BeidRnData;
    success: boolean;
    constructor(data: BeidRnData, success: boolean);
}
