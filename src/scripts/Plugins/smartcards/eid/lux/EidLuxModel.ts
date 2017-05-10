/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { AuthenticateOrSignData, CertCard, OptionalPin } from "../../Card";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";

interface AbstractEidLUX extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void;
    biometric(callback: (error: RestException, data: BiometricResponse) => void): void;
    picture(callback: (error: RestException, data: PictureResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataArrayResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    nonRepudiationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    signatureImage(callback: (error: RestException, data: SignatureImageResponse) => void): void;
}

interface AllCertsResponse extends T1CResponse {
    data: {
        authentication_certificate: string
        non_repudiation_certificate: string
        root_certificates: string[]
    }
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        authentication_certificate: string
        non_repudiation_certificate: string
        root_certificates: string[]
        biometric: Biometric,
        picture: Picture
        signature_image: SignatureImage
        signature_object: string
    }
}

interface Biometric {
    "birthDate": string
    "documentNumber": string
    "documentType": string
    "firstName": string
    "gender": string
    "issuingState": string
    "lastName": string
    "nationality": string
    "validityEndDate": string
    "validityStartDate": string
}

interface BiometricResponse extends T1CResponse {
    data: Biometric
}

interface Picture {
    height: number
    image: string
    raw_data: string
    width: number
}

interface PictureResponse extends T1CResponse {
    data: Picture
}

interface SignatureImage {
    image: string
    raw_data: string
}

interface SignatureImageResponse extends T1CResponse {
    data: SignatureImage
}

export { AbstractEidLUX, AllCertsResponse, AllDataResponse, BiometricResponse, PictureResponse, SignatureImageResponse };
