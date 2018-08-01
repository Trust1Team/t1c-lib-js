import { T1CLibException } from '../../../../core/exceptions/CoreExceptions';
import { CertificateResponse, T1CResponse } from '../../../../core/service/CoreModel';
import { GenericCertCard, VerifyPinData } from '../../Card';
import { AbstractOberthur } from './OberthurModel';
import { Options } from '../../../../util/RequestHandler';
import { LocalConnection } from '../../../../core/client/Connection';
export declare class Oberthur extends GenericCertCard implements AbstractOberthur {
    static CONTAINER_PREFIX: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    allDataFilters(): string[];
    allCertFilters(): string[];
    allKeyRefs(): string[];
    rootCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    issuerCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    authenticationCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    signingCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    encryptionCertificate(options?: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
}