"use strict";
exports.__esModule = true;
var ResponseHandler_1 = require("../../util/ResponseHandler");
var InitUtil_1 = require("../../util/InitUtil");
var ClientService_1 = require("../../util/ClientService");
var Utils_1 = require("../../util/Utils");
var CORE_ACTIVATE = '/admin/activate';
var CORE_ATR_LIST = '/admin/atr';
var CORE_PUB_KEY = '/admin/certificate';
var CORE_CONTAINERS = '/admin/containers';
var CORE_LOGFILE = '/admin/log';
var CORE_AGENT_RESOLVE = '/agent/resolve';
/**
 * Provides access to the /admin endpoints
 * All calls wil be automatically retried if a JWT related error is encountered
 */
var AdminService = /** @class */ (function () {
    /**
     * Constructor
     * The noAuthConnection's only purpose is to get the device certificates, which are unprotected
     * @param url
     * @param connection
     * @param noAuthConnection
     */
    function AdminService(url, connection, noAuthConnection) {
        this.url = url;
        this.connection = connection;
        this.noAuthConnection = noAuthConnection;
    }
    AdminService.errorHandler = function (error) {
        // check if the error is JWT related
        if (error && error.status === 401 && Utils_1.Util.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            // error is JWT related, re-run the authorisation flow
            return InitUtil_1.InitUtil.initializeLibrary(ClientService_1.ClientService.getClient());
        }
        else {
            // else error is not JWT related, pass it along
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
    // resolve Agent for citrix environment
    AdminService.prototype.resolveAgent = function (challenge, callback) {
        console.log('resolve agent url: ' + this.url);
        return this.connection.post(this.url, CORE_AGENT_RESOLVE, { challenge: challenge }, [], undefined, callback);
    };
    // private methods
    // ===============
    AdminService.prototype.getLogfiles = function (url, suffix, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.get(url, suffix, undefined).then(function (result) {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    // retry initial request
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
    AdminService.prototype.getPubKeys = function (url, suffix, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.noAuthConnection.get(url, suffix, undefined).then(function (result) {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    // retry initial request
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
    AdminService.prototype.getLogFile = function (url, suffix, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.requestLogFile(url, suffix).then(function (result) {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    // retry initial request
                    self.connection.requestLogFile(url, suffix).then(function (retryResult) {
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
    AdminService.prototype.post = function (url, suffix, body, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.post(url, suffix, body, undefined).then(function (result) {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    // retry initial request
                    self.connection.post(url, suffix, body, undefined).then(function (retryResult) {
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
    AdminService.prototype.put = function (url, suffix, body, callback) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.connection.put(url, suffix, body, undefined).then(function (result) {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, function (err) {
                AdminService.errorHandler(err).then(function () {
                    // retry initial request
                    self.connection.put(url, suffix, body, undefined).then(function (retryResult) {
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
