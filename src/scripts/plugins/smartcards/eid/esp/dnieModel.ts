/**
 * @author Maarten Somers
 * @since 2017
 */
import {RestException} from '../../../../core/exceptions/CoreExceptions';
import {OptionalPin, SecuredCertCard} from '../../Card';
import {CertificateResponse, DataObjectResponse, T1CCertificate} from '../../../../core/service/CoreModel';
import {Options} from '../../../../util/RequestHandler';

export interface AbstractDNIe extends SecuredCertCard {
    allData(filters: string[] | Options, body: OptionalPin, callback?: (error: RestException, data: DNIeAllDataResponse) => void): Promise<DNIeAllDataResponse>;

    allCerts(options: Options, body: OptionalPin, callback?: (error: RestException, data: DNIeAllCertsResponse) => void): Promise<DNIeAllCertsResponse>;

    info(callback?: (error: RestException, data: DNIeInfoResponse) => void): Promise<DNIeInfoResponse>

    intermediateCertificate(options: Options,
                            callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    authenticationCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;

    signingCertificate(options: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

export class DNIeAllCertsResponse extends DataObjectResponse {
    constructor(public data: DNIeAllCerts, public success: boolean) {
        super(data, success);
    }
}

export class DNIeAllCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public intermediate_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate) {
    }
}

export class DNIeAllDataResponse extends DNIeAllCertsResponse {
    constructor(public data: DNIeAllData, public success: boolean) {
        super(data, success);
    }
}

export class DNIeAllData {
    constructor(public info?: DNIeInfo,
                public authentication_certificate?: T1CCertificate,
                public intermediate_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate) {
    }
}

export class DNIeInfoResponse extends DataObjectResponse {
    constructor(public data: DNIeInfo, public success: boolean) {
        super(data, success);
    }
}

export class DNIeInfo {
    constructor(public first_name: string,
                public last_names: string,
                public national_number: string,
                public card_number: string,
                public serial: string) {
    }
}

