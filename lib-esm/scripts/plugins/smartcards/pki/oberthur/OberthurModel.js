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
import { DataObjectResponse } from '../../../../core/service/CoreModel';
var OberthurAllCertsResponse = (function (_super) {
    __extends(OberthurAllCertsResponse, _super);
    function OberthurAllCertsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return OberthurAllCertsResponse;
}(DataObjectResponse));
export { OberthurAllCertsResponse };
var OberthurAllCerts = (function () {
    function OberthurAllCerts(root_certificate, issuer_certificate, authentication_certificate, signing_certificate, encryption_certificate) {
        this.root_certificate = root_certificate;
        this.issuer_certificate = issuer_certificate;
        this.authentication_certificate = authentication_certificate;
        this.signing_certificate = signing_certificate;
        this.encryption_certificate = encryption_certificate;
    }
    return OberthurAllCerts;
}());
export { OberthurAllCerts };
var OberthurAllDataResponse = (function (_super) {
    __extends(OberthurAllDataResponse, _super);
    function OberthurAllDataResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return OberthurAllDataResponse;
}(OberthurAllCertsResponse));
export { OberthurAllDataResponse };
//# sourceMappingURL=OberthurModel.js.map