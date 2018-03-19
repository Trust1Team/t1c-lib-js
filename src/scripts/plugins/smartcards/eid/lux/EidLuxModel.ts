/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import {
    CertificateResponse, CertificatesResponse, T1CCertificate,
    T1CResponse
} from "../../../../core/service/CoreModel";
import { Options } from "../../../../util/RequestHandler";
import * as Bluebird from 'bluebird';

export { AbstractEidLUX, AllCertsResponse, AllDataResponse, Biometric, BiometricResponse,
    Picture, PictureResponse, SignatureImage, SignatureImageResponse };


interface AbstractEidLUX extends SecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(options?: string[] | Options, callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    allCerts(options?: string[] | Options, callback?: (error: RestException, data: AllCertsResponse) => void): Bluebird<AllCertsResponse>
    biometric(callback?: (error: RestException, data: BiometricResponse) => void): Bluebird<BiometricResponse>;
    picture(callback?: (error: RestException, data: PictureResponse) => void): Bluebird<PictureResponse>;
    rootCertificate(options?: Options,
                    callback?: (error: RestException, data: CertificatesResponse) => void): Bluebird<CertificatesResponse>;
    authenticationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    nonRepudiationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    signatureImage(callback?: (error: RestException, data: SignatureImageResponse) => void): Bluebird<SignatureImageResponse>;
}

interface AllCertsResponse extends T1CResponse {
    data: {
        authentication_certificate: T1CCertificate
        non_repudiation_certificate: T1CCertificate
        root_certificates: T1CCertificate[]
    }
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        authentication_certificate: T1CCertificate
        non_repudiation_certificate: T1CCertificate
        root_certificates: T1CCertificate[]
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
