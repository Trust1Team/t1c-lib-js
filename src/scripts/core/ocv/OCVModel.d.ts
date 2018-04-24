import * as CoreExceptions from '../exceptions/CoreExceptions';
export { AbstractOCVClient, CertificateAndOrder, CertificateChainData, CertificateChainResponse, ChallengeResponse, ChallengeSignedHashResponse, ChallengeSignedHashData, SignatureValidationData, SignatureValidationResponse, OCVInfoResponse };
interface AbstractOCVClient {
    getChallenge(digestAlgorithm: string, callback?: (error: CoreExceptions.RestException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse>;
    validateChallengeSignedHash(data: ChallengeSignedHashData, callback?: (error: CoreExceptions.RestException, data: ChallengeSignedHashResponse) => void): void | Promise<ChallengeSignedHashResponse>;
    validateCertificateChain(data: CertificateChainData, callback?: (error: CoreExceptions.RestException, data: CertificateChainResponse) => void): void | Promise<CertificateChainResponse>;
    validateSignature(data: SignatureValidationData, callback?: (error: CoreExceptions.RestException, data: SignatureValidationResponse) => void): void | Promise<SignatureValidationResponse>;
    getInfo(callback?: (error: CoreExceptions.RestException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse>;
}
declare class ChallengeSignedHashData {
    base64Signature: string;
    base64Certificate: string;
    hash: string;
    digestAlgorithm: string;
    constructor(base64Signature: string, base64Certificate: string, hash: string, digestAlgorithm: string);
}
declare class SignatureValidationData {
    rawData: string;
    certificate: string;
    signature: string;
    constructor(rawData: string, certificate: string, signature: string);
}
declare class CertificateChainData {
    certificateChain: CertificateAndOrder[];
    constructor(certificateChain: CertificateAndOrder[]);
}
declare class CertificateChainResponse {
    crlResponse: {
        crlLocations: string[];
        issuerCertificate: string;
        productionData: string;
        signatureAlgorithm: string;
        status: boolean;
        version: string;
    };
    ocspResponse: {
        ocspLocation: string;
        status: boolean;
    };
    constructor(crlResponse: {
        crlLocations: string[];
        issuerCertificate: string;
        productionData: string;
        signatureAlgorithm: string;
        status: boolean;
        version: string;
    }, ocspResponse: {
        ocspLocation: string;
        status: boolean;
    });
}
declare class CertificateAndOrder {
    certificate: string;
    order: number;
    constructor(certificate: string, order: number);
}
declare class ChallengeResponse {
    hash: string;
    digestAlgorithm: string;
    constructor(hash: string, digestAlgorithm: string);
}
declare class ChallengeSignedHashResponse extends ChallengeResponse {
    result: boolean;
    hash: string;
    digestAlgorithm: string;
    constructor(result: boolean, hash: string, digestAlgorithm: string);
}
declare class SignatureValidationResponse {
    rawData: string;
    signature: string;
    digest: string;
    signatureAlgorithm: string;
    constructor(rawData: string, signature: string, digest: string, signatureAlgorithm: string, result: string);
}
declare class OCVInfoResponse {
    configFile: string;
    build: string;
    version: string;
    environemnt: string;
    constructor(configFile: string, build: string, version: string, environemnt: string);
}
