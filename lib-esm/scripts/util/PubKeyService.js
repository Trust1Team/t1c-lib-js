export class PubKeyService {
    static getPubKey() {
        return PubKeyService.pubKey;
    }
    static setPubKey(key) {
        PubKeyService.pubKey = '-----BEGIN PUBLIC KEY-----\n' + key + '\n-----END PUBLIC KEY-----';
    }
}
//# sourceMappingURL=PubKeyService.js.map