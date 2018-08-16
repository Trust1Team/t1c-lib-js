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
var JavaKeyTool = (function (_super) {
    __extends(JavaKeyTool, _super);
    function JavaKeyTool(baseUrl, containerUrl, connection) {
        return _super.call(this, baseUrl, containerUrl, connection, JavaKeyTool.CONTAINER_PREFIX) || this;
    }
    JavaKeyTool.prototype.generateKeyPair = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_KEY_PAIR), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.GenerateCertificateRequest = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_CERTIFICATE_REQUEST), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ImportCertificate = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.IMPORT_CERTIFICATE), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ExportCertificate = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.EXPORT_CERTIFICATE), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ChangeKeystorePassword = function (body, callback) {
        var serializedbody = {
            entity: body.entity,
            type: body.type,
            keystore: body.keystore,
            alias: body.alias,
            new: body.new_password,
            storepass: body.storepass,
            storetype: body.storetype,
            providername: body.providername,
            providerclass: body.providerclass,
            providerarg: body.providerarg,
            providerpath: body.providerpath
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEYSTORE_PASSWORD), serializedbody, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ChangeKeyPassword = function (body, callback) {
        var serializedbody = {
            entity: body.entity,
            type: body.type,
            keystore: body.keystore,
            alias: body.alias,
            new: body.new_password,
            keypass: body.keypass,
            storepass: body.storepass,
            storetype: body.storetype,
            providername: body.providername,
            providerclass: body.providerclass,
            providerarg: body.providerarg,
            providerpath: body.providerpath
        };
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEY_PASSWORD), serializedbody, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ChangeAlias = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_ALIAS), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ListEntries = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.LIST_ENTIRES), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.DeleteEntry = function (body, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.DELETE_ENTRY), body, undefined, undefined, callback);
    };
    JavaKeyTool.CONTAINER_PREFIX = 'java-keytool';
    JavaKeyTool.GENERATE_KEY_PAIR = '/genkeypair';
    JavaKeyTool.GENERATE_CERTIFICATE_REQUEST = '/certreq​';
    JavaKeyTool.IMPORT_CERTIFICATE = '/importcert';
    JavaKeyTool.EXPORT_CERTIFICATE = '/exportcert';
    JavaKeyTool.CHANGE_KEYSTORE_PASSWORD = '/storepasswd​';
    JavaKeyTool.CHANGE_KEY_PASSWORD = '/keypasswd​';
    JavaKeyTool.CHANGE_ALIAS = '/changealias';
    JavaKeyTool.LIST_ENTIRES = '/list';
    JavaKeyTool.DELETE_ENTRY = '/delete';
    return JavaKeyTool;
}(GenericContainer_1.GenericContainer));
exports.JavaKeyTool = JavaKeyTool;
//# sourceMappingURL=JavaKeyTool.js.map