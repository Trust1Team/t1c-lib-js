"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform = require("platform");
var ResponseHandler_1 = require("../../util/ResponseHandler");
var Utils_1 = require("../../util/Utils");
var CORE_CONSENT = '/consent';
var CORE_INFO = '/';
var CORE_READERS = '/card-readers';
var CORE_CONSENT_IMPLICIT = '/consent/implicit';
var CORE_RETUREVE_ENCRYPTED_PIN = '/dialog/pin';
var CoreService = (function () {
    function CoreService(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    CoreService.cardInsertedFilter = function (inserted) {
        return { 'card-inserted': inserted };
    };
    CoreService.platformInfo = function () {
        return {
            data: {
                manufacturer: platform.manufacturer || '',
                browser: {
                    name: platform.name,
                    version: platform.version
                },
                os: {
                    name: platform.os.family,
                    version: platform.os.version,
                    architecture: platform.os.architecture
                },
                ua: platform.ua
            },
            success: true
        };
    };
    CoreService.prototype.getConsent = function (title, codeWord, durationInDays, alertLevel, alertPosition, type, timeoutInSeconds, callback) {
        if (!title || !title.length) {
            return ResponseHandler_1.ResponseHandler.error({ status: 400, description: 'Title is required!', code: '801' }, callback);
        }
        if (!codeWord || !codeWord.length) {
            return ResponseHandler_1.ResponseHandler.error({ status: 400, description: 'Code word is required!', code: '801' }, callback);
        }
        var days = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        var timeout = this.connection.cfg.defaultConsentTimeout;
        if (timeoutInSeconds) {
            timeout = timeoutInSeconds;
        }
        return this.connection.post(this.url, CORE_CONSENT, { title: title, text: codeWord, days: days, alert_level: alertLevel, alert_position: alertPosition, type: type, timeout: timeout }, undefined, undefined, callback);
    };
    CoreService.prototype.getImplicitConsent = function (codeWord, durationInDays, type, callback) {
        if (!codeWord || !codeWord.length) {
            return ResponseHandler_1.ResponseHandler.error({ status: 400, description: 'Code word is required!', code: '801' }, callback);
        }
        var days = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        return this.connection.post(this.url, CORE_CONSENT_IMPLICIT, { challenge: codeWord, days: days, type: type }, undefined, undefined, callback);
    };
    CoreService.prototype.info = function (callback) {
        return this.connection.getSkipCitrix(this.url, CORE_INFO, undefined, undefined, callback);
    };
    CoreService.prototype.infoBrowser = function (callback) {
        if (callback) {
            callback(null, CoreService.platformInfo());
        }
        else {
            return Promise.resolve(CoreService.platformInfo());
        }
    };
    CoreService.prototype.retrieveEncryptedUserPin = function (callback) {
        return this.connection.post(this.url, CORE_RETUREVE_ENCRYPTED_PIN, {}, undefined, undefined, callback);
    };
    CoreService.prototype.pollCardInserted = function (secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
        var maxSeconds = secondsToPollCard || 30;
        var self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            setTimeout(function () {
                --maxSeconds;
                self.readers(function (error, data) {
                    if (error) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                    if (maxSeconds === 0) {
                        if (cardTimeoutCb) {
                            return cardTimeoutCb();
                        }
                        else {
                            if (reject) {
                                reject({ success: false, message: 'Timed out' });
                            }
                        }
                    }
                    else if (data.data.length === 0) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                    else {
                        var readerWithCard = data.data.find(function (reader) {
                            return !!reader.card;
                        });
                        if (readerWithCard != null) {
                            callback(null, readerWithCard);
                            resolve(readerWithCard);
                        }
                        else {
                            if (insertCardCb) {
                                insertCardCb();
                            }
                            poll(resolve, reject);
                        }
                    }
                });
            }, 1000);
        }
    };
    CoreService.prototype.pollReadersWithCards = function (secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
        var maxSeconds = secondsToPollCard || 30;
        var self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            setTimeout(function () {
                --maxSeconds;
                self.readers(function (error, data) {
                    if (error) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                    if (maxSeconds === 0) {
                        if (cardTimeoutCb) {
                            return cardTimeoutCb();
                        }
                        else {
                            if (reject) {
                                reject({ success: false, message: 'Timed out' });
                            }
                        }
                    }
                    else if (!Utils_1.Util.isEmpty(data) && !Utils_1.Util.isEmpty(data.data)) {
                        var readersWithCards = data.data.filter(function (reader) {
                            return !!reader.card;
                        });
                        if (readersWithCards.length) {
                            var response = { data: readersWithCards, success: true };
                            callback(null, response);
                            resolve(response);
                        }
                        else {
                            if (insertCardCb) {
                                insertCardCb();
                            }
                            poll(resolve, reject);
                        }
                    }
                    else {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                });
            }, 1000);
        }
    };
    CoreService.prototype.pollReaders = function (secondsToPollReader, callback, connectReaderCb, readerTimeoutCb) {
        var maxSeconds = secondsToPollReader || 30;
        var self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () {
            };
        }
        return new Promise(function (resolve, reject) {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            setTimeout(function () {
                --maxSeconds;
                self.readers(function (error, data) {
                    if (error) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                    if (maxSeconds === 0) {
                        if (readerTimeoutCb) {
                            return readerTimeoutCb();
                        }
                        else {
                            if (reject) {
                                reject({ success: false, message: 'Timed out' });
                            }
                        }
                    }
                    else if (Utils_1.Util.isEmpty(data) || Utils_1.Util.isEmpty(data.data)) {
                        if (connectReaderCb) {
                            connectReaderCb();
                        }
                        poll(resolve, reject);
                    }
                    else {
                        callback(null, data);
                        resolve(data);
                    }
                });
            }, 1000);
        }
    };
    CoreService.prototype.reader = function (reader_id, callback) {
        return this.connection.get(this.url, CORE_READERS + '/' + reader_id, undefined, undefined, callback);
    };
    CoreService.prototype.readers = function (callback) {
        return this.connection.get(this.url, CORE_READERS, undefined, undefined, callback);
    };
    CoreService.prototype.readersCardAvailable = function (callback) {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(true), undefined, callback);
    };
    CoreService.prototype.readersCardsUnavailable = function (callback) {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(false), undefined, callback);
    };
    CoreService.prototype.infoBrowserSync = function () {
        return CoreService.platformInfo();
    };
    CoreService.prototype.getUrl = function () {
        return this.url;
    };
    CoreService.prototype.version = function () {
        return Promise.resolve(VERSION);
    };
    return CoreService;
}());
exports.CoreService = CoreService;
//# sourceMappingURL=CoreService.js.map