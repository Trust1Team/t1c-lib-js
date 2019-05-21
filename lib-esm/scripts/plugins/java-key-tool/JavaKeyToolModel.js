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
var DeleteEntryData = (function () {
    function DeleteEntryData(entity, type, keystore, alias, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return DeleteEntryData;
}());
export { DeleteEntryData };
var DeleteEntryResponse = (function (_super) {
    __extends(DeleteEntryResponse, _super);
    function DeleteEntryResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return DeleteEntryResponse;
}(T1CResponse));
export { DeleteEntryResponse };
var ListEntriesData = (function () {
    function ListEntriesData(entity, type, keystore, alias, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return ListEntriesData;
}());
export { ListEntriesData };
var ListEntriesResponse = (function (_super) {
    __extends(ListEntriesResponse, _super);
    function ListEntriesResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ListEntriesResponse;
}(T1CResponse));
export { ListEntriesResponse };
var StoreEntry = (function () {
    function StoreEntry(alias, base64) {
        this.alias = alias;
    }
    return StoreEntry;
}());
export { StoreEntry };
var ChangeAliasData = (function () {
    function ChangeAliasData(entity, type, keystore, alias, destalias, keypass, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.destalias = destalias;
        this.keypass = keypass;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return ChangeAliasData;
}());
export { ChangeAliasData };
var ChangeAliasResponse = (function (_super) {
    __extends(ChangeAliasResponse, _super);
    function ChangeAliasResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ChangeAliasResponse;
}(T1CResponse));
export { ChangeAliasResponse };
var ChangeKeyPasswordData = (function () {
    function ChangeKeyPasswordData(entity, type, keystore, alias, newpass, keypass, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.newpass = newpass;
        this.keypass = keypass;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return ChangeKeyPasswordData;
}());
export { ChangeKeyPasswordData };
var ChangeKeyPasswordResponse = (function (_super) {
    __extends(ChangeKeyPasswordResponse, _super);
    function ChangeKeyPasswordResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ChangeKeyPasswordResponse;
}(T1CResponse));
export { ChangeKeyPasswordResponse };
var ChangeKeystorePasswordData = (function () {
    function ChangeKeystorePasswordData(entity, type, keystore, newpass, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.newpass = newpass;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return ChangeKeystorePasswordData;
}());
export { ChangeKeystorePasswordData };
var ChangeKeystorePasswordResponse = (function (_super) {
    __extends(ChangeKeystorePasswordResponse, _super);
    function ChangeKeystorePasswordResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ChangeKeystorePasswordResponse;
}(T1CResponse));
export { ChangeKeystorePasswordResponse };
var ExportCertData = (function () {
    function ExportCertData(entity, type, keystore, alias, file, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.file = file;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return ExportCertData;
}());
export { ExportCertData };
var ExportCertResponse = (function (_super) {
    __extends(ExportCertResponse, _super);
    function ExportCertResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ExportCertResponse;
}(T1CResponse));
export { ExportCertResponse };
var ExportCertResponseData = (function () {
    function ExportCertResponseData(alias, base64, path) {
        this.alias = alias;
        this.base64 = base64;
        this.path = path;
    }
    return ExportCertResponseData;
}());
export { ExportCertResponseData };
var ImportCertData = (function () {
    function ImportCertData(entity, type, keystore, alias, file, data, trustcacerts, keypass, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.file = file;
        this.data = data;
        this.trustcacerts = trustcacerts;
        this.keypass = keypass;
        this.storepass = storepass;
        this.storetype = storetype;
        this.providername = providername;
        this.providerclass = providerclass;
        this.providerarg = providerarg;
        this.providerpath = providerpath;
    }
    return ImportCertData;
}());
export { ImportCertData };
var ImportCertResponse = (function (_super) {
    __extends(ImportCertResponse, _super);
    function ImportCertResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return ImportCertResponse;
}(T1CResponse));
export { ImportCertResponse };
var CSRData = (function () {
    function CSRData(entity, type, keystore, alias, sigalg, file, data, keypass, dname, storepass, storetype, providername, providerclass, providerarg, providerpath) {
        this.entity = entity;
        this.type = type;
        this.keystore = keystore;
        this.alias = alias;
        this.sigalg = sigalg;
        this.file = file;
        this.data = data;
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