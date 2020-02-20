"use strict";
exports.__esModule = true;
/**
 * @author Maarten Somers
 */
var PubKeyService = /** @class */ (function () {
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
