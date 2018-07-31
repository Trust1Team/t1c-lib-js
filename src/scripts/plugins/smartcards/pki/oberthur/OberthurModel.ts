/**
 * @author Maarten Somers
 * @since 2017
 */
import {T1CLibException} from '../../../../core/exceptions/CoreExceptions';
import {
    CertificateResponse, DataArrayResponse, DataObjectResponse, T1CCertificate,
    T1CResponse
} from '../../../../core/service/CoreModel';
import {CertCard, VerifyPinData} from '../../Card';
import {Options} from '../../../../util/RequestHandler';


export interface AbstractOberthur extends CertCard {
    allDataFilters(): string[];

    allCertFilters(): string[];

    allKeyRefs(): string[];

    allAlgoRefsForAuthentication(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;

    allAlgoRefsForSigning(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;

    allData(filters: string[], callback?: (error: T1CLibException, data: OberthurAllDataResponse) => void): Promise<OberthurAllDataResponse>;

    allCerts(filters: string[], callback?: (error: T1CLibException, data: OberthurAllCertsResponse) => void): Promise<OberthurAllCertsResponse>;

    rootCertificate(options?: Options,
                    callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    issuerCertificate(options?: Options,
                      callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    authenticationCertificate(options?: Options,
                              callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    signingCertificate(options?: Options,
                       callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    encryptionCertificate(options?: Options,
                          callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}


export class OberthurAllCertsResponse extends DataObjectResponse {
    constructor(public data: OberthurAllCerts, public success: boolean) {
        super(data, success);
    }
}

export class OberthurAllCerts {
    constructor(public root_certificate?: T1CCertificate,
                public issuer_certificate?: T1CCertificate,
                public authentication_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate,
                public encryption_certificate?: T1CCertificate) {
    }
}

export class OberthurAllDataResponse extends OberthurAllCertsResponse {
    constructor(public data: OberthurAllCerts, public success: boolean) {
        super(data, success);
    }
}
