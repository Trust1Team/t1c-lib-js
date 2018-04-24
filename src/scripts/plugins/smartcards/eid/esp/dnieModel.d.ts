import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import { CertificateResponse, DataObjectResponse, T1CCertificate } from '../../../../core/service/CoreModel';
import { Options } from "../../../../util/RequestHandler";
export { AbstractDNIe, AllCertsResponse, AllDataResponse, InfoResponse, AllDNIeData, AllDNIeCerts, Info };
interface AbstractDNIe extends SecuredCertCard {
    allData(options: Options, body: OptionalPin, callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(options: Options, callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    intermediateCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
}
declare class AllCertsResponse extends DataObjectResponse {
    data: AllDNIeCerts;
    success: boolean;
    constructor(data: AllDNIeCerts, success: boolean);
}
declare class AllDNIeCerts {
    authentication_certificate: T1CCertificate;
    intermediate_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    constructor(authentication_certificate?: T1CCertificate, intermediate_certificate?: T1CCertificate, signing_certificate?: T1CCertificate);
}
declare class AllDataResponse extends AllCertsResponse {
    data: AllDNIeData;
    success: boolean;
    constructor(data: AllDNIeData, success: boolean);
}
declare class AllDNIeData {
    info: Info;
    authentication_certificate: T1CCertificate;
    intermediate_certificate: T1CCertificate;
    signing_certificate: T1CCertificate;
    constructor(info: Info, authentication_certificate?: T1CCertificate, intermediate_certificate?: T1CCertificate, signing_certificate?: T1CCertificate);
}
declare class InfoResponse extends DataObjectResponse {
    data: Info;
    success: boolean;
    constructor(data: Info, success: boolean);
}
declare class Info {
    first_name: string;
    last_names: string;
    national_number: string;
    card_number: string;
    serial: string;
    constructor(first_name: string, last_names: string, national_number: string, card_number: string, serial: string);
}
