export class AtrListRequest {
    constructor(hash, storagePath) {
        this.hash = hash;
        this.storagePath = storagePath;
    }
}
export class SetPubKeyRequest {
    constructor(encryptedPublicKey, encryptedAesKey, ns) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
    }
}
export class PubKeyResponse {
    constructor(data, success) {
        this.data = data;
        this.success = success;
    }
}
export class PubKeys {
    constructor(device, ssl, ds) {
        this.device = device;
        this.ssl = ssl;
        this.ds = ds;
    }
}
export class ContainerSyncRequest {
    constructor(containerResponses) {
        this.containerResponses = containerResponses;
    }
}
export class ResolvedAgent {
    constructor(hostname, challenge, last_update, metadata, port, type, username) {
        this.hostname = hostname;
        this.challenge = challenge;
        this.last_update = last_update;
        this.metadata = metadata;
        this.port = port;
        this.type = type;
        this.username = username;
    }
}
//# sourceMappingURL=adminModel.js.map