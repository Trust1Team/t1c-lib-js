"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AtrListRequest {
    constructor(hash, storagePath) {
        this.hash = hash;
        this.storagePath = storagePath;
    }
}
exports.AtrListRequest = AtrListRequest;
class SetPubKeyRequest {
    constructor(encryptedPublicKey, encryptedAesKey, ns) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
    }
}
exports.SetPubKeyRequest = SetPubKeyRequest;
class PubKeyResponse {
    constructor(data, success) {
        this.data = data;
        this.success = success;
    }
}
exports.PubKeyResponse = PubKeyResponse;
class PubKeys {
    constructor(device, ssl, ds) {
        this.device = device;
        this.ssl = ssl;
        this.ds = ds;
    }
}
exports.PubKeys = PubKeys;
class ContainerSyncRequest {
    constructor(containerResponses) {
        this.containerResponses = containerResponses;
    }
}
exports.ContainerSyncRequest = ContainerSyncRequest;
class ResolvedAgent {
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
exports.ResolvedAgent = ResolvedAgent;
//# sourceMappingURL=adminModel.js.map