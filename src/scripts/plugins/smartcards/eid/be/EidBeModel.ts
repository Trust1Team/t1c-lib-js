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

export { AbstractEidBE, BeidAddress, AddressResponse, BeidAllCertsResponse,
    BeidAllDataResponse, BeidRnData, BeidRnDataResponse, BeidAllData, BeidAllCerts, BeidTokenData, BeidTokenDataResponse };


interface AbstractEidBE extends CertCard {
    allData(filters: string[] | Options,
            callback?: (error: RestException, data: BeidAllDataResponse) => void): Promise<BeidAllDataResponse>;
    allCerts(filters: string[] | Options,
             callback?: (error: RestException, data: BeidAllCertsResponse) => void): Promise<BeidAllCertsResponse>;
    rnData(callback?: (error: RestException, data: BeidRnDataResponse) => void): Promise<BeidRnDataResponse>;
    tokenData(callback?: (error: RestException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;
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
    tokenData(callback?: (error: RestException, data: BeidTokenDataResponse) => void): Promise<BeidTokenDataResponse>;

}

class AddressResponse extends DataObjectResponse {
    constructor(public data: BeidAddress, public success: boolean) {
        super(data, success);
    }
}

class BeidAddress {
    constructor(public municipality: string,
                public raw_data: string,
                public signature: string,
                public street_and_number: string,
                public version: number,
                public zipcode: string) {}
}

class BeidAllCertsResponse extends DataObjectResponse {
    constructor(public data: BeidAllCerts, public success: boolean) {
        super(data, success);
    }
}

class BeidAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public citizen_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate,
                public rrn_certificate?: T1CCertificate) {}
}

class BeidAllDataResponse extends BeidAllCertsResponse {
    constructor(public data: BeidAllData, public success: boolean) {
        super(data, success);
    }
}

class BeidAllData {
    constructor(public address?: BeidAddress,
                public authentication_certificate?: T1CCertificate,
                public citizen_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public picture?: string,
                public rn?: BeidRnData,
                public root_certificate?: T1CCertificate,
                public rrn_certificate?: T1CCertificate,
                public token_data?: BeidTokenData) {}
}

class BeidTokenData {
    constructor(
        public eid_compliant?: number,
        public electrical_perso_interface_version?: number,
        public electrical_perso_version?: number,
        public graphical_perso_version?: number,
        public label?: string,
        public prn_generation?: string,
        public raw_data?: string,
        public serial_number?: string,
        public version?: number,
        public version_rfu?: number) {}
}

class BeidTokenDataResponse extends DataObjectResponse {
    constructor(public data: BeidTokenData, public success: boolean) {
        super(data, success);
    }
}


class BeidRnData {
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

class BeidRnDataResponse extends DataObjectResponse {
    constructor(public data: BeidRnData, public success: boolean) {
        super(data, success);
    }
}

