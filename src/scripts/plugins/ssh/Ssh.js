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
var GenericContainer_1 = require("../GenericContainer");
var Ssh = /** @class */ (function (_super) {
    __extends(Ssh, _super);
    function Ssh(baseUrl, containerUrl, connection, containerPrefix) {
        return _super.call(this, baseUrl, containerUrl, connection, containerPrefix) || this;
    }
    Ssh.prototype.add = function (request, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.ADD), request, undefined, undefined, callback);
    };
    Ssh.prototype.all = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(Ssh.ALL), undefined, undefined, callback);
    };
    Ssh.prototype.get = function (request, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.GET), request, undefined, undefined, callback);
    };
    Ssh.prototype.remove = function (request, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.REMOVE), request, undefined, undefined, callback);
    };
    Ssh.prototype.closeTunnel = function (request, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.CLOSE_TUNNEL), request, undefined, undefined, callback);
    };
    Ssh.prototype.openTunnel = function (request, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.OPEN_TUNNEL), request, undefined, undefined, callback);
    };
    Ssh.prototype.freePort = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(Ssh.FREE_PORT), undefined, undefined, callback);
    };
    Ssh.CONTAINER_PREFIX = 'ssh';
    Ssh.ALL = '/get-keys';
    Ssh.GET = '/get-key';
    Ssh.ADD = '/create-key';
    Ssh.REMOVE = '/remove-key';
    Ssh.OPEN_TUNNEL = '/open-ssh-tunnel';
    Ssh.CLOSE_TUNNEL = '/close-ssh-tunnel';
    Ssh.FREE_PORT = '/free-port';
    return Ssh;
}(GenericContainer_1.GenericContainer));
exports.Ssh = Ssh;
