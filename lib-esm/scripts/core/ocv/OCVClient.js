const CHALLENGE = '/challenge';
const CERTIFICATE = '/certs/validate-chain';
const SYSTEM_STATUS = '/system/status';
const SIGNATURE = '/signature/validate';
export class OCVClient {
    constructor(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    getUrl() { return this.url; }
    validateSignature(data, callback) {
        return this.connection.post(this.url, SIGNATURE, data, undefined, undefined, callback);
    }
    getInfo(callback) {
        return this.connection.get(this.getUrl(), SYSTEM_STATUS, undefined, undefined, callback);
    }
    getChallenge(digestAlgorithm, callback) {
        return this.connection.get(this.url, CHALLENGE, { digest: digestAlgorithm }, undefined, callback);
    }
    validateChallengeSignedHash(data, callback) {
        return this.connection.post(this.url, CHALLENGE, data, undefined, undefined, callback);
    }
    validateCertificateChain(data, callback) {
        return this.connection.post(this.url, CERTIFICATE, data, undefined, undefined, callback);
    }
}
//# sourceMappingURL=OCVClient.js.map