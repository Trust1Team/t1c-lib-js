import { RemoteJwtConnection } from '../client/Connection';
import { RestException } from '../exceptions/CoreExceptions';
import { AbstractOCVClient, CertificateChainData, CertificateChainResponse, ChallengeResponse, ChallengeSignedHashData, ChallengeSignedHashResponse, OCVInfoResponse, SignatureValidationData, SignatureValidationResponse } from './OCVModel';
export declare class OCVClient implements AbstractOCVClient {
    private url;
    private connection;
    constructor(url: string, connection: RemoteJwtConnection);
    getUrl(): string;
    validateSignature(data: SignatureValidationData, callback?: (error: RestException, data: SignatureValidationResponse) => void): void | Promise<SignatureValidationResponse>;
    getInfo(callback?: (error: RestException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse>;
    getChallenge(digestAlgorithm: string, callback?: (error: RestException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse>;
    validateChallengeSignedHash(data: ChallengeSignedHashData, callback?: (error: RestException, data: ChallengeSignedHashResponse) => void): void | Promise<ChallengeSignedHashResponse>;
    validateCertificateChain(data: CertificateChainData, callback?: (error: RestException, data: CertificateChainResponse) => void): void | Promise<CertificateChainResponse>;
}
