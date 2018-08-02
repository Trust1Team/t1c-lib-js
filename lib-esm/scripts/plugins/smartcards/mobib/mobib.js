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
import { GenericSmartCard } from '../Card';
var MOBIB_CARD_ISSUING = '/card-issuing';
var MOBIB_CONTRACTS = '/contracts';
var MOBIB_PHOTO = '/picture';
var MOBIB_STATUS = '/status';
var Mobib = (function (_super) {
    __extends(Mobib, _super);
    function Mobib(baseUrl, containerUrl, connection, reader_id) {
        return _super.call(this, baseUrl, containerUrl, connection, reader_id, Mobib.CONTAINER_PREFIX) || this;
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
    Mobib.CONTAINER_PREFIX = 'mobib';
    return Mobib;
}(GenericSmartCard));
export { Mobib };
//# sourceMappingURL=mobib.js.map