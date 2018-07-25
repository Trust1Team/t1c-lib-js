import { RestException } from '../exceptions/CoreExceptions';
export interface AbstractOCVClient {
    getChallenge(digestAlgorithm: string, callback?: (error: RestException, data: ChallengeResponse) => void): void | Promise<ChallengeResponse>;
    validateChallengeSignedHash(data: ChallengeSignedHashData, callback?: (error: RestException, data: ChallengeSignedHashResponse) => void): void | Promise<ChallengeSignedHashResponse>;
    validateCertificateChain(data: CertificateChainData, callback?: (error: RestException, data: CertificateChainResponse) => void): void | Promise<CertificateChainResponse>;
    validateSignature(data: SignatureValidationData, callback?: (error: RestException, data: SignatureValidationResponse) => void): void | Promise<SignatureValidationResponse>;
    getInfo(callback?: (error: RestException, data: OCVInfoResponse) => void): void | Promise<OCVInfoResponse>;
}
export declare class ChallengeSignedHashData {
    base64Signature: string;
    base64Certificate: string;
    hash: string;
    digestAlgorithm: string;
    constructor(base64Signature: string, base64Certificate: string, hash: string, digestAlgorithm: string);
}
export declare class SignatureValidationData {
    rawData: string;
    certificate: string;
    signature: string;
    constructor(rawData: string, certificate: string, signature: string);
}
export declare class CertificateChainData {
    certificateChain: CertificateAndOrder[];
    constructor(certificateChain: CertificateAndOrder[]);
}
export declare class CertificateChainResponse {
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
export declare class CertificateAndOrder {
    certificate: string;
    order: number;
    constructor(certificate: string, order: number);
}
export declare class ChallengeResponse {
    hash: string;
    digestAlgorithm: string;
    constructor(hash: string, digestAlgorithm: string);
}
export declare class ChallengeSignedHashResponse extends ChallengeResponse {
    result: boolean;
    hash: string;
    digestAlgorithm: string;
    constructor(result: boolean, hash: string, digestAlgorithm: string);
}
export declare class SignatureValidationResponse {
    rawData: string;
    signature: string;
    digest: string;
    signatureAlgorithm: string;
    constructor(rawData: string, signature: string, digest: string, signatureAlgorithm: string, result: string);
}
export declare class OCVInfoResponse {
    configFile: string;
    build: string;
    version: string;
    environemnt: string;
    constructor(configFile: string, build: string, version: string, environemnt: string);
}
