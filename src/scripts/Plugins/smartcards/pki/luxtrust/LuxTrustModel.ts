/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { AuthenticateOrSignData, OptionalPin } from "../../Card";

interface AbstractLuxTrust {
    // callback-based
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    signingCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: OptionalPin, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;

    // promise-based
    // allData(filters: string[]): Promise<AllDataResponse>;
    // allCerts(filters: string[]): Promise<AllCertsResponse>;
    // rootCertificate(): Promise<DataResponse>;
    // authenticationCertificate(): Promise<DataResponse>;
    // signingCertificate(): Promise<DataResponse>;
    // verifyPin(body: OptionalPin): Promise<T1CResponse>;
    // signData(body: AuthenticateOrSignData): Promise<DataResponse>;
    // authenticate(body: AuthenticateOrSignData): Promise<DataResponse>;
}

interface AllDataResponse extends T1CResponse {
    data: {
        authentication_certificate: string
        non_repudiation_certificate: string
        root_certificates: string[]
    }
}

interface AllCertsResponse extends T1CResponse {
    data: {
        authentication_certificate: string
        non_repudiation_certificate: string
        root_certificates: string[]
    }
}

export { AbstractLuxTrust, AllCertsResponse, AllDataResponse }