/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertCard } from "../../Card";
import { CertificateResponse, DataObjectResponse, DataResponse, T1CCertificate } from "../../../../core/service/CoreModel";

export { AbstractEidPT, AllCertsResponse, AllDataResponse, IdDataResponse };


interface AbstractEidPT extends CertCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    idData(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse>;
    idDataWithOutPhoto(callback?: (error: RestException, data: IdDataResponse) => void): Promise<IdDataResponse>;
    photo(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    rootCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootAuthenticationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    rootNonRepudiationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate?: T1CCertificate
        non_repudiation_certificate?: T1CCertificate
        root_authentication_certificate?: T1CCertificate
        root_certificate?: T1CCertificate
        root_non_repudiation_certificate?: T1CCertificate
    }
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        id?: IdData
        authentication_certificate?: T1CCertificate
        non_repudiation_certificate?: T1CCertificate
        root_authentication_certificate?: T1CCertificate
        root_certificate?: T1CCertificate
        root_non_repudiation_certificate?: T1CCertificate
    }
}

interface IdData {
    accidental_indications: string,
    civilian_number: string,
    country: string,
    date_of_birth: string,
    document_number: string,
    document_number_pan: string,
    document_type: string,
    document_version: string,
    gender: string,
    given_name_father: string,
    given_name_mother: string,
    health_no: string,
    height: string,
    issuing_entity: string,
    local_of_request: string,
    mrz1: string,
    mrz2: string,
    mrz3: string,
    name: string,
    nationality: string,
    photo?: string,
    raw_data: string,
    social_security_no: string,
    surname: string,
    surname_father: string,
    surname_mother: string,
    tax_no: string,
    validity_begin_date: string,
    validity_end_date: string
}

interface IdDataResponse extends DataObjectResponse {
    data: IdData
}

