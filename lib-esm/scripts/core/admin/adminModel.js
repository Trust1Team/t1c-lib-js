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
//# sourceMappingURL=adminModel.js.map