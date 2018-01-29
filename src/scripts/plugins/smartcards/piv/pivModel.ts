/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { GenericSecuredCertCard, OptionalPin } from '../Card';
import {
    CertificateResponse, DataObjectResponse,
    T1CCertificate
} from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';

export { AbstractPiv, AllCertsResponse, AllDataResponse, PrintedInformation,
    PrintedInformationResponse, FacialImage, FacialImageResponse, AllPivCerts, AllPivData };


interface AbstractPiv extends GenericSecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];

    // callback-based
    printedInformation(body: OptionalPin,
                       callback?: (error: RestException,
                                   data: PrintedInformationResponse) => void): Promise<PrintedInformationResponse>;
    facialImage(body: OptionalPin,
                callback?: (error: RestException, data: FacialImageResponse) => void): Promise<FacialImageResponse>;

    allData(filters: string[], body: OptionalPin,
            callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;

    allCerts(filters: string[], body: OptionalPin,
             callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;

    authenticationCertificate(body: OptionalPin,
                              options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    signingCertificate(body: OptionalPin,
                       options?: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

class PrintedInformationResponse extends DataObjectResponse {
    constructor(public data: PrintedInformation, public success: boolean) {
        super(data, success);
    }
}

class PrintedInformation {
    constructor(public name: string,
                public employee_affiliation: string,
                public expiration_date: string,
                public agency_card_serial_number,
                public issuer_identification: string,
                public organization_affiliation_line_1: string,
                public organization_affiliation_line_2: string) {}
}

class FacialImageResponse extends DataObjectResponse {
    constructor(public data: FacialImage, public success: boolean) {
        super(data, success);
    }
}

class FacialImage {
    constructor(public image: string) {}
}

class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllPivCerts, public success: boolean) {
        super(data, success);
    }
}

class AllPivCerts {
    constructor(public authentication_certificate: T1CCertificate, public signing_certificate: T1CCertificate) {}
}

class AllDataResponse extends AllCertsResponse {
    constructor(public data: AllPivData, public success: boolean) {
        super(data, success);
    }
}

class AllPivData {
    constructor(public printed_information: PrintedInformation,
                public authentication_certificate: T1CCertificate,
                public signing_certificate: T1CCertificate,
                public facial_image: FacialImage) {}
}
