/**
 * @author Maarten Somers
 * @since 2017
 */

import { CertCard } from '../../Card';
import { DataResponse, DataObjectResponse } from '../../../../core/service/CoreModel';
import { Options } from '../../../../util/RequestHandler';
import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';


export interface AbstractBeLawyer extends CertCard {
    authenticationCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    signingCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    issuerCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allCerts(filters: string[] | Options, callback?: (error: T1CLibException, data: BeLawyerAllCertificatesResponse) => void): Promise<BeLawyerAllCertificatesResponse>;
    rootCertificate(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    allData(filters: string[]| Options, callback?: (error: T1CLibException, data: BeLawyerAllDataResponse) => void): Promise<BeLawyerAllDataResponse>;
    personalInfo(callback?: (error: T1CLibException, data: BeLawyerPersonalInfoResponse) => void): Promise<BeLawyerPersonalInfoResponse>;
    photo(callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
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
