/**
 * @author Maarten Somers
 * @since 2017
 */
import {RestException} from '../../../../core/exceptions/CoreExceptions';
import {CertCard, PinTryCounterData} from '../../Card';
import {
    CertificateResponse, CertificatesResponse, DataObjectResponse, T1CCertificate, T1CResponse
} from '../../../../core/service/CoreModel';
import {Options} from '../../../../util/RequestHandler';


export interface AbstractEidLUX extends CertCard {
    allDataFilters(): string[];

    allCertFilters(): string[];

    allData(options?: string[] | Options, callback?: (error: RestException, data: LuxAllDataResponse) => void): Promise<LuxAllDataResponse>;

    allCerts(options?: string[] | Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>

    biometric(callback?: (error: RestException, data: LuxidBiometricResponse) => void): Promise<LuxidBiometricResponse>;

    picture(callback?: (error: RestException, data: LuxidPictureResponse) => void): Promise<LuxidPictureResponse>;

    rootCertificate(options?: Options,
                    callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;

    authenticationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    nonRepudiationCertificate(options?: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    signatureImage(callback?: (error: RestException, data: LuxidSignatureImageResponse) => void): Promise<LuxidSignatureImageResponse>;


    pinTryCounter(pin_reference: PinTryCounterData, callback?: (error: RestException, data: LuxPinTryCounterResponse) => void): Promise<LuxPinTryCounterResponse>;

    pinReset(body: LuxPinResetData, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>)

    pinChange(body: LuxPinChangeData, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>)

    pinUnblock(body: LuxPinUnblockData, callback?: (error: RestException, data: T1CResponse) => void | Promise<T1CResponse>)

}

export class AllCertsResponse extends DataObjectResponse {
    constructor(public data: LuxidAllCerts, public success: boolean) {
        super(data, success);
    }
}

export class LuxidAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_certificates?: T1CCertificate[]) {
    }
}

export class LuxAllDataResponse extends AllCertsResponse {
    constructor(public data: LuxidAllData, public success: boolean) {
        super(data, success);
    }
}

export class LuxPinTryCounterResponse extends T1CResponse {
    constructor(public data: number , public success: boolean) {
        super(success, data);
    }
}

export class LuxidAllData extends LuxidAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public non_repudiation_certificate?: T1CCertificate,
                public root_certificates?: T1CCertificate[],
                public biometric?: LuxidBiometric,
                public picture?: LuxidPicture,
                public signature_image?: LuxidSignatureImage,
                public signature_object?: string) {
        super(authentication_certificate, non_repudiation_certificate, root_certificates);
    }
}

export class LuxidBiometric {
    constructor(public birthData?: string,
                public documentNumber?: string,
                public documentType?: string,
                public firstName?: string,
                public gender?: string,
                public issuingState?: string,
                public lastName?: string,
                public nationality?: string,
                public validityEndData?: string,
                public validityStartData?: string) {
    }
}

export class LuxidBiometricResponse extends DataObjectResponse {
    constructor(public data: LuxidBiometric, public success: boolean) {
        super(data, success);
    }
}

export class LuxidPicture {
    constructor(public height: number,
                public width: number,
                public image: string,
                public raw_data: string) {
    }
}

export class LuxidPictureResponse extends DataObjectResponse {
    constructor(public data: LuxidPicture, public success: boolean) {
        super(data, success);
    }
}

export class LuxidSignatureImage {
    constructor(public image: string, public raw_data: string) {
    }
}

export class LuxidSignatureImageResponse extends DataObjectResponse {
    constructor(public data: LuxidSignatureImage, public success: boolean) {
        super(data, success);
    }
}

export class LuxPinResetData {
    constructor(public os_dialog: boolean, public reset_only: boolean, public puk: string, public pin: string) {
        this.reset_only = false;
    }
}

export class LuxPinUnblockData {
    constructor(public os_dialog: boolean, public reset_only: boolean, public puk?: string) {
        this.reset_only = true;
    }
}

export class LuxPinChangeData {
    constructor(os_dialog: boolean, old_pin?: string, new_pin?: string) {}
}

