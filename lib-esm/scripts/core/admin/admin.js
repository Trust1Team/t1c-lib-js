import { ResponseHandler } from '../../util/ResponseHandler';
import { InitUtil } from '../../util/InitUtil';
import { ClientService } from '../../util/ClientService';
import { Util } from '../../util/Utils';
var CORE_PUB_KEY = '/admin/certificate/device';
var AdminService = (function () {
    function AdminService(url, connection, noAuthConnection) {
        this.url = url;
        this.connection = connection;
        this.noAuthConnection = noAuthConnection;
    }
    AdminService.errorHandler = function (error) {
        if (error && error.status === 401 && Util.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            return InitUtil.initializeLibrary(ClientService.getClient());
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
                resolve(ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    self.connection.get(url, suffix, undefined).then(function (retryResult) {
                        resolve(ResponseHandler.response(retryResult, callback));
                    }, function (retryError) {
                        resolve(ResponseHandler.error(retryError, callback));
                    });
                }, function (retryError) {
                    resolve(ResponseHandler.error(retryError, callback));
                });
            });
        });
    };
    AdminService.JWT_ERROR_CODES = ['200', '201', '202', '203', '204', '205'];
    return AdminService;
}());
export { AdminService };
//# sourceMappingURL=admin.js.map