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
import { PinEnforcer } from '../../..';
import { GenericContainer } from '../GenericContainer';
var JavaKeyTool = (function (_super) {
    __extends(JavaKeyTool, _super);
    function JavaKeyTool(baseUrl, containerUrl, connection) {
        return _super.call(this, baseUrl, containerUrl, connection, JavaKeyTool.CONTAINER_PREFIX) || this;
    }
    JavaKeyTool.prototype.generateKeyPair = function (body, callback) {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_KEY_PAIR), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.GenerateCertificateRequest = function (body, callback) {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_CERTIFICATE_REQUEST), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ImportCertificate = function (body, callback) {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.IMPORT_CERTIFICATE), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ExportCertificate = function (body, callback) {
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.EXPORT_CERTIFICATE), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ChangeKeystorePassword = function (body, callback) {
        body.newpass = PinEnforcer.encryptPin(body.newpass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEYSTORE_PASSWORD), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ChangeKeyPassword = function (body, callback) {
        body.newpass = PinEnforcer.encryptPin(body.newpass);
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_KEY_PASSWORD), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ChangeAlias = function (body, callback) {
        body.keypass = PinEnforcer.encryptPin(body.keypass);
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.CHANGE_ALIAS), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.ListEntries = function (body, callback) {
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.LIST_ENTIRES), body, undefined, undefined, callback);
    };
    JavaKeyTool.prototype.DeleteEntry = function (body, callback) {
        body.storepass = PinEnforcer.encryptPin(body.storepass);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.DELETE_ENTRY), body, undefined, undefined, callback);
    };
    JavaKeyTool.CONTAINER_PREFIX = 'java-keytool';
    JavaKeyTool.GENERATE_KEY_PAIR = '/genkeypair';
    JavaKeyTool.GENERATE_CERTIFICATE_REQUEST = '/certreq';
    JavaKeyTool.IMPORT_CERTIFICATE = '/importcert';
    JavaKeyTool.EXPORT_CERTIFICATE = '/exportcert';
    JavaKeyTool.CHANGE_KEYSTORE_PASSWORD = '/storepasswd';
    JavaKeyTool.CHANGE_KEY_PASSWORD = '/keypasswd';
    JavaKeyTool.CHANGE_ALIAS = '/changealias';
    JavaKeyTool.LIST_ENTIRES = '/list';
    JavaKeyTool.DELETE_ENTRY = '/delete';
    return JavaKeyTool;
}(GenericContainer));
export { JavaKeyTool };
//# sourceMappingURL=JavaKeyTool.js.map