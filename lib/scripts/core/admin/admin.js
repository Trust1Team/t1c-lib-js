"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseHandler_1 = require("../../util/ResponseHandler");
var InitUtil_1 = require("../../util/InitUtil");
var ClientService_1 = require("../../util/ClientService");
var Utils_1 = require("../../util/Utils");
var CORE_PUB_KEY = '/admin/certificate/device';
var AdminService = (function () {
    function AdminService(url, connection, noAuthConnection) {
        this.url = url;
        this.connection = connection;
        this.noAuthConnection = noAuthConnection;
    }
    AdminService.errorHandler = function (error) {
        if (error && error.status === 401 && Utils_1.Util.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            return InitUtil_1.InitUtil.initializeLibrary(ClientService_1.ClientService.getClient());
        }
        else {
            return Promise.reject(error);
        }
    };
    AdminService.prototype.getPubKey = function (callback) {
        return this.getPubKeys(this.url, CORE_PUB_KEY, callback);
    };
    AdminService.prototype.getPubKeys = function (url, suffix, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.noAuthConnection.get(url, suffix, undefined).then(function (result) {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    self.connection.get(url, suffix, undefined).then(function (retryResult) {
                        resolve(ResponseHandler_1.ResponseHandler.response(retryResult, callback));
                    }, function (retryError) {
                        resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                    });
                }, function (retryError) {
                    resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                });
            });
        });
    };
    AdminService.JWT_ERROR_CODES = ['200', '201', '202', '203', '204', '205'];
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.js.map