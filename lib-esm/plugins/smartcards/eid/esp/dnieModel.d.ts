import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { OptionalPin, SecuredCertCard } from '../../Card';
import { CertificateResponse, DataObjectResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractDNIe extends SecuredCertCard {
    allData(filters: string[] | Options, body: OptionalPin, callback?: (error: RestException, data: DNIeAllDataResponse) => void): Promise<DNIeAllDataResponse>;
    allCerts(options: Options, body: OptionalPin, callback?: (error: RestException, data: DNIeAllCertsResponse) => void): Promise<DNIeAllCertsResponse>;
    info(callback?: (error: RestException, data: DNIeInfoResponse) => void): Promise<DNIeInfoResponse>;
    intermediateCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
export declare class DNIeAllCertsResponse extends DataObjectResponse {
    data: DNIeAllCerts;
    success: boolean;
    constructor(data: DNIeAllCerts, success: boolean);
}
export declare class DNIeAllCerts {
    authentication_certificate?: T1CCertificate;
    intermediate_certificate?: T1CCertificate;
    signing_certificate?: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, intermediate_certificate?: T1CCertificate, signing_certificate?: T1CCertificate);
}
export declare class DNIeAllDataResponse extends DNIeAllCertsResponse {
    data: DNIeAllData;
    success: boolean;
    constructor(data: DNIeAllData, success: boolean);
}
export declare class DNIeAllData {
    info?: DNIeInfo;
    authentication_certificate?: T1CCertificate;
    intermediate_certificate?: T1CCertificate;
    signing_certificate?: T1CCertificate;
    constructor(info?: DNIeInfo, authentication_certificate?: T1CCertificate, intermediate_certificate?: T1CCertificate, signing_certificate?: T1CCertificate);
}
export declare class DNIeInfoResponse extends DataObjectResponse {
    data: DNIeInfo;
    success: boolean;
    constructor(data: DNIeInfo, success: boolean);
}
export declare class DNIeInfo {
    first_name: string;
    last_names: string;
    national_number: string;
    card_number: string;
    serial: string;
    constructor(first_name: string, last_names: string, national_number: string, card_number: string, serial: string);
}
