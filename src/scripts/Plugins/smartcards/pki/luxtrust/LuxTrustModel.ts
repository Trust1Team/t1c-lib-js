/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataObjectResponse, DataResponse } from "../../../../core/service/CoreModel";
import { CertCard } from "../../Card";

interface AbstractLuxTrust extends CertCard {
    // callback-based
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    signingCertificate(callback: (error: RestException, data: DataResponse) => void): void;

    // promise-based
    // allData(filters: string[]): Promise<AllDataResponse>;
    // allCerts(filters: string[]): Promise<AllCertsResponse>;
    // rootCertificate(): Promise<DataResponse>;
    // authenticationCertificate(): Promise<DataResponse>;
    // signingCertificate(): Promise<DataResponse>;
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

export { AbstractLuxTrust, AllCertsResponse, AllDataResponse }