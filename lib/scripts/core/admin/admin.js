"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler_1 = require("../../util/ResponseHandler");
const _ = require("lodash");
const InitUtil_1 = require("../../util/InitUtil");
const ClientService_1 = require("../../util/ClientService");
const CORE_ACTIVATE = '/admin/activate';
const CORE_ATR_LIST = '/admin/atr';
const CORE_PUB_KEY = '/admin/certificate';
const CORE_CONTAINERS = '/admin/containers';
const CORE_LOGFILE = '/admin/log';
const CORE_AGENT_RESOLVE = '/agent/resolve';
class AdminService {
    constructor(url, connection, noAuthConnection) {
        this.url = url;
        this.connection = connection;
        this.noAuthConnection = noAuthConnection;
    }
    static errorHandler(error) {
        if (error && error.status === 401 && _.includes(AdminService.JWT_ERROR_CODES, error.code)) {
            return InitUtil_1.InitUtil.initializeLibrary(ClientService_1.ClientService.getClient());
        }
        else {
            return Promise.reject(error);
        }
    }
    activate(callback) {
        return this.post(this.url, CORE_ACTIVATE, {}, callback);
    }
    atr(atrList, callback) {
        return this.post(this.url, CORE_ATR_LIST, atrList, callback);
    }
    getLogfile(name, callback) {
        return this.getLogFile(this.url, CORE_LOGFILE + '/' + name, callback);
    }
    getLogfileList(callback) {
        return this.getLogfiles(this.url, CORE_LOGFILE, callback);
    }
    getPubKey(callback) {
        return this.getPubKeys(this.url, CORE_PUB_KEY, callback);
    }
    setPubKey(keys, callback) {
        return this.put(this.url, CORE_PUB_KEY, keys, callback);
    }
    updateContainerConfig(containers, callback) {
        return this.post(this.url, CORE_CONTAINERS, containers, callback);
    }
    resolveAgent(challenge, callback) {
        console.log('resolve agent url: ' + this.url);
        return this.connection.post(this.url, CORE_AGENT_RESOLVE, { challenge }, [], undefined, callback);
    }
    getLogfiles(url, suffix, callback) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.get(url, suffix, undefined).then(result => {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    self.connection.get(url, suffix, undefined).then(retryResult => {
                        resolve(ResponseHandler_1.ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                });
            });
        });
    }
    getPubKeys(url, suffix, callback) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.noAuthConnection.get(url, suffix, undefined).then(result => {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    self.connection.get(url, suffix, undefined).then(retryResult => {
                        resolve(ResponseHandler_1.ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                });
            });
        });
    }
    getLogFile(url, suffix, callback) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.requestLogFile(url, suffix).then(result => {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    self.connection.requestLogFile(url, suffix).then(retryResult => {
                        resolve(ResponseHandler_1.ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                });
            });
        });
    }
    post(url, suffix, body, callback) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.post(url, suffix, body, undefined).then(result => {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    self.connection.post(url, suffix, body, undefined).then(retryResult => {
                        resolve(ResponseHandler_1.ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                });
            });
        });
    }
    put(url, suffix, body, callback) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.put(url, suffix, body, undefined).then(result => {
                resolve(ResponseHandler_1.ResponseHandler.response(result, callback));
            }, err => {
                AdminService.errorHandler(err).then(() => {
                    self.connection.put(url, suffix, body, undefined).then(retryResult => {
                        resolve(ResponseHandler_1.ResponseHandler.response(retryResult, callback));
                    }, retryError => {
                        resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                    });
                }, retryError => {
                    resolve(ResponseHandler_1.ResponseHandler.error(retryError, callback));
                });
            });
        });
    }
}
AdminService.JWT_ERROR_CODES = ['200', '201', '202', '203', '204', '205'];
exports.AdminService = AdminService;
//# sourceMappingURL=admin.js.map