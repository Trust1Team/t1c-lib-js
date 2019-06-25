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
import { GenericContainer } from '../GenericContainer';
var Wacom = (function (_super) {
    __extends(Wacom, _super);
    function Wacom(baseUrl, containerUrl, connection, containerPrefix) {
        return _super.call(this, baseUrl, containerUrl, connection, containerPrefix) || this;
    }
    Wacom.prototype.getDevices = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(Wacom.DEVICES), undefined, undefined, callback);
    };
    Wacom.prototype.signData = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Wacom.SIGN), body, undefined, undefined, callback);
    };
    Wacom.prototype.systemInfo = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(Wacom.SYSTEM_INFO), undefined, undefined, callback);
    };
    Wacom.CONTAINER_PREFIX = 'wacom-stu';
    Wacom.GET = '/get-key';
    Wacom.DEVICES = '/devices';
    Wacom.SIGN = '/sign';
    Wacom.SYSTEM_INFO = '/system-info';
    return Wacom;
}(GenericContainer));
export { Wacom };
//# sourceMappingURL=Wacom.js.map