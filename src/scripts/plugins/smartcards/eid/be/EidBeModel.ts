/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, OptionalPin } from '../../Card';
import {
    CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate,
    T1CResponse
} from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';

export { AbstractEidBE, Address, AddressResponse, AllCertsResponse,
    AllDataResponse, RnData, RnDataResponse, AllBeIDData, AllBeIDCerts };


interface AbstractEidBE extends CertCard {
    allData(filters: string[] | Options,
            callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[] | Options,
             callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rnData(callback?: (error: RestException, data: RnDataResponse) => void): Promise<RnDataResponse>;
    address(callback?: (error: RestException, data: AddressResponse) => void): Promise<AddressResponse>;
    picture(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    citizenCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse)
        => void): Promise<CertificateResponse>;
    rrnCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: OptionalPin, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}

class AddressResponse extends DataObjectResponse {
    constructor(public data: Address, public success: boolean) {
        super(data, success);
    }
}

class Address {
    constructor(public municipality: string,
                public raw_data: string,
                public signature: string,
                public street_and_number: string,
                public version: number,
                public zipcode: string) {}
}

class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllBeIDCerts, public success: boolean) {
        super(data, success);
    }
}

class AllBeIDCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public citizen_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate,
                public rrn_certificate?: T1CCertificate) {}
}

class AllDataResponse extends AllCertsResponse {
    constructor(public data: AllBeIDData, public success: boolean) {
        super(data, success);
    }
}

class AllBeIDData {
    constructor(public address?: Address,
                public authentication_certificate?: T1CCertificate,
                public citizen_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public picture?: string,
                public rn?: RnData,
                public root_certificate?: T1CCertificate,
                public rrn_certificate?: T1CCertificate) {}
}

class RnData {
    constructor(public birth_date: string,
                public birth_location: string,
                public card_delivery_municipality: string,
                public card_number: string,
                public card_validity_date_begin: string,
                public card_validity_date_end: string,
                public chip_number: string,
                public document_type: string,
                public first_names: string,
                public name: string,
                public national_number: string,
                public nationality: string,
                public noble_condition: string,
                public picture_hash: string,
                public raw_data: string,
                public sex: string,
                public signature: string,
                public special_status: string,
                public third_name: string,
                public version: number) {}
}

class RnDataResponse extends DataObjectResponse {
    constructor(public data: RnData, public success: boolean) {
        super(data, success);
    }
}

