import { T1CLibException } from '../../../core/exceptions/CoreExceptions';
import { AuthenticateOrSignData, CertCard, VerifyPinData } from '../Card';
import { CertificateResponse, DataResponse, T1CResponse } from '../../../core/service/CoreModel';
import { Options } from '../../../..';
export interface AbstractIsabel extends CertCard {
    rootCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    intermediateCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    nonRepudiationCertificate(options: Options, callback?: (error: T1CLibException, data: CertificateResponse) => void): Promise<CertificateResponse>;
    verifyPin(body: VerifyPinData, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    signData(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    authenticate(body: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
}
