/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertCard, OptionalPin } from "../../Card";
import {
    CertificateResponse, DataObjectResponse, DataResponse,
    T1CResponse
} from "../../../../core/service/CoreModel";
import { Options } from "../../../../util/RequestHandler";
import * as Bluebird from 'bluebird';

export { AbstractEidBE, Address, AddressResponse, AllCertsResponse, AllDataResponse, RnData, RnDataResponse };


interface AbstractEidBE extends CertCard {
    allData(filters: string[] | Options,
            callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    allCerts(filters: string[] | Options,
             callback?: (error: RestException, data: AllCertsResponse) => void): Bluebird<AllCertsResponse>;
    rnData(callback?: (error: RestException, data: RnDataResponse) => void): Bluebird<RnDataResponse>;
    address(callback?: (error: RestException, data: AddressResponse) => void): Bluebird<AddressResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Bluebird<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Bluebird<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Bluebird<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Bluebird<T1CResponse>;
}

interface AddressResponse extends DataObjectResponse {
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

interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate?: string
        citizen_certificate?: string
        non_repudiation_certificate?: string
        root_certificate?: string
        rrn_certificate?: string
    }
}

interface AllDataResponse extends AllCertsResponse {
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

interface RnDataResponse extends DataObjectResponse {
    data: RnData
}

