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
import { DataObjectResponse } from '../../..';
var SshKey = (function () {
    function SshKey(name, private_key, public_key) {
        this.name = name;
        this.private_key = private_key;
        this.public_key = public_key;
    }
    return SshKey;
}());
export { SshKey };
var RemoveKeyRequest = (function () {
    function RemoveKeyRequest(name) {
        this.name = name;
    }
    return RemoveKeyRequest;
}());
export { RemoveKeyRequest };
var OpenTunnelRequest = (function () {
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
export { OpenTunnelRequest };
var CloseTunnelRequest = (function () {
    function CloseTunnelRequest(port) {
        this.port = port;
    }
    return CloseTunnelRequest;
}());
export { CloseTunnelRequest };
var GetKeyRequest = (function () {
    function GetKeyRequest(name) {
        this.name = name;
    }
    return GetKeyRequest;
}());
export { GetKeyRequest };
var CreateKeyRequest = (function () {
    function CreateKeyRequest(name, key_size) {
        this.name = name;
        this.key_size = key_size;
    }
    return CreateKeyRequest;
}());
export { CreateKeyRequest };
var FreePortResponse = (function () {
    function FreePortResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return FreePortResponse;
}());
export { FreePortResponse };
var OpenTunnelResponse = (function () {
    function OpenTunnelResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return OpenTunnelResponse;
}());
export { OpenTunnelResponse };
var CloseTunnelResponse = (function () {
    function CloseTunnelResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return CloseTunnelResponse;
}());
export { CloseTunnelResponse };
var GetAllKeysResponse = (function (_super) {
    __extends(GetAllKeysResponse, _super);
    function GetAllKeysResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return GetAllKeysResponse;
}(DataObjectResponse));
export { GetAllKeysResponse };
var GetUserKeyResponse = (function (_super) {
    __extends(GetUserKeyResponse, _super);
    function GetUserKeyResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return GetUserKeyResponse;
}(DataObjectResponse));
export { GetUserKeyResponse };
var CreateKeyResponse = (function (_super) {
    __extends(CreateKeyResponse, _super);
    function CreateKeyResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return CreateKeyResponse;
}(DataObjectResponse));
export { CreateKeyResponse };
var RemoveKeyResponse = (function () {
    function RemoveKeyResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return RemoveKeyResponse;
}());
export { RemoveKeyResponse };
//# sourceMappingURL=SshModel.js.map