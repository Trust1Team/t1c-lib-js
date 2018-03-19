/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { CertificateResponse, DataArrayResponse, DataObjectResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { CertCard, VerifyPinData } from "../../Card";
import * as Bluebird from 'bluebird';

export { AbstractOberthur, AllCertsResponse, AllDataResponse };


interface AbstractOberthur extends CertCard {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    allAlgoRefsForAuthentication(callback?: (error: RestException, data: DataArrayResponse) => void): Bluebird<DataArrayResponse>;
    allAlgoRefsForSigning(callback?: (error: RestException, data: DataArrayResponse) => void): Bluebird<DataArrayResponse>;
    allData(filters: string[], callback?: (error: RestException, data: AllDataResponse) => void): Bluebird<AllDataResponse>;
    allCerts(filters: string[], callback?: (error: RestException, data: AllCertsResponse) => void): Bluebird<AllCertsResponse>;
    rootCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    issuerCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    authenticationCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    signingCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    encryptionCertificate(callback?: (error: RestException, data: CertificateResponse) => void): Bluebird<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Bluebird<T1CResponse>;
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
