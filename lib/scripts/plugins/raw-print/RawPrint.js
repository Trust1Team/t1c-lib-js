"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var GenericContainer_1 = require("../GenericContainer");
var RAWPRINT_LIST = '/list';
var RAWPRINT_PRINT = '/print';
var RawPrint = (function (_super) {
    __extends(RawPrint, _super);
    function RawPrint(baseUrl, containerUrl, connection, runInUserSpace) {
        return _super.call(this, baseUrl, containerUrl, connection, RawPrint.CONTAINER_PREFIX, runInUserSpace) || this;
    }
    RawPrint.prototype.list = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RAWPRINT_LIST), undefined, undefined, callback);
    };
    RawPrint.prototype.print = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(RAWPRINT_PRINT), body, undefined, undefined, callback);
    };
    RawPrint.CONTAINER_PREFIX = 'rawprint';
    return RawPrint;
}(GenericContainer_1.GenericContainer));
exports.RawPrint = RawPrint;
//# sourceMappingURL=RawPrint.js.map