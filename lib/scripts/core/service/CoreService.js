"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const platform = require("platform");
const ResponseHandler_1 = require("../../util/ResponseHandler");
const CORE_CONSENT = '/consent';
const CORE_INFO = '/';
const CORE_READERS = '/card-readers';
const CORE_CONSENT_IMPLICIT = '/consent/implicit';
class CoreService {
    constructor(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    static cardInsertedFilter(inserted) {
        return { 'card-inserted': inserted };
    }
    static platformInfo() {
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
    }
    getConsent(title, codeWord, durationInDays, alertLevel, alertPosition, type, timeoutInSeconds, callback) {
        if (!title || !title.length) {
            return ResponseHandler_1.ResponseHandler.error({ status: 400, description: 'Title is required!', code: '801' }, callback);
        }
        if (!codeWord || !codeWord.length) {
            return ResponseHandler_1.ResponseHandler.error({ status: 400, description: 'Code word is required!', code: '801' }, callback);
        }
        let days = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        let timeout = this.connection.cfg.defaultConsentTimeout;
        if (timeoutInSeconds) {
            timeout = timeoutInSeconds;
        }
        return this.connection.post(this.url, CORE_CONSENT, { title, text: codeWord, days, alert_level: alertLevel, alert_position: alertPosition, type, timeout }, undefined, undefined, callback);
    }
    getImplicitConsent(codeWord, durationInDays, type, callback) {
        if (!codeWord || !codeWord.length) {
            return ResponseHandler_1.ResponseHandler.error({ status: 400, description: 'Code word is required!', code: '801' }, callback);
        }
        let days = this.connection.cfg.defaultConsentDuration;
        if (durationInDays) {
            days = durationInDays;
        }
        return this.connection.post(this.url, CORE_CONSENT_IMPLICIT, { challenge: codeWord, days, type }, undefined, undefined, callback);
    }
    info(callback) {
        return this.connection.getSkipCitrix(this.url, CORE_INFO, undefined, undefined, callback);
    }
    infoBrowser(callback) {
        if (callback) {
            callback(null, CoreService.platformInfo());
        }
        else {
            return Promise.resolve(CoreService.platformInfo());
        }
    }
    pollCardInserted(secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () { };
        }
        return new Promise((resolve, reject) => {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            _.delay(() => {
                --maxSeconds;
                self.readers((error, data) => {
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
                        let readerWithCard = _.find(data.data, (reader) => {
                            return _.has(reader, 'card');
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
    }
    pollReadersWithCards(secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
        let maxSeconds = secondsToPollCard || 30;
        let self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () { };
        }
        return new Promise((resolve, reject) => {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            _.delay(() => {
                --maxSeconds;
                self.readers((error, data) => {
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
                    else if (!_.isEmpty(data) && !_.isEmpty(data.data)) {
                        let readersWithCards = _.filter(data.data, (reader) => {
                            return _.has(reader, 'card');
                        });
                        if (readersWithCards.length) {
                            let response = { data: readersWithCards, success: true };
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
    }
    pollReaders(secondsToPollReader, callback, connectReaderCb, readerTimeoutCb) {
        let maxSeconds = secondsToPollReader || 30;
        let self = this;
        if (!callback || typeof callback !== 'function') {
            callback = function () { };
        }
        return new Promise((resolve, reject) => {
            poll(resolve, reject);
        });
        function poll(resolve, reject) {
            _.delay(function () {
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
                    else if (_.isEmpty(data) || _.isEmpty(data.data)) {
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
    }
    reader(reader_id, callback) {
        return this.connection.get(this.url, CORE_READERS + '/' + reader_id, undefined, undefined, callback);
    }
    readers(callback) {
        return this.connection.get(this.url, CORE_READERS, undefined, undefined, callback);
    }
    readersCardAvailable(callback) {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(true), undefined, callback);
    }
    readersCardsUnavailable(callback) {
        return this.connection.get(this.url, CORE_READERS, CoreService.cardInsertedFilter(false), undefined, callback);
    }
    infoBrowserSync() { return CoreService.platformInfo(); }
    getUrl() { return this.url; }
    version() {
        return Promise.resolve('%%GULP_INJECT_VERSION%%');
    }
}
exports.CoreService = CoreService;
//# sourceMappingURL=CoreService.js.map