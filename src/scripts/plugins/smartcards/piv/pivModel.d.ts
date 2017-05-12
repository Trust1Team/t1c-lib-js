import { RestException } from "../../../core/exceptions/CoreExceptions";
import { GenericSecuredCertCard, OptionalPin } from "../Card";
import { DataObjectResponse, DataResponse } from "../../../core/service/CoreModel";
export { AbstractPiv, AllCertsResponse, AllDataResponse, PrintedInformation, PrintedInformationResponse, FacialImage, FacialImageResponse };
interface AbstractPiv extends GenericSecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    printedInformation(body: OptionalPin, callback?: (error: RestException, data: PrintedInformationResponse) => void): void | Promise<PrintedInformationResponse>;
    facialImage(body: OptionalPin, callback?: (error: RestException, data: FacialImageResponse) => void): void | Promise<FacialImageResponse>;
    allData(filters: string[], body: OptionalPin, callback?: (error: RestException, data: AllDataResponse) => void): void | Promise<AllDataResponse>;
    allCerts(filters: string[], body: OptionalPin, callback?: (error: RestException, data: AllCertsResponse) => void): void | Promise<AllCertsResponse>;
    authenticationCertificate(body: OptionalPin, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    signingCertificate(body: OptionalPin, callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
}
interface AllDataResponse extends AllCertsResponse {
    data: {
        printed_information: PrintedInformation;
        authentication_certificate: string;
        signing_certificate: string;
        facial_image: FacialImage;
    };
}
interface PrintedInformationResponse extends DataObjectResponse {
    data: PrintedInformation;
}
interface PrintedInformation {
    name: string;
    employee_affiliation: string;
    expiration_date: string;
    agency_card_serial_number: string;
    issuer_identification: string;
    organization_affiliation_line_1: string;
    organization_affiliation_line_2: string;
}
interface FacialImageResponse extends DataObjectResponse {
    data: FacialImage;
}
interface FacialImage {
    image: string;
}
interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate: string;
        signing_certificate: string;
    };
}
