/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataObjectResponse, DataResponse } from "../../../../core/service/CoreModel";
import { CertCard } from "../../Card";

export { AbstractLuxTrust, AllCertsResponse, AllDataResponse };


interface AbstractLuxTrust extends CertCard {
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    signingCertificate(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
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