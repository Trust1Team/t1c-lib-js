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
var Card_1 = require("../Card");
var MOBIB_CARD_ISSUING = '/card-issuing';
var MOBIB_CONTRACTS = '/contracts';
var MOBIB_PHOTO = '/picture';
var MOBIB_STATUS = '/status';
var Mobib = (function (_super) {
    __extends(Mobib, _super);
    function Mobib() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mobib.prototype.cardIssuing = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_CARD_ISSUING), undefined, undefined, callback);
    };
    Mobib.prototype.contracts = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_CONTRACTS), undefined, undefined, callback);
    };
    Mobib.prototype.picture = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_PHOTO), undefined, undefined, callback);
    };
    Mobib.prototype.status = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_STATUS), undefined, undefined, callback);
    };
    return Mobib;
}(Card_1.GenericSmartCard));
exports.Mobib = Mobib;
//# sourceMappingURL=mobib.js.map