/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataResponse, T1CResponse } from "../../../core/service/CoreModel";
import { AuthenticateOrSignData, ResetPinData, VerifyPinData } from "../Card";

interface AbstractAventra {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allAlgoRefsForSigning(callback: (error: RestException, data: DataArrayResponse) => void): void;
    allData(filters: string[], callback: (error: RestException, data: AllDataResponse) => void): void;
    allCerts(filters: string[], callback: (error: RestException, data: AllCertsResponse) => void): void;
    rootCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    issuerCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    authenticationCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    signingCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    encryptionCertificate(callback: (error: RestException, data: DataResponse) => void): void;
    verifyPin(body: VerifyPinData, callback: (error: RestException, data: T1CResponse) => void): void;
    resetPin(body: ResetPinData, callback: (error: RestException, data: T1CResponse) => void): void;
    signData(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
    authenticate(body: AuthenticateOrSignData, callback: (error: RestException, data: DataResponse) => void): void;
}

interface AllDataResponse extends T1CResponse {
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

interface AllCertsResponse extends T1CResponse {
    data: {
        authentication_certificate: string
        encryption_certificate: string
        issuer_certificate: string
        signing_certificate: string
        root_certificate: string
    }
}

export { AbstractAventra, AllCertsResponse, AllDataResponse };
