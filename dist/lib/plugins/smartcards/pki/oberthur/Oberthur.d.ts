import { RestException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, T1CResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, VerifyPinData } from '../../Card';
import { AbstractOberthur } from './OberthurModel';
import { Options } from '../../../../util/RequestHandler';
export declare class Oberthur extends GenericCertCard implements AbstractOberthur {
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    rootCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: RestException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}
