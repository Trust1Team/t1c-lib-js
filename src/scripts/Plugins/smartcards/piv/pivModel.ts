/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, OptionalPin } from "../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";

interface AbstractPiv {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];

    // callback-based
    allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void;
    printedInformation(body: OptionalPin, callback: (error: RestException, data: PrintedInformationResponse) => void): void;
    facialImage(body: OptionalPin, callback: (error: RestException, data: FacialImageResponse) => void): void;
    allData(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], body: OptionalPin, callback: (error: RestException, data: AllCertsResponse) => void): void;
    authenticationCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void): void;
    signingCertificate(body: OptionalPin, callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;

    // promise-based
    // allAlgoRefsForAuthentication(): Promise<DataArrayResponse>;
    // allAlgoRefsForSigning(): Promise<DataArrayResponse>;
    // printedInformation(body: OptionalPin): Promise<PrintedInformationResponse>;
    // facialImage(body: OptionalPin): Promise<FacialImageResponse>;
    // allData(filters: string[], body: OptionalPin): Promise<AllDataResponse>;
    // allCerts(filters: string[], body: OptionalPin): Promise<AllCertsResponse>;
    // authenticationCertificate(body: OptionalPin): Promise<DataResponse>;
    // signingCertificate(body: OptionalPin): Promise<DataResponse>;
    // verifyPin(body: OptionalPin): Promise<T1CResponse>;
    // signData(body: AuthenticateOrSignData): Promise<DataResponse>;
    // authenticate(body: AuthenticateOrSignData): Promise<DataResponse>;
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        printed_information: PrintedInformation
        authentication_certificate: string
        signing_certificate: string
        facial_image: FacialImage
    }
}

interface PrintedInformationResponse extends T1CResponse {
    data: PrintedInformation
}

interface PrintedInformation {
    name: string
    employee_affiliation: string
    expiration_date: string
    agency_card_serial_number: string
    issuer_identification: string
    organization_affiliation_line_1: string
    organization_affiliation_line_2: string
}

interface FacialImageResponse extends T1CResponse {
    data: FacialImage
}

interface FacialImage {
    image: string
}

interface AllCertsResponse extends  T1CResponse {
    data: {
        authentication_certificate: string
        signing_certificate: string
    }
}

export { AbstractPiv, AllCertsResponse, AllDataResponse, PrintedInformationResponse, FacialImageResponse };
