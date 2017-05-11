import { RestException } from "../../../../core/exceptions/CoreExceptions";
import { DataArrayResponse, DataObjectResponse, DataResponse, T1CResponse } from "../../../../core/service/CoreModel";
import { CertCard, VerifyPinData } from "../../Card";
export { AbstractOberthur, AllCertsResponse, AllDataResponse };
interface AbstractOberthur extends CertCard {
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
}
interface AllDataResponse extends AllCertsResponse {
    data: {
        applet_info: {
            change_counter: number;
            name: string;
            serial: string;
            version: string;
        };
        root_certificate: string;
        issuer_certificate: string;
        authentication_certificate: string;
        signing_certificate: string;
        encryption_certificate: string;
    };
}
interface AllCertsResponse extends DataObjectResponse {
    data: {
        root_certificate: string;
        issuer_certificate: string;
        authentication_certificate: string;
        signing_certificate: string;
        encryption_certificate: string;
    };
}
