"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PubKeyResponse = (function () {
    function PubKeyResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return PubKeyResponse;
}());
exports.PubKeyResponse = PubKeyResponse;
var PubKeys = (function () {
    function PubKeys(device, ssl, ds) {
        this.device = device;
        this.ssl = ssl;
        this.ds = ds;
    }
    return PubKeys;
}());
exports.PubKeys = PubKeys;
//# sourceMappingURL=adminModel.js.map