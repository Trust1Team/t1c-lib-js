/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';

export { AbstractOCVClient, CertificateAndOrder, CertificateChainData, CertificateChainResponse,
    ChallengeResponse, ChallengeSignedHashResponse, ChallengeSignedHashData,
    SignatureValidationData, SignatureValidationResponse, OCVInfoResponse };


interface AbstractOCVClient {
    getChallenge(digestAlgorithm: string,
                 callback?: (error: CoreExceptions.RestException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse>;
    validateChallengeSignedHash(data: ChallengeSignedHashData,
                                callback?: (error: CoreExceptions.RestException, data: ChallengeSignedHashResponse)
                                    => void): void | Promise<ChallengeSignedHashResponse>;
    validateCertificateChain(data: CertificateChainData,
                             callback?: (error: CoreExceptions.RestException, data: CertificateChainResponse)
                                 => void): void | Promise<CertificateChainResponse>;
    validateSignature(data: SignatureValidationData,
                      callback?: (error: CoreExceptions.RestException, data: SignatureValidationResponse)
                          => void): void | Promise<SignatureValidationResponse>;
    getInfo(callback?: (error: CoreExceptions.RestException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse>;
}

class ChallengeSignedHashData {
    constructor(public base64Signature: string, public base64Certificate: string, public hash: string, public digestAlgorithm: string) {}
}

class SignatureValidationData {
    constructor(public rawData: string, public certificate: string, public signature: string) {}
}

class CertificateChainData {
    constructor(public certificateChain: CertificateAndOrder[]) {}
}

class CertificateChainResponse {
    constructor(public crlResponse: { crlLocations: string[],
                    issuerCertificate: string,
                    productionData: string,
                    signatureAlgorithm: string,
                    status: boolean,
                    version: string },
                public ocspResponse: { ocspLocation: string, status: boolean }) {}
}

class CertificateAndOrder {
    constructor(public certificate: string, public order: number) {}
}

class ChallengeResponse {
    constructor(public hash: string, public digestAlgorithm: string) {}
}

class ChallengeSignedHashResponse extends ChallengeResponse {
    constructor(public result: boolean, public hash: string, public digestAlgorithm: string) {
        super(hash, digestAlgorithm);
    }
}

class SignatureValidationResponse {
    constructor(public rawData: string,
                public signature: string,
                public digest: string,
                public signatureAlgorithm: string,
                result: string) {}
}

class OCVInfoResponse {
    constructor(public configFile: string, public build: string, public version: string, public environemnt: string) {}
}
