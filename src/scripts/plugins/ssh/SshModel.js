"use strict";
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
exports.__esModule = true;
var __1 = require("../../..");
var SshKey = /** @class */ (function () {
    function SshKey(name, private_key, public_key) {
        this.name = name;
        this.private_key = private_key;
        this.public_key = public_key;
    }
    return SshKey;
}());
exports.SshKey = SshKey;
var RemoveKeyRequest = /** @class */ (function () {
    function RemoveKeyRequest(name) {
        this.name = name;
    }
    return RemoveKeyRequest;
}());
exports.RemoveKeyRequest = RemoveKeyRequest;
var OpenTunnelRequest = /** @class */ (function () {
    function OpenTunnelRequest(ssh_mediator_host, ssh_mediator_username, ssh_mediator_port, remote_port, local_port, timeout, private_key_path) {
        this.ssh_mediator_host = ssh_mediator_host;
        this.ssh_mediator_username = ssh_mediator_username;
        this.ssh_mediator_port = ssh_mediator_port;
        this.remote_port = remote_port;
        this.local_port = local_port;
        this.timeout = timeout;
        this.private_key_path = private_key_path;
    }
    return OpenTunnelRequest;
}());
exports.OpenTunnelRequest = OpenTunnelRequest;
var CloseTunnelRequest = /** @class */ (function () {
    function CloseTunnelRequest(port) {
        this.port = port;
    }
    return CloseTunnelRequest;
}());
exports.CloseTunnelRequest = CloseTunnelRequest;
var GetKeyRequest = /** @class */ (function () {
    function GetKeyRequest(name) {
        this.name = name;
    }
    return GetKeyRequest;
}());
exports.GetKeyRequest = GetKeyRequest;
var CreateKeyRequest = /** @class */ (function () {
    function CreateKeyRequest(name, key_size) {
        this.name = name;
        this.key_size = key_size;
    }
    return CreateKeyRequest;
}());
exports.CreateKeyRequest = CreateKeyRequest;
var FreePortResponse = /** @class */ (function () {
    function FreePortResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return FreePortResponse;
}());
exports.FreePortResponse = FreePortResponse;
var OpenTunnelResponse = /** @class */ (function () {
    function OpenTunnelResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return OpenTunnelResponse;
}());
exports.OpenTunnelResponse = OpenTunnelResponse;
var CloseTunnelResponse = /** @class */ (function () {
    function CloseTunnelResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return CloseTunnelResponse;
}());
exports.CloseTunnelResponse = CloseTunnelResponse;
var GetAllKeysResponse = /** @class */ (function (_super) {
    __extends(GetAllKeysResponse, _super);
    function GetAllKeysResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return GetAllKeysResponse;
}(__1.DataObjectResponse));
exports.GetAllKeysResponse = GetAllKeysResponse;
var GetUserKeyResponse = /** @class */ (function (_super) {
    __extends(GetUserKeyResponse, _super);
    function GetUserKeyResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return GetUserKeyResponse;
}(__1.DataObjectResponse));
exports.GetUserKeyResponse = GetUserKeyResponse;
var CreateKeyResponse = /** @class */ (function (_super) {
    __extends(CreateKeyResponse, _super);
    function CreateKeyResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CreateKeyResponse;
}(__1.DataObjectResponse));
exports.CreateKeyResponse = CreateKeyResponse;
var RemoveKeyResponse = /** @class */ (function () {
    function RemoveKeyResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return RemoveKeyResponse;
}());
exports.RemoveKeyResponse = RemoveKeyResponse;
