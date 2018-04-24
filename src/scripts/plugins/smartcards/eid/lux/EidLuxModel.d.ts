import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { SecuredCertCard } from "../../Card";
import { CertificateResponse, CertificatesResponse, DataObjectResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { Options } from "../../../../util/RequestHandler";
export { AbstractEidLUX, AllCertsResponse, AllDataResponse, Biometric, BiometricResponse, Picture, PictureResponse, SignatureImage, SignatureImageResponse, AllLuxData, AllLuxCerts };
interface AbstractEidLUX extends SecuredCertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(options?: string[] | Options, callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(options?: string[] | Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    biometric(callback?: (error: RestException, data: BiometricResponse) => void): Promise<BiometricResponse>;
    picture(callback?: (error: RestException, data: PictureResponse) => void): Promise<PictureResponse>;
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signatureImage(callback?: (error: RestException, data: SignatureImageResponse) => void): Promise<SignatureImageResponse>;
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllLuxCerts;
    success: boolean;
    constructor(data: AllLuxCerts, success: boolean);
}
declare class AllLuxCerts {
    authentication_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_certificates: T1CCertificate[];
    constructor(authentication_certificate: T1CCertificate, non_repudiation_certificate: T1CCertificate, root_certificates: T1CCertificate[]);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllLuxData;
    success: boolean;
    constructor(data: AllLuxData, success: boolean);
}
declare class AllLuxData extends AllLuxCerts {
    authentication_certificate: T1CCertificate;
    non_repudiation_certificate: T1CCertificate;
    root_certificates: T1CCertificate[];
    biometric: Biometric;
    picture: Picture;
    signature_image: SignatureImage;
    signature_object: string;
    constructor(authentication_certificate: T1CCertificate, non_repudiation_certificate: T1CCertificate, root_certificates: T1CCertificate[], biometric: Biometric, picture: Picture, signature_image: SignatureImage, signature_object: string);
}
declare class Biometric {
    birthData: string;
    documentNumber: string;
    documentType: string;
    firstName: string;
    gender: string;
    issuingState: string;
    lastName: string;
    nationality: string;
    validityEndData: string;
    validityStartData: string;
    constructor(birthData: string, documentNumber: string, documentType: string, firstName: string, gender: string, issuingState: string, lastName: string, nationality: string, validityEndData: string, validityStartData: string);
}
declare class BiometricResponse extends DataObjectResponse {
    data: Biometric;
    success: boolean;
    constructor(data: Biometric, success: boolean);
}
declare class Picture {
    height: number;
    width: number;
    image: string;
    raw_data: string;
    constructor(height: number, width: number, image: string, raw_data: string);
}
declare class PictureResponse extends DataObjectResponse {
    data: Picture;
    success: boolean;
    constructor(data: Picture, success: boolean);
}
declare class SignatureImage {
    image: string;
    raw_data: string;
    constructor(image: string, raw_data: string);
}
declare class SignatureImageResponse extends DataObjectResponse {
    data: SignatureImage;
    success: boolean;
    constructor(data: SignatureImage, success: boolean);
}
