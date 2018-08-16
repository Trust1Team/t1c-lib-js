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
import { T1CResponse } from '../../core/service/CoreModel';
var CSRData = (function () {
    function CSRData(entity, type, keystore, alias, sigalg, file, keypass, dname, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.sigalg = sigalg;
        this.file = file;
        this.keypass = keypass;
        this.dname = dname;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return CSRData;
}());
export { CSRData };
var CSRResponse = (function (_super) {
    __extends(CSRResponse, _super);
    function CSRResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CSRResponse;
}(T1CResponse));
export { CSRResponse };
var CSRResponseData = (function () {
    function CSRResponseData(base64, path) {
        this.base64 = base64;
        this.path = path;
    }
    return CSRResponseData;
}());
export { CSRResponseData };
var GenerateKeyPairData = (function () {
    function GenerateKeyPairData(entity, type, keystore, alias, keyalg, sigalg, destalias, dname, startdate, ext, validity, keypass, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.keyalg = keyalg;
        this.sigalg = sigalg;
        this.destalias = destalias;
        this.dname = dname;
        this.startdate = startdate;
        this.ext = ext;
        this.validity = validity;
        this.keypass = keypass;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return GenerateKeyPairData;
}());
export { GenerateKeyPairData };
var GenerateKeyPairResponse = (function (_super) {
    __extends(GenerateKeyPairResponse, _super);
    function GenerateKeyPairResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return GenerateKeyPairResponse;
}(T1CResponse));
export { GenerateKeyPairResponse };
//# sourceMappingURL=JavaKeyToolModel.js.map