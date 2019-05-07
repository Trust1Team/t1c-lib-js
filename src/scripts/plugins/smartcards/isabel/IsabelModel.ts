/**
 * @author William Verhaeghe
 * @since 2019
 */
import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {AuthenticateOrSignData, CertCard, PinCard, VerifyPinData} from '../Card';
import {CertificateResponse, DataObjectResponse, DataResponse, T1CResponse} from '../../../core/service/CoreModel';
import {Options} from '../../../..';


export interface AbstractIsabel extends CertCard {

    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    intermediateCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;

    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;

    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}

export class IsabelAllDataResponse extends DataObjectResponse {
    constructor(public data: { applications?: IsabelApplication[], application_data?: IsabelApplicationData }, public success: boolean) {
        super(data, success);
    }
}

export class IsabelApplication {
    constructor(public aid: string, public name: string, public priority: number) {
    }
}

export class IsabelApplicationsResponse extends DataObjectResponse {
    constructor(public data: IsabelApplication[], public success: boolean) {
        super(data, success);
    }
}

export class IsabelApplicationData {
    constructor(public country?: string,
                public country_code?: string,
                public effective_data?: string,
                public expiration_date?: string,
                public language?: string,
                public pan?: string,
                public name?: string) {
    }
}

export class IsabelApplicationDataResponse extends DataObjectResponse {
    constructor(public data: IsabelApplicationData, public success: boolean) {
        super(data, success);
    }
}

export class IsabelCertificate {
    constructor(public data: string, public exponent: string, public remainder: string) {
    }
}

export class IsabelCertificateResponse extends DataObjectResponse {
    constructor(public data: IsabelCertificate, public success: boolean) {
        super(data, success);
    }
}
