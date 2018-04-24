import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import { CertificateResponse, DataObjectResponse, T1CCertificate } from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';
export { AbstractPiv, AllCertsResponse, AllDataResponse, PrintedInformation, PrintedInformationResponse, FacialImage, FacialImageResponse, AllPivCerts, AllPivData };
interface AbstractPiv extends GenericSecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback?: (error: RestException, data: PrintedInformationResponse) => void): Promise<PrintedInformationResponse>;
    facialImage(body: OptionalPin, callback?: (error: RestException, data: FacialImageResponse) => void): Promise<FacialImageResponse>;
    allData(filters: string[], body: OptionalPin, callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], body: OptionalPin, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    authenticationCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(body: OptionalPin, options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
declare class PrintedInformationResponse extends DataObjectResponse {
    data: PrintedInformation;
    success: boolean;
    constructor(data: PrintedInformation, success: boolean);
}
declare class PrintedInformation {
    name: string;
    employee_affiliation: string;
    expiration_date: string;
    agency_card_serial_number: any;
    issuer_identification: string;
    organization_affiliation_line_1: string;
    organization_affiliation_line_2: string;
    constructor(name: string, employee_affiliation: string, expiration_date: string, agency_card_serial_number: any, issuer_identification: string, organization_affiliation_line_1: string, organization_affiliation_line_2: string);
}
declare class FacialImageResponse extends DataObjectResponse {
    data: FacialImage;
    success: boolean;
    constructor(data: FacialImage, success: boolean);
}
declare class FacialImage {
    image: string;
    constructor(image: string);
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllPivCerts;
    success: boolean;
    constructor(data: AllPivCerts, success: boolean);
}
declare class AllPivCerts {
    authentication_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    constructor(authentication_certificate: T1CCertificate, signing_certificate: T1CCertificate);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllPivData;
    success: boolean;
    constructor(data: AllPivData, success: boolean);
}
declare class AllPivData {
    printed_information: PrintedInformation;
    authentication_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    facial_image: FacialImage;
    constructor(printed_information: PrintedInformation, authentication_certificate: T1CCertificate, signing_certificate: T1CCertificate, facial_image: FacialImage);
}
