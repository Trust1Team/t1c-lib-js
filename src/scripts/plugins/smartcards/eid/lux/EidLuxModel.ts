/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import { CertificateResponse, CertificatesResponse, T1CResponse } from "../../../../core/service/CoreModel";

export { AbstractEidLUX, AllCertsResponse, AllDataResponse, Biometric, BiometricResponse,
    Picture, PictureResponse, SignatureImage, SignatureImageResponse };


interface AbstractEidLUX extends SecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    biometric(body: OptionalPin, callback?: (error: RestException, data: BiometricResponse) => void): Promise<BiometricResponse>;
    picture(body: OptionalPin, callback?: (error: RestException, data: PictureResponse) => void): Promise<PictureResponse>;
    rootCertificate(body: OptionalPin,
                    callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    authenticationCertificate(body: OptionalPin,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(body: OptionalPin,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signatureImage(body: OptionalPin,
                   callback?: (error: RestException, data: SignatureImageResponse) => void): Promise<SignatureImageResponse>;
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
