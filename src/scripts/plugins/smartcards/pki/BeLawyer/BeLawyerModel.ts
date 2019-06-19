/**
 * @author Maarten Somers
 * @since 2017
 */
import {AuthenticateOrSignData, Card, CertCard, VerifyPinData} from '../../Card';
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {CertificateResponse, DataObjectResponse, DataResponse, T1CResponse} from '../../../../core/service/CoreModel';
import {PinEnforcer} from '../../../../util/PinEnforcer';
import {Options, RequestHandler} from '../../../../util/RequestHandler';
import {LocalConnection} from '../../../../core/client/Connection';

export interface AbstractBeLawyer extends CertCard {
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[]| Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse>;
    personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticateMethods(callback?: (error: T1CLibException, data: AuthenticateDataResponse) => void): Promise<AuthenticateDataResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    verifyPin(body: VerifyPinRequest, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}

export class VerifyPinRequest {
    constructor(public os_dialog: boolean, public pinpad: boolean, public pin?: string) {
    }
}

export class BeLawyerPersonalInfo {
    constructor(public version: number, public lawyer_id: string, public name: string, public first_name: string, public part_of_cardnumber: string, public expiry_date: string, public country: string) {
    }
}

export class BeLawyerPersonalInfoResponse extends DataObjectResponse {
    constructor(public data: BeLawyerPersonalInfo, public success: boolean) {
        super(data, success);
    }
}

export class BeLawyerAllData {
    constructor(public personal_info?: BeLawyerPersonalInfo, public photo?: string, public authentication_certificate?: string, public issuer_certificate?: string, public signing_certificate?: string, public root_certificate?: string) {
    }
}

export class BeLawyerAllDataResponse extends DataObjectResponse {
    constructor(public data: BeLawyerAllData, public success: boolean) {
        super(data, success);
    }
}

export class BeLawyerAllCertificatesData {
    constructor(public authentication_certificate?: string, issuer_certificate?: string, signing_certificate?: string, root_certificate?: string) {
    }
}


export class BeLawyerAllCertificatesResponse extends DataObjectResponse {
    constructor(public data: BeLawyerAllCertificatesData, public success: boolean) {
        super(data, success);
    }
}

export class AuthenticateDataResponse extends DataObjectResponse {
    constructor(public data: Array<string>, public success: boolean) {
        super(data, success);
    }
}
//
// export class BeLawyerStatusResponse extends DataObjectResponse {
//     constructor(public data: { active: boolean }, public success: boolean) {
//         super(data, success);
//     }
// }

// export class BeLawyerCardIssuing {
//     constructor(public card_expiration_date?: string,
//                 public card_holder_birth_date?: string,
//                 public card_holder_end_date?: string,
//                 public card_holder_id?: string,
//                 public card_holder_name?: string,
//                 public card_holder_start_date?:  string,
//                 public card_revalidation_date?: string,
//                 public card_type?: number,
//                 public company_id?: number,
//                 public gender?: number,
//                 public language?: number,
//                 public version?: number) {}
// }
//
// export class VerifyPinRequest {
//     constructor(public os_dialog: boolean, public pinpad: boolean, public pin?: string) {
//     }
// }
//
// export class VerifyPinResponse {
//     constructor(public data: boolean, public success: boolean) {
//     }
// }
//
// export class BeLawyerCardIssuingResponse extends DataObjectResponse {
//     constructor(public data: BeLawyerCardIssuing, public success: boolean) {
//         super(data, success);
//     }
// }
//
// export class BeLawyerContract {
//     constructor(public authenticator_kvc?: number,
//                 public authenticator_value?: number,
//                 public journey_interchanges_allowed?: boolean,
//                 public passengers_max?: number,
//                 public period_journeys?: {
//                     max_number_of_trips?: number
//                     period?: number
//                 },
//                 public price_amount?: number,
//                 public provider?: number,
//                 public restrict_code?: number,
//                 public restrict_time?: number,
//                 public sale_date?: string,
//                 public sale_sam_count?: number,
//                 public sale_sam_id?: number,
//                 public spatials?: { type: number }[],
//                 public tariff?: {
//                     counter: {
//                         time?: string
//                         type?: number
//                     },
//                     multimodal?: boolean
//                     nameref?: number
//                 },
//                 public validity_duration?: {
//                     unit?: number
//                     value?: number
//                 },
//                 public validity_start_date?: string,
//                 public vehicle_class_allowed?: number,
//                 public version?: number) {}
// }
//
// export class BeLawyerContractsResponse extends DataArrayResponse {
//     constructor(public data: BeLawyerContract[], public success: boolean) {
//         super(data, success);
//     }
// }
