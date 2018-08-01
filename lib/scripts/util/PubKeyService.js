"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PubKeyService {
    static getPubKey() {
        return PubKeyService.pubKey;
    }
    static setPubKey(key) {
        PubKeyService.pubKey = '-----BEGIN PUBLIC KEY-----\n' + key + '\n-----END PUBLIC KEY-----';
    }
}
exports.PubKeyService = PubKeyService;
//# sourceMappingURL=PubKeyService.js.map