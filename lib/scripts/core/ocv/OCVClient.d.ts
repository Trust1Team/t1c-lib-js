import { RemoteJwtConnection } from '../client/Connection';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { AbstractOCVClient, CertificateChainData, CertificateChainResponse, ChallengeResponse, ChallengeSignedHashData, ChallengeSignedHashResponse, OCVInfoResponse, SignatureValidationData, SignatureValidationResponse } from './OCVModel';
export declare class OCVClient implements AbstractOCVClient {
    private url;
    private connection;
    constructor(url: string, connection: RemoteJwtConnection);
    getUrl(): string;
    validateSignature(data: SignatureValidationData, callback?: (error: T1CLibException, data: SignatureValidationResponse) => void): void | Promise<SignatureValidationResponse>;
    getInfo(callback?: (error: T1CLibException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse>;
    getChallenge(digestAlgorithm: string, callback?: (error: T1CLibException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse>;
    validateChallengeSignedHash(data: ChallengeSignedHashData, callback?: (error: T1CLibException, data: ChallengeSignedHashResponse) => void): void | Promise<ChallengeSignedHashResponse>;
    validateCertificateChain(data: CertificateChainData, callback?: (error: T1CLibException, data: CertificateChainResponse) => void): void | Promise<CertificateChainResponse>;
}
