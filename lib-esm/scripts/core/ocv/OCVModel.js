var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChallengeSignedHashData = (function () {
    function ChallengeSignedHashData(base64Signature, base64Certificate, hash, digestAlgorithm) {
        this.base64Signature = base64Signature;
        this.base64Certificate = base64Certificate;
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
    return ChallengeSignedHashData;
}());
export { ChallengeSignedHashData };
var SignatureValidationData = (function () {
    function SignatureValidationData(rawData, certificate, signature) {
        this.rawData = rawData;
        this.certificate = certificate;
        this.signature = signature;
    }
    return SignatureValidationData;
}());
export { SignatureValidationData };
var CertificateChainData = (function () {
    function CertificateChainData(certificateChain) {
        this.certificateChain = certificateChain;
    }
    return CertificateChainData;
}());
export { CertificateChainData };
var CertificateChainResponse = (function () {
    function CertificateChainResponse(crlResponse, ocspResponse) {
        this.crlResponse = crlResponse;
        this.ocspResponse = ocspResponse;
    }
    return CertificateChainResponse;
}());
export { CertificateChainResponse };
var CertificateAndOrder = (function () {
    function CertificateAndOrder(certificate, order) {
        this.certificate = certificate;
        this.order = order;
    }
    return CertificateAndOrder;
}());
export { CertificateAndOrder };
var ChallengeResponse = (function () {
    function ChallengeResponse(hash, digestAlgorithm) {
        this.hash = hash;
        this.digestAlgorithm = digestAlgorithm;
    }
    return ChallengeResponse;
}());
export { ChallengeResponse };
var ChallengeSignedHashResponse = (function (_super) {
    __extends(ChallengeSignedHashResponse, _super);
    function ChallengeSignedHashResponse(result, hash, digestAlgorithm) {
        var _this = _super.call(this, hash, digestAlgorithm) || this;
        _this.result = result;
        _this.hash = hash;
        _this.digestAlgorithm = digestAlgorithm;
        return _this;
    }
    return ChallengeSignedHashResponse;
}(ChallengeResponse));
export { ChallengeSignedHashResponse };
var SignatureValidationResponse = (function () {
    function SignatureValidationResponse(rawData, signature, digest, signatureAlgorithm, result) {
        this.rawData = rawData;
        this.signature = signature;
        this.digest = digest;
        this.signatureAlgorithm = signatureAlgorithm;
    }
    return SignatureValidationResponse;
}());
export { SignatureValidationResponse };
var OCVInfoResponse = (function () {
    function OCVInfoResponse(configFile, build, version, environemnt) {
        this.configFile = configFile;
        this.build = build;
        this.version = version;
        this.environemnt = environemnt;
    }
    return OCVInfoResponse;
}());
export { OCVInfoResponse };
//# sourceMappingURL=OCVModel.js.map