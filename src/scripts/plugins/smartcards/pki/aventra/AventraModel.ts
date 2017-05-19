/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { CertCard, ResetPinData, VerifyPinData } from "../../Card";

export { AbstractAventra, AllCertsResponse, AllDataResponse };


interface AbstractAventra extends CertCard {
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
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): void | Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: RestException, data: T1CResponse) => void): void | Promise<T1CResponse>;
}

interface AllDataResponse extends AllCertsResponse {
    data: {
        applet_info: {
            change_counter: number
            name: string
            serial: string
            version: string
        }
        authentication_certificate: string
        encryption_certificate: string
        issuer_certificate: string
        signing_certificate: string
        root_certificate: string
    }
}

interface AllCertsResponse extends DataObjectResponse {
    data: {
        authentication_certificate: string
        encryption_certificate: string
        issuer_certificate: string
        signing_certificate: string
        root_certificate: string
    }
}
