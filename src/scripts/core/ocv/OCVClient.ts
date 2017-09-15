/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { RemoteConnection } from "../client/Connection";
import { RestException } from "../exceptions/CoreExceptions";
import {
    AbstractOCVClient, CertificateChainData, CertificateChainResponse, ChallengeResponse, ChallengeSignedHashData,
    ChallengeSignedHashResponse, OCVInfoResponse, SignatureValidationData, SignatureValidationResponse
} from "./OCVModel";

export { AbstractOCVClient, OCVClient };


const CHALLENGE = "/challenge";
const CERTIFICATE = "/certs/validate-chain";
const SYSTEM_STATUS = "/system/status";
const SIGNATURE = "/signature/validate";


class OCVClient implements AbstractOCVClient {

    constructor(private url: string, private connection: RemoteConnection) {}

    public getUrl() { return this.url; }

    public validateSignature(data: SignatureValidationData,
                             callback?: (error: RestException, data: SignatureValidationResponse)
                                 => void): void | Promise<SignatureValidationResponse> {
        return this.connection.post(this.url, SIGNATURE, data, undefined, callback);
    }

    public getInfo(callback?: (error: RestException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse> {
        return this.connection.get(this.url, SYSTEM_STATUS, undefined, callback);
    }

    public getChallenge(digestAlgorithm: string,
                        callback?: (error: RestException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse> {
        return this.connection.get(this.url, CHALLENGE, { digest:  digestAlgorithm }, callback);
    }

    public validateChallengeSignedHash(data: ChallengeSignedHashData,
                                       callback?: (error: RestException, data: ChallengeSignedHashResponse)
                                           => void): void | Promise<ChallengeSignedHashResponse> {
        return this.connection.post(this.url, CHALLENGE, data, undefined, callback);
    }

    public validateCertificateChain(data: CertificateChainData,
                                    callback?: (error: RestException, data: CertificateChainResponse)
                                        => void): void | Promise<CertificateChainResponse> {
        return this.connection.post(this.url, CERTIFICATE, data, undefined, callback);
    }

}
