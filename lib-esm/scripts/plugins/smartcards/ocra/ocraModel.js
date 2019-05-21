var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { OptionalPin } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';
var OcraAllDataResponse = (function (_super) {
    __extends(OcraAllDataResponse, _super);
    function OcraAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return OcraAllDataResponse;
}(DataObjectResponse));
export { OcraAllDataResponse };
var OcraAllData = (function () {
    function OcraAllData(counter) {
        this.counter = counter;
    }
    return OcraAllData;
}());
export { OcraAllData };
var OcraChallenge = (function (_super) {
    __extends(OcraChallenge, _super);
    function OcraChallenge(challenge, pin, pace) {
        var _this = _super.call(this, pin, pace) || this;
        _this.challenge = challenge;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return OcraChallenge;
}(OptionalPin));
export { OcraChallenge };
var OcraReadCounterResponse = (function () {
    function OcraReadCounterResponse(counter, success) {
        this.counter = counter;
        this.success = success;
    }
    return OcraReadCounterResponse;
}());
export { OcraReadCounterResponse };
//# sourceMappingURL=ocraModel.js.map