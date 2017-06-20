/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { CertCard, VerifyPinData } from "../../Card";

export { AbstractOberthur, AllCertsResponse, AllDataResponse };


interface AbstractOberthur extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): void | Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): void | Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): void | Promise<AllCertsResponse>;
    rootCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    issuerCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    authenticationCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    signingCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    encryptionCertificate(callback?: (error: RestException, data: DataResponse) => void): void | Promise<DataResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): void | Promise<any>;
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        root_certificate: string
        issuer_certificate: string
        authentication_certificate: string
        signing_certificate: string
        encryption_certificate: string
    }
}

interface AllCertsResponse extends DataObjectResponse {
    data: {
        root_certificate: string
        issuer_certificate: string
        authentication_certificate: string
        signing_certificate: string
        encryption_certificate: string
    }
}
