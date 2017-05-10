/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, CertCard, OptionalPin } from "../../Card";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";

interface AbstractEidBE extends CertCard {
    // callback-based
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void;
    rnData(callback: (error: RestException, data: RnDataResponse) => void): void;
    address(callback: (error: RestException, data: AddressResponse) => void): void;
    picture(callback: (error: RestException, data: DataResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    citizenCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    rrnCertificate(callback: (error: RestException, data: DataResponse) => void): void;


    // promise-based
    // allData(filters: string[]): Promise<AllDataResponse>;
    // allCerts(filters: string[]): Promise<AllCertsResponse>;
    // rnData(): Promise<RnDataResponse>;
    // address(): Promise<AddressResponse>;
    // picture(): Promise<DataResponse>;
    // rootCertificate(): Promise<DataResponse>;
    // citizenCertificate(): Promise<DataResponse>;
    // authenticationCertificate(): Promise<DataResponse>;
    // nonRepudiationCertificate(): Promise<DataResponse>;
    // rrnCertificate(): Promise<DataResponse>;
}

interface AddressResponse extends T1CResponse {
    data: Address
}

interface Address {
    municipality: string
    raw_data: string
    signature: string
    street_and_number: string
    version: number
    zipcode: string
}

interface AllCertsResponse extends T1CResponse {
    data: {
        authentication_certificate?: string
        citizen_certificate?: string
        non_repudiation_certificate?: string
        root_certificate?: string
        rrn_certificate?: string
    }
}

interface AllDataResponse extends T1CResponse {
    data: {
        address?: Address
        authentication_certificate?: string
        citizen_certificate?: string
        non_repudiation_certificate?: string
        picture?: string
        rn?: RnData
        root_certificate?: string
        rrn_certificate?: string
    }
}

interface RnData {
    birth_date: string
    birth_location: string
    card_delivery_municipality: string
    card_number: string
    card_validity_date_begin: string
    card_validity_date_end: string
    chip_number: string
    document_type: string
    first_names: string
    name: string
    national_number: string
    nationality: string
    noble_condition: string
    picture_hash: string
    raw_data: string
    sex: string
    signature: string
    special_status: string
    third_name: string
    version: number
}

interface RnDataResponse extends T1CResponse {
    data: RnData
}

export { AbstractEidBE, AddressResponse, AllCertsResponse, AllDataResponse, RnDataResponse };
