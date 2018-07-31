import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertCard, PinTryCounterData } from '../../Card';
import { CertificateResponse, CertificatesResponse, DataObjectResponse, T1CCertificate, T1CResponse } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractEidLUX extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allData(options?: string[] | Options, callback?: (error: T1CLibException, data: LuxAllDataResponse) => void): Promise<LuxAllDataResponse>;
    allCerts(options?: string[] | Options, callback?: (error: T1CLibException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    biometric(callback?: (error: T1CLibException, data: LuxidBiometricResponse) => void): Promise<LuxidBiometricResponse>;
    picture(callback?: (error: T1CLibException, data: LuxidPictureResponse) => void): Promise<LuxidPictureResponse>;
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signatureImage(callback?: (error: T1CLibException, data: LuxidSignatureImageResponse) => void): Promise<LuxidSignatureImageResponse>;
    pinTryCounter(pin_reference: PinTryCounterData, callback?: (error: T1CLibException, data: LuxPinTryCounterResponse) => void): Promise<LuxPinTryCounterResponse>;
    pinReset(body: LuxPinResetData, callback?: (error: T1CLibException, data: T1CResponse) => void | Promise<T1CResponse>): any;
    pinChange(body: LuxPinChangeData, callback?: (error: T1CLibException, data: T1CResponse) => void | Promise<T1CResponse>): any;
    pinUnblock(body: LuxPinUnblockData, callback?: (error: T1CLibException, data: T1CResponse) => void | Promise<T1CResponse>): any;
}
export declare class PinType {
    static PIN: string;
    static CAN: string;
}
export declare class AllCertsResponse extends DataObjectResponse {
    data: LuxidAllCerts;
    success: boolean;
    constructor(data: LuxidAllCerts, success: boolean);
}
export declare class LuxidAllCerts {
    authentication_certificate?: T1CCertificate;
    non_repudiation_certificate?: T1CCertificate;
    root_certificates?: T1CCertificate[];
    constructor(authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_certificates?: T1CCertificate[]);
}
export declare class LuxAllDataResponse extends AllCertsResponse {
    data: LuxidAllData;
    success: boolean;
    constructor(data: LuxidAllData, success: boolean);
}
export declare class LuxPinTryCounterResponse extends T1CResponse {
    data: number;
    success: boolean;
    constructor(data: number, success: boolean);
}
export declare class LuxidAllData extends LuxidAllCerts {
    authentication_certificate?: T1CCertificate;
    non_repudiation_certificate?: T1CCertificate;
    root_certificates?: T1CCertificate[];
    biometric?: LuxidBiometric;
    picture?: LuxidPicture;
    signature_image?: LuxidSignatureImage;
    signature_object?: string;
    constructor(authentication_certificate?: T1CCertificate, non_repudiation_certificate?: T1CCertificate, root_certificates?: T1CCertificate[], biometric?: LuxidBiometric, picture?: LuxidPicture, signature_image?: LuxidSignatureImage, signature_object?: string);
}
export declare class LuxidBiometric {
    birthData?: string;
    documentNumber?: string;
    documentType?: string;
    firstName?: string;
    gender?: string;
    issuingState?: string;
    lastName?: string;
    nationality?: string;
    validityEndData?: string;
    validityStartData?: string;
    constructor(birthData?: string, documentNumber?: string, documentType?: string, firstName?: string, gender?: string, issuingState?: string, lastName?: string, nationality?: string, validityEndData?: string, validityStartData?: string);
}
export declare class LuxidBiometricResponse extends DataObjectResponse {
    data: LuxidBiometric;
    success: boolean;
    constructor(data: LuxidBiometric, success: boolean);
}
export declare class LuxidPicture {
    height: number;
    width: number;
    image: string;
    raw_data: string;
    constructor(height: number, width: number, image: string, raw_data: string);
}
export declare class LuxidPictureResponse extends DataObjectResponse {
    data: LuxidPicture;
    success: boolean;
    constructor(data: LuxidPicture, success: boolean);
}
export declare class LuxidSignatureImage {
    image: string;
    raw_data: string;
    constructor(image: string, raw_data: string);
}
export declare class LuxidSignatureImageResponse extends DataObjectResponse {
    data: LuxidSignatureImage;
    success: boolean;
    constructor(data: LuxidSignatureImage, success: boolean);
}
export declare class LuxPinResetData {
    os_dialog: boolean;
    puk: string;
    pin: string;
    reset_only?: boolean;
    constructor(os_dialog: boolean, puk: string, pin: string, reset_only?: boolean);
}
export declare class LuxPinUnblockData {
    os_dialog: boolean;
    puk: string;
    reset_only?: boolean;
    constructor(os_dialog: boolean, puk: string, reset_only?: boolean);
}
export declare class LuxPinChangeData {
    os_dialog: boolean;
    old_pin: string;
    new_pin: string;
    constructor(os_dialog: boolean, old_pin: string, new_pin: string);
}
