import { ResponseHandler } from '../../util/ResponseHandler';
import * as lodash from 'lodash';
import { InitUtil } from '../../util/InitUtil';
import { ClientService } from '../../util/ClientService';
var CORE_ACTIVATE = '/admin/activate';
var CORE_ATR_LIST = '/admin/atr';
var CORE_PUB_KEY = '/admin/certificate';
var CORE_CONTAINERS = '/admin/containers';
var CORE_LOGFILE = '/admin/log';
var CORE_AGENT_RESOLVE = '/agent/resolve';
var AdminService = (function () {
    function AdminService(url, connection, noAuthConnection) {
        this.url = url;
        this.connection = connection;
        this.noAuthConnection = noAuthConnection;
    }
    AdminService.errorHandler = function (error) {
        if (error && error.status === 401 && lodash.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            return InitUtil.initializeLibrary(ClientService.getClient());
        }
        else {
            return Promise.reject(error);
        }
    };
    AdminService.prototype.activate = function (callback) {
        return this.post(this.url, CORE_ACTIVATE, {}, callback);
    };
    AdminService.prototype.atr = function (atrList, callback) {
        return this.post(this.url, CORE_ATR_LIST, atrList, callback);
    };
    AdminService.prototype.getLogfile = function (name, callback) {
        return this.getLogFile(this.url, CORE_LOGFILE + '/' + name, callback);
    };
    AdminService.prototype.getLogfileList = function (callback) {
        return this.getLogfiles(this.url, CORE_LOGFILE, callback);
    };
    AdminService.prototype.getPubKey = function (callback) {
        return this.getPubKeys(this.url, CORE_PUB_KEY, callback);
    };
    AdminService.prototype.setPubKey = function (keys, callback) {
        return this.put(this.url, CORE_PUB_KEY, keys, callback);
    };
    AdminService.prototype.updateContainerConfig = function (containers, callback) {
        return this.post(this.url, CORE_CONTAINERS, containers, callback);
    };
    AdminService.prototype.resolveAgent = function (challenge, callback) {
        console.log('resolve agent url: ' + this.url);
        return this.connection.post(this.url, CORE_AGENT_RESOLVE, { challenge: challenge }, [], undefined, callback);
    };
    AdminService.prototype.getLogfiles = function (url, suffix, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.get(url, suffix, undefined).then(function (result) {
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
    AdminService.prototype.getLogFile = function (url, suffix, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.requestLogFile(url, suffix).then(function (result) {
                resolve(ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    self.connection.requestLogFile(url, suffix).then(function (retryResult) {
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
    AdminService.prototype.post = function (url, suffix, body, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.post(url, suffix, body, undefined).then(function (result) {
                resolve(ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    self.connection.post(url, suffix, body, undefined).then(function (retryResult) {
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
    AdminService.prototype.put = function (url, suffix, body, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.put(url, suffix, body, undefined).then(function (result) {
                resolve(ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    self.connection.put(url, suffix, body, undefined).then(function (retryResult) {
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