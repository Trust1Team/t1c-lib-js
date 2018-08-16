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
var CoreModel_1 = require("../../core/service/CoreModel");
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
exports.GenerateKeyPairData = GenerateKeyPairData;
var GenerateKeyPairResponse = (function (_super) {
    __extends(GenerateKeyPairResponse, _super);
    function GenerateKeyPairResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return GenerateKeyPairResponse;
}(CoreModel_1.T1CResponse));
exports.GenerateKeyPairResponse = GenerateKeyPairResponse;
//# sourceMappingURL=JavaKeyToolModel.js.map