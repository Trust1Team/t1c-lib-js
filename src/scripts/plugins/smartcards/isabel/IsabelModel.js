"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CoreModel_1 = require("../../../core/service/CoreModel");
var IsabelAllDataResponse = /** @class */ (function (_super) {
    __extends(IsabelAllDataResponse, _super);
    function IsabelAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return IsabelAllDataResponse;
}(CoreModel_1.DataObjectResponse));
exports.IsabelAllDataResponse = IsabelAllDataResponse;
var IsabelAllData = /** @class */ (function () {
    function IsabelAllData(card_id) {
        this.card_id = card_id;
    }
    return IsabelAllData;
}());
exports.IsabelAllData = IsabelAllData;
var IsabelSignRequest = /** @class */ (function () {
    function IsabelSignRequest(data, algorithm_reference) {
        this.data = data;
        this.algorithm_reference = algorithm_reference;
    }
    return IsabelSignRequest;
}());
exports.IsabelSignRequest = IsabelSignRequest;
