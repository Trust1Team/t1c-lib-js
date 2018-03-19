/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificateResponse, DataObjectResponse, DataResponse } from "../../../../core/service/CoreModel";
import { CertCard } from "../../Card";
import * as Bluebird from 'bluebird';

export { AbstractLuxTrust, AllCertsResponse, AllDataResponse };


interface AbstractLuxTrust extends CertCard {
    activated(callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Bluebird<AllCertsResponse>;
    rootCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    authenticationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    signingCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        authentication_certificate: string
        non_repudiation_certificate: string
        root_certificates: string[]
    }
}

interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate: string
        non_repudiation_certificate: string
        root_certificates: string[]
    }
}