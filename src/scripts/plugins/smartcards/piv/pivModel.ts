/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../../core/exceptions/CoreExceptions';
import {GenericSecuredCertCard, OptionalPin, SecuredCertCard} from '../Card';
import {
    CertificateResponse, DataObjectResponse,
    T1CCertificate
} from '../../../core/service/CoreModel';
import { Options } from '../../../util/RequestHandler';

export { AbstractPiv, PivAllDataResponse, PivPrintedInformation, PivAllCertsResponse,
    PivPrintedInformationResponse, PivFacialImage, PivFacialImageResponse, PivAllCerts, PivAllData };


interface AbstractPiv extends SecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];

    // callback-based
    printedInformation(body: OptionalPin,
                       callback?: (error: RestException,
                                   data: PivPrintedInformationResponse) => void): Promise<PivPrintedInformationResponse>;
    facialImage(body: OptionalPin,
                callback?: (error: RestException, data: PivFacialImageResponse) => void): Promise<PivFacialImageResponse>;

    allData(filters: string[], body: OptionalPin,
            callback?: (error: RestException, data: PivAllDataResponse) => void): Promise<PivAllDataResponse>;

    allCerts(filters: string[], body: OptionalPin,
             callback?: (error: RestException, data: PivAllCertsResponse) => void): Promise<PivAllCertsResponse>;

    authenticationCertificate(body: OptionalPin,
                              options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    signingCertificate(body: OptionalPin,
                       options?: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

class PivPrintedInformationResponse extends DataObjectResponse {
    constructor(public data: PivPrintedInformation, public success: boolean) {
        super(data, success);
    }
}

class PivAllCertsResponse extends DataObjectResponse {
    constructor(public data: PivAllCerts, public success: boolean) {
        super(data, success);
    }
}

class PivPrintedInformation {
    constructor(public name: string,
                public employee_affiliation: string,
                public expiration_date: string,
                public agency_card_serial_number,
                public issuer_identification: string,
                public organization_affiliation_line_1: string,
                public organization_affiliation_line_2: string) {}
}

class PivFacialImageResponse extends DataObjectResponse {
    constructor(public data: PivFacialImage, public success: boolean) {
        super(data, success);
    }
}

class PivFacialImage {
    constructor(public image: string) {}
}

class PivAllCerts {
    constructor(public authentication_certificate?: T1CCertificate, public signing_certificate?: T1CCertificate) {}
}

class PivAllDataResponse extends DataObjectResponse {
    constructor(public data: PivAllData, public success: boolean) {
        super(data, success);
    }
}

class PivAllData {
    constructor(public printed_information?: PivPrintedInformation,
                public authentication_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate,
                public facial_image?: PivFacialImage) {}
}
