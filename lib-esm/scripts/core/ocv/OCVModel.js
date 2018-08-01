export class ChallengeSignedHashData {
    constructor(base64Signature, base64Certificate, hash, digestAlgorithm) {
        this.base64Signature = base64Signature;
        this.base64Certificate = base64Certificate;
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
}
export class SignatureValidationData {
    constructor(rawData, certificate, signature) {
        this.rawData = rawData;
        this.certificate = certificate;
        this.signature = signature;
    }
}
export class CertificateChainData {
    constructor(certificateChain) {
        this.certificateChain = certificateChain;
    }
}
export class CertificateChainResponse {
    constructor(crlResponse, ocspResponse) {
        this.crlResponse = crlResponse;
        this.ocspResponse = ocspResponse;
    }
}
export class CertificateAndOrder {
    constructor(certificate, order) {
        this.certificate = certificate;
        this.order = order;
    }
}
export class ChallengeResponse {
    constructor(hash, digestAlgorithm) {
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
}
export class ChallengeSignedHashResponse extends ChallengeResponse {
    constructor(result, hash, digestAlgorithm) {
        super(hash, digestAlgorithm);
        this.result = result;
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
}
export class SignatureValidationResponse {
    constructor(rawData, signature, digest, signatureAlgorithm, result) {
        this.rawData = rawData;
        this.signature = signature;
        this.digest = digest;
        this.signatureAlgorithm = signatureAlgorithm;
    }
}
export class OCVInfoResponse {
    constructor(configFile, build, version, environemnt) {
        this.configFile = configFile;
        this.build = build;
        this.version = version;
        this.environemnt = environemnt;
    }
}
//# sourceMappingURL=OCVModel.js.map