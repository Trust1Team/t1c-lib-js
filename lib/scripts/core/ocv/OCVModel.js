"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChallengeSignedHashData {
    constructor(base64Signature, base64Certificate, hash, digestAlgorithm) {
        this.base64Signature = base64Signature;
        this.base64Certificate = base64Certificate;
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
}
exports.ChallengeSignedHashData = ChallengeSignedHashData;
class SignatureValidationData {
    constructor(rawData, certificate, signature) {
        this.rawData = rawData;
        this.certificate = certificate;
        this.signature = signature;
    }
}
exports.SignatureValidationData = SignatureValidationData;
class CertificateChainData {
    constructor(certificateChain) {
        this.certificateChain = certificateChain;
    }
}
exports.CertificateChainData = CertificateChainData;
class CertificateChainResponse {
    constructor(crlResponse, ocspResponse) {
        this.crlResponse = crlResponse;
        this.ocspResponse = ocspResponse;
    }
}
exports.CertificateChainResponse = CertificateChainResponse;
class CertificateAndOrder {
    constructor(certificate, order) {
        this.certificate = certificate;
        this.order = order;
    }
}
exports.CertificateAndOrder = CertificateAndOrder;
class ChallengeResponse {
    constructor(hash, digestAlgorithm) {
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
}
exports.ChallengeResponse = ChallengeResponse;
class ChallengeSignedHashResponse extends ChallengeResponse {
    constructor(result, hash, digestAlgorithm) {
        super(hash, digestAlgorithm);
        this.result = result;
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
}
exports.ChallengeSignedHashResponse = ChallengeSignedHashResponse;
class SignatureValidationResponse {
    constructor(rawData, signature, digest, signatureAlgorithm, result) {
        this.rawData = rawData;
        this.signature = signature;
        this.digest = digest;
        this.signatureAlgorithm = signatureAlgorithm;
    }
}
exports.SignatureValidationResponse = SignatureValidationResponse;
class OCVInfoResponse {
    constructor(configFile, build, version, environemnt) {
        this.configFile = configFile;
        this.build = build;
        this.version = version;
        this.environemnt = environemnt;
    }
}
exports.OCVInfoResponse = OCVInfoResponse;
//# sourceMappingURL=OCVModel.js.map