var AtrListRequest = (function () {
    function AtrListRequest(hash, storagePath) {
        this.hash = hash;
        this.storagePath = storagePath;
    }
    return AtrListRequest;
}());
export { AtrListRequest };
var SetPubKeyRequest = (function () {
    function SetPubKeyRequest(encryptedPublicKey, encryptedAesKey, ns) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
    }
    return SetPubKeyRequest;
}());
export { SetPubKeyRequest };
var PubKeyResponse = (function () {
    function PubKeyResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return PubKeyResponse;
}());
export { PubKeyResponse };
var PubKeys = (function () {
    function PubKeys(device, ssl, ds) {
        this.device = device;
        this.ssl = ssl;
        this.ds = ds;
    }
    return PubKeys;
}());
export { PubKeys };
var ContainerSyncRequest = (function () {
    function ContainerSyncRequest(containerResponses) {
        this.containerResponses = containerResponses;
    }
    return ContainerSyncRequest;
}());
export { ContainerSyncRequest };
var ResolvedAgent = (function () {
    function ResolvedAgent(hostname, challenge, last_update, metadata, port, type, username) {
        this.hostname = hostname;
        this.challenge = challenge;
        this.last_update = last_update;
        this.metadata = metadata;
        this.port = port;
        this.type = type;
        this.username = username;
    }
    return ResolvedAgent;
}());
export { ResolvedAgent };
//# sourceMappingURL=adminModel.js.map