import { AbstractIsabel } from './IsabelModel';
import { LocalConnection, CertificateResponse, Options, T1CLibException, T1CResponse, AuthenticateOrSignData, DataResponse, VerifyPinData } from '../../../..';
import { GenericCertCard } from '../Card';
export declare class Isabel extends GenericCertCard implements AbstractIsabel {
    static CONTAINER_PREFIX: string;
    static VERIFY_PRIV_KEY_REF: string;
    static CERT_INTERMEDIATE: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string);
    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    intermediateCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
