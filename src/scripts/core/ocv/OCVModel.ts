/**
 * @author Maarten Somers
 * @since 2017
 */
import {RestException} from '../exceptions/CoreExceptions';


export interface AbstractOCVClient {
    getChallenge(digestAlgorithm: string,
                 callback?: (error: RestException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse>;
    validateChallengeSignedHash(data: ChallengeSignedHashData,
                                callback?: (error: RestException, data: ChallengeSignedHashResponse)
                                    => void): void | Promise<ChallengeSignedHashResponse>;
    validateCertificateChain(data: CertificateChainData,
                             callback?: (error: RestException, data: CertificateChainResponse)
                                 => void): void | Promise<CertificateChainResponse>;
    validateSignature(data: SignatureValidationData,
                      callback?: (error: RestException, data: SignatureValidationResponse)
                          => void): void | Promise<SignatureValidationResponse>;
    getInfo(callback?: (error: RestException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse>;
}

export class ChallengeSignedHashData {
    constructor(public base64Signature: string, public base64Certificate: string, public hash: string, public digestAlgorithm: string) {}
}

export class SignatureValidationData {
    constructor(public rawData: string, public certificate: string, public signature: string) {}
}

export class CertificateChainData {
    constructor(public certificateChain: CertificateAndOrder[]) {}
}

export class CertificateChainResponse {
    constructor(public crlResponse: { crlLocations: string[],
                    issuerCertificate: string,
                    productionData: string,
                    signatureAlgorithm: string,
                    status: boolean,
                    version: string },
                public ocspResponse: { ocspLocation: string, status: boolean }) {}
}

export class CertificateAndOrder {
    constructor(public certificate: string, public order: number) {}
}

export class ChallengeResponse {
    constructor(public hash: string, public digestAlgorithm: string) {}
}

export class ChallengeSignedHashResponse extends ChallengeResponse {
    constructor(public result: boolean, public hash: string, public digestAlgorithm: string) {
        super(hash, digestAlgorithm);
    }
}

export class SignatureValidationResponse {
    constructor(public rawData: string,
                public signature: string,
                public digest: string,
                public signatureAlgorithm: string,
                result: string) {}
}

export class OCVInfoResponse {
    constructor(public configFile: string, public build: string, public version: string, public environemnt: string) {}
}
