/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import {
    CertificateResponse, CertificatesResponse, DataObjectResponse, T1CCertificate,
    T1CResponse
} from '../../../../core/service/CoreModel';
import { Options } from "../../../../util/RequestHandler";

export { AbstractEidLUX, AllCertsResponse, AllDataResponse, Biometric, BiometricResponse,
    Picture, PictureResponse, SignatureImage, SignatureImageResponse, AllLuxData, AllLuxCerts };


interface AbstractEidLUX extends SecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(options?: string[] | Options, callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(options?: string[] | Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>
    biometric(callback?: (error: RestException, data: BiometricResponse) => void): Promise<BiometricResponse>;
    picture(callback?: (error: RestException, data: PictureResponse) => void): Promise<PictureResponse>;
    rootCertificate(options?: Options,
                    callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    authenticationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signatureImage(callback?: (error: RestException, data: SignatureImageResponse) => void): Promise<SignatureImageResponse>;
}

class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllLuxCerts, public success: boolean) {
        super(data, success);
    }
}

class AllLuxCerts {
    constructor(public authentication_certificate: T1CCertificate,
                public non_repudiation_certificate: T1CCertificate,
                public root_certificates: T1CCertificate[]) {}
}

class AllDataResponse extends AllCertsResponse {
    constructor(public data: AllLuxData, public success: boolean) {
        super(data, success);
    }
}

class AllLuxData extends AllLuxCerts {
    constructor(public authentication_certificate: T1CCertificate,
                public non_repudiation_certificate: T1CCertificate,
                public root_certificates: T1CCertificate[],
                public biometric: Biometric,
                public picture: Picture,
                public signature_image: SignatureImage,
                public signature_object: string) {
        super(authentication_certificate, non_repudiation_certificate, root_certificates);
    }
}

class Biometric {
    constructor(public birthData: string,
                public documentNumber: string,
                public documentType: string,
                public firstName: string,
                public gender: string,
                public issuingState: string,
                public lastName: string,
                public nationality: string,
                public validityEndData: string,
                public validityStartData: string) {}
}

class BiometricResponse extends DataObjectResponse {
    constructor(public data: Biometric, public success: boolean) {
        super(data, success);
    }
}

class Picture {
    constructor(public height: number,
                public width: number,
                public image: string,
                public raw_data: string) {}
}

class PictureResponse extends DataObjectResponse {
    constructor(public data: Picture, public success: boolean) {
        super(data, success);
    }
}

class SignatureImage {
    constructor(public image: string, public raw_data: string) {}
}

class SignatureImageResponse extends DataObjectResponse {
    constructor(public data: SignatureImage, public success: boolean) {
        super(data, success);
    }
}
