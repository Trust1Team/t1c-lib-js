/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import {
    CertificateResponse, DataObjectResponse, T1CCertificate,
    T1CResponse
} from '../../../../core/service/CoreModel';
import { Options } from "../../../../util/RequestHandler";

export { AbstractDNIe, AllCertsResponse, AllDataResponse, InfoResponse, AllDNIeData, AllDNIeCerts, Info };


interface AbstractDNIe extends SecuredCertCard {
    allData(options: Options, body: OptionalPin,
            callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(options: Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>
    intermediateCertificate(options: Options,
                            callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}

class AllCertsResponse extends DataObjectResponse {
    constructor(public data: AllDNIeCerts, public success: boolean) {
        super(data, success);
    }
}

class AllDNIeCerts {
    constructor(public authentication_certificate?: T1CCertificate,
                public intermediate_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate) {}
}

class AllDataResponse extends AllCertsResponse {
    constructor(public data: AllDNIeData, public success: boolean) {
        super(data, success);
    }
}

class AllDNIeData {
    constructor(public info: Info,
                public authentication_certificate?: T1CCertificate,
                public intermediate_certificate?: T1CCertificate,
                public signing_certificate?: T1CCertificate) {}
}

class InfoResponse extends DataObjectResponse {
    constructor(public data: Info, public success: boolean) {
        super(data, success);
    }
}

class Info {
    constructor(public first_name: string,
                public last_names: string,
                public national_number: string,
                public card_number: string,
                public serial: string) {}
}

