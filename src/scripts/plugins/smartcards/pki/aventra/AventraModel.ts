/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { CertCard, ResetPinData, VerifyPinData } from "../../Card";

export { AbstractAventra, AllCertsResponse, AllDataResponse };


interface AbstractAventra extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Promise<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Promise<AllCertsResponse>;
    rootCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    resetPin(body: ResetPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
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
