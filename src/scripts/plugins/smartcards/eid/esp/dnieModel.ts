/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { OptionalPin, SecuredCertCard } from "../../Card";
import { CertificateResponse, DataObjectResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { Options } from "../../../../util/RequestHandler";
import * as Bluebird from 'bluebird';

export { AbstractDNIe, AllCertsResponse, AllDataResponse, InfoResponse };


interface AbstractDNIe extends SecuredCertCard {
    allData(options: Options, body: OptionalPin,
            callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    allCerts(options: Options, callback?: (error: RestException, data: AllCertsResponse) => void): Bluebird<AllCertsResponse>;
    info(callback?: (error: RestException, data: InfoResponse) => void): Bluebird<InfoResponse>
    intermediateCertificate(options: Options,
                            callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    authenticationCertificate(options: Options,
                              callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    signingCertificate(options: Options,
                       callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
}

interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate?: string
        intermediate_certificate?: string
        signing_certificate?: string
    }
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        authentication_certificate?: string
        intermediate_certificate?: string
        signing_certificate?: string
        info: Info
    }
}

interface InfoResponse extends T1CResponse {
    data: Info
}

interface Info {
    first_name: string
    last_names: string
    national_number: string
    card_number: string
    serial: string
}

