import { RemoteConnection } from "../client/Connection";
import { RestException } from "../exceptions/CoreExceptions";
import { AbstractOCVClient, CertificateChainData, CertificateChainResponse, ChallengeResponse, ChallengeSignedHashData, ChallengeSignedHashResponse, OCVInfoResponse, SignatureValidationData, SignatureValidationResponse } from "./OCVModel";
export { AbstractOCVClient, OCVClient };
declare class OCVClient implements AbstractOCVClient {
    private url;
    private connection;
    constructor(url: string, connection: RemoteConnection);
    getUrl(): string;
    validateSignature(data: SignatureValidationData, callback: (error: RestException, data: SignatureValidationResponse) => void): void;
    getInfo(callback: (error: RestException, data: OCVInfoResponse) => void): void;
    getChallenge(digestAlgorithm: string, callback: (error: RestException, data: ChallengeResponse) => void): void;
    validateChallengeSignedHash(data: ChallengeSignedHashData, callback: (error: RestException, data: ChallengeSignedHashResponse) => void): void;
    validateCertificateChain(data: CertificateChainData, callback: (error: RestException, data: CertificateChainResponse) => void): void;
}
