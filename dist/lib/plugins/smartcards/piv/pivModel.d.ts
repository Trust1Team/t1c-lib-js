import { RestException } from '../../../core/exceptions/CoreExceptions';
import { OptionalPin, SecuredCertCard } from '../Card';
import { CertificateResponse, DataObjectResponse, T1CCertificate } from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';
export interface AbstractPiv extends SecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback?: (error: RestException, data: PivPrintedInformationResponse) => void): Promise<PivPrintedInformationResponse>;
    facialImage(body: OptionalPin, callback?: (error: RestException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse>;
    allData(filters: string[], body: OptionalPin, callback?: (error: RestException, data: PivAllDataResponse) => void): Promise<PivAllDataResponse>;
    allCerts(filters: string[], body: OptionalPin, callback?: (error: RestException, data: PivAllCertsResponse) => void): Promise<PivAllCertsResponse>;
    authenticationCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
export declare class PivPrintedInformationResponse extends DataObjectResponse {
    data: PivPrintedInformation;
    success: boolean;
    constructor(data: PivPrintedInformation, success: boolean);
}
export declare class PivAllCertsResponse extends DataObjectResponse {
    data: PivAllCerts;
    success: boolean;
    constructor(data: PivAllCerts, success: boolean);
}
export declare class PivPrintedInformation {
    name: string;
    employee_affiliation: string;
    expiration_date: string;
    agency_card_serial_number: any;
    issuer_identification: string;
    organization_affiliation_line_1: string;
    organization_affiliation_line_2: string;
    constructor(name: string, employee_affiliation: string, expiration_date: string, agency_card_serial_number: any, issuer_identification: string, organization_affiliation_line_1: string, organization_affiliation_line_2: string);
}
export declare class PivFacialImageResponse extends DataObjectResponse {
    data: PivFacialImage;
    success: boolean;
    constructor(data: PivFacialImage, success: boolean);
}
export declare class PivFacialImage {
    image: string;
    constructor(image: string);
}
export declare class PivAllCerts {
    authentication_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, signing_certificate?: T1CCertificate);
}
export declare class PivAllDataResponse extends DataObjectResponse {
    data: PivAllData;
    success: boolean;
    constructor(data: PivAllData, success: boolean);
}
export declare class PivAllData {
    printed_information: PivPrintedInformation;
    authentication_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    facial_image: PivFacialImage;
    constructor(printed_information?: PivPrintedInformation, authentication_certificate?: T1CCertificate, signing_certificate?: T1CCertificate, facial_image?: PivFacialImage);
}
