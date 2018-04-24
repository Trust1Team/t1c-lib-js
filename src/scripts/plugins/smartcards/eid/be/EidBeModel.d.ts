import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, OptionalPin } from '../../Card';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export { AbstractEidBE, Address, AddressResponse, AllCertsResponse, AllDataResponse, RnData, RnDataResponse, AllBeIDData, AllBeIDCerts };
interface AbstractEidBE extends CertCard {
    allData(filters: string[] | Options, callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rnData(callback?: (error: RestException, data: RnDataResponse) => void): Promise<RnDataResponse>;
    address(callback?: (error: RestException, data: AddressResponse) => void): Promise<AddressResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}
declare class AddressResponse extends DataObjectResponse {
    data: Address;
    success: boolean;
    constructor(data: Address, success: boolean);
}
declare class Address {
    municipality: string;
    raw_data: string;
    signature: string;
    street_and_number: string;
    version: number;
    zipcode: string;
    constructor(municipality: string, raw_data: string, signature: string, street_and_number: string, version: number, zipcode: string);
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllBeIDCerts;
    success: boolean;
    constructor(data: AllBeIDCerts, success: boolean);
}
declare class AllBeIDCerts {
    authentication_certificate: T1CCertificate;
    citizen_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_certificate: T1CCertificate;
    rrn_certificate: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, citizen_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_certificate?: T1CCertificate, rrn_certificate?: T1CCertificate);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllBeIDData;
    success: boolean;
    constructor(data: AllBeIDData, success: boolean);
}
declare class AllBeIDData {
    address: Address;
    authentication_certificate: T1CCertificate;
    citizen_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    picture: string;
    rn: RnData;
    root_certificate: T1CCertificate;
    rrn_certificate: T1CCertificate;
    constructor(address?: Address, authentication_certificate?: T1CCertificate, citizen_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, picture?: string, rn?: RnData, root_certificate?: T1CCertificate, rrn_certificate?: T1CCertificate);
}
declare class RnData {
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
declare class RnDataResponse extends DataObjectResponse {
    data: RnData;
    success: boolean;
    constructor(data: RnData, success: boolean);
}
