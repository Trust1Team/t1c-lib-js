"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PubKeyService = (function () {
    function PubKeyService() {
    }
    PubKeyService.getPubKey = function () {
        return PubKeyService.pubKey;
    };
    PubKeyService.setPubKey = function (key) {
        PubKeyService.pubKey = '-----BEGIN PUBLIC KEY-----\n' + key + '\n-----END PUBLIC KEY-----';
    };
    return PubKeyService;
}());
exports.PubKeyService = PubKeyService;
//# sourceMappingURL=PubKeyService.js.map