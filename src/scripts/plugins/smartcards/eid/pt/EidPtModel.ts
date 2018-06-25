/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, OptionalPin } from '../../Card';
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';

export interface AbstractEidPT extends CertCard {
    allData(filters: string[], callback?: (error: RestException, data: PtAllDataResponse) => void): Promise<PtAllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: PtAllCertsResponse) => void): Promise<PtAllCertsResponse>;
    idData(callback?: (error: RestException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    idDataWithOutPhoto(callback?: (error: RestException, data: PtIdDataResponse) => void): Promise<PtIdDataResponse>;
    address(data: OptionalPin, callback?: (error: RestException, data: PtAddressResponse) => void): Promise<PtAddressResponse>;
    photo(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootAuthenticationCertificate(options: Options,
                                  callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootNonRepudiationCertificate(options: Options,
                                  callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

export class PtAllCertsResponse extends DataObjectResponse {
    constructor(public data: PtAllCerts, public success: boolean) {
        super(data, success);
    }
}

export class PtAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_authentication_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate,
                public root_non_repudiation_certificate?: T1CCertificate) {}
}

export class PtAllDataResponse extends DataObjectResponse {
    constructor(public data: PtAllData, public success: boolean) {
        super(data, success);
    }
}

export class PtAllData {
    constructor(public id?: PtIdData,
                public authentication_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_authentication_certificate?: T1CCertificate,
                public root_certificate?: T1CCertificate,
                public root_non_repudiaton_certificate?: T1CCertificate) {}
}

export class PtIdData {
    constructor(public accidental_indications?: boolean,
                public civilian_number?: string,
                public country?: string,
                public date_of_birth?: string,
                public document_number?: string,
                public document_number_pan?: string,
                public document_type?: string,
                public document_version?: string,
                public gender?: string,
                public given_name_father?: string,
                public given_name_mother?: string,
                public health_no?: string,
                public height?: string,
                public issuing_entity?: string,
                public local_of_request?: string,
                public mrz1?: string,
                public mrz2?: string,
                public mrz3?: string,
                public name?: string,
                public nationality?: string,
                public raw_data?: string,
                public social_security_no?: string,
                public surname?: string,
                public surname_father?: string,
                public surname_mother?: string,
                public tax_no?: string,
                public validity_begin_date?: string,
                public validity_end_date?: string,
                public photo?: string) {}
}

export class PtIdDataResponse extends DataObjectResponse {
    constructor(public data: PtIdData, public success: boolean) {
        super(data, success);
    }
}

export class PtAddressData {
    constructor(public abbr_building_type?: string,
                public abbr_street_type?: string,
                public building_type?: string,
                public civil_parish?: string,
                public civil_parish_description?: string,
                public district?: string,
                public district_description?: string,
                public door_no?: string,
                public floor?: string,
                public gen_address_num?: string,
                public is_national?: boolean,
                public locality?: string,
                public municipality?: string,
                public municipality_description?: string,
                public place?: string,
                public postal_locality?: string,
                public raw_data?: string,
                public side?: string,
                public street_name?: string,
                public street_type?: string,
                public type?: string,
                public zip3?: string,
                public zip4?: string) {}
}

export class PtAddressResponse extends DataObjectResponse {
    constructor(public data: PtAddressData, public success: boolean) {
        super(data, success);
    }
}

