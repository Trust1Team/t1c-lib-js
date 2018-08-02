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
export { PubKeyService };
//# sourceMappingURL=PubKeyService.js.map