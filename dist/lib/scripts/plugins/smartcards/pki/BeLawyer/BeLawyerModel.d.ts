import { AuthenticateOrSignData, CertCard } from '../../Card';
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { DataObjectResponse, DataResponse } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
export interface AbstractBeLawyer extends CertCard {
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse>;
    personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticateMethods(callback?: (error: T1CLibException, data: AuthenticateDataResponse) => void): Promise<AuthenticateDataResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    verifyPin(body: VerifyPinRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
export declare class VerifyPinRequest {
    os_dialog: boolean;
    pinpad: boolean;
    pin?: string;
    constructor(os_dialog: boolean, pinpad: boolean, pin?: string);
}
export declare class BeLawyerPersonalInfo {
    version: number;
    lawyer_id: string;
    name: string;
    first_name: string;
    part_of_cardnumber: string;
    expiry_date: string;
    country: string;
    constructor(version: number, lawyer_id: string, name: string, first_name: string, part_of_cardnumber: string, expiry_date: string, country: string);
}
export declare class BeLawyerPersonalInfoResponse extends DataObjectResponse {
    data: BeLawyerPersonalInfo;
    success: boolean;
    constructor(data: BeLawyerPersonalInfo, success: boolean);
}
export declare class BeLawyerAllData {
    personal_info?: BeLawyerPersonalInfo;
    photo?: string;
    authentication_certificate?: string;
    issuer_certificate?: string;
    signing_certificate?: string;
    root_certificate?: string;
    constructor(personal_info?: BeLawyerPersonalInfo, photo?: string, authentication_certificate?: string, issuer_certificate?: string, signing_certificate?: string, root_certificate?: string);
}
export declare class BeLawyerAllDataResponse extends DataObjectResponse {
    data: BeLawyerAllData;
    success: boolean;
    constructor(data: BeLawyerAllData, success: boolean);
}
export declare class BeLawyerAllCertificatesData {
    authentication_certificate?: string;
    constructor(authentication_certificate?: string, issuer_certificate?: string, signing_certificate?: string, root_certificate?: string);
}
export declare class BeLawyerAllCertificatesResponse extends DataObjectResponse {
    data: BeLawyerAllCertificatesData;
    success: boolean;
    constructor(data: BeLawyerAllCertificatesData, success: boolean);
}
export declare class AuthenticateDataResponse extends DataObjectResponse {
    data: Array<string>;
    success: boolean;
    constructor(data: Array<string>, success: boolean);
}
