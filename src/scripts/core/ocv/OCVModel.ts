/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";

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

interface CertificateChainData {
    certificateChain: CertificateAndOrder[]
}

interface CertificateChainResponse {
    crlResponse: {
        crlLocations: string[]
        issuerCertificate: string
        productionDate: string
        signatureAlgorithm: string
        status: boolean
        version: string
    }
    ocspResponse: {
        ocspLocation: string
        status: boolean
    }
}

interface CertificateAndOrder {
    certificate: string
    order: number
}

interface ChallengeResponse {
    hash: string
    digestAlgorithm: string
}

interface ChallengeSignedHashResponse extends ChallengeResponse {
    result: boolean
}

interface ChallengeSignedHashData {
    base64Signature: string
    base64Certificate: string
    hash: string
    digestAlgorithm: string
}

interface SignatureValidationData {
    rawData: string
    signature: string
    certificate: string
}

interface SignatureValidationResponse {
    rawData: string
    signature: string
    digest: string
    signatureAlgorithm: string
    result: string
}

interface OCVInfoResponse {
    configFile: string
    build: string
    version: string
    environemnt: string
}
