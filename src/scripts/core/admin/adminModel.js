"use strict";
/**
 * @author Maarten Somers
 * @since 2018
 */
exports.__esModule = true;
var AtrListRequest = /** @class */ (function () {
    function AtrListRequest(hash, storagePath) {
        this.hash = hash;
        this.storagePath = storagePath;
    }
    return AtrListRequest;
}());
exports.AtrListRequest = AtrListRequest;
var SetPubKeyRequest = /** @class */ (function () {
    function SetPubKeyRequest(encryptedPublicKey, encryptedAesKey, ns) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
    }
    return SetPubKeyRequest;
}());
exports.SetPubKeyRequest = SetPubKeyRequest;
var PubKeyResponse = /** @class */ (function () {
    function PubKeyResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return PubKeyResponse;
}());
exports.PubKeyResponse = PubKeyResponse;
// TODO typings for ds
var PubKeys = /** @class */ (function () {
    function PubKeys(device, ssl, ds) {
        this.device = device;
        this.ssl = ssl;
        this.ds = ds;
    }
    return PubKeys;
}());
exports.PubKeys = PubKeys;
var ContainerSyncRequest = /** @class */ (function () {
    function ContainerSyncRequest(containerResponses) {
        this.containerResponses = containerResponses;
    }
    return ContainerSyncRequest;
}());
exports.ContainerSyncRequest = ContainerSyncRequest;
var ResolvedAgent = /** @class */ (function () {
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
exports.ResolvedAgent = ResolvedAgent;
