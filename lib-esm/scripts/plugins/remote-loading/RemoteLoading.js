import * as _ from 'lodash';
import { GenericReaderContainer } from '../smartcards/Card';
export class RemoteLoading extends GenericReaderContainer {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, RemoteLoading.CONTAINER_PREFIX);
    }
    static optionalSessionIdParam(sessionId) {
        if (sessionId && sessionId.length) {
            return { 'session-id': sessionId };
        }
        else {
            return undefined;
        }
    }
    atr(sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.ATR), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }
    apdu(apdu, sessionId, callback) {
        let suffix = this.containerSuffix(RemoteLoading.APDU);
        if (_.isArray(apdu)) {
            suffix = this.containerSuffix(RemoteLoading.APDUS);
        }
        return this.connection.post(this.baseUrl, suffix, apdu, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }
    ccid(feature, command, sessionId, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CCID), { feature, apdu: command }, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }
    ccidFeatures(sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CCID_FEATURES), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }
    command(tx, sessionId, callback) {
        if (_.isArray(tx)) {
            let body = [];
            _.forEach(tx, txElem => { body.push({ tx: txElem }); });
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CMDS), body, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
        }
        else {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.CMD), { tx }, RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
        }
    }
    closeSession(sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.CLOSE_SESSION), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }
    isPresent(sessionId, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(RemoteLoading.IS_PRESENT), RemoteLoading.optionalSessionIdParam(sessionId), undefined, callback);
    }
    openSession(timeout, callback) {
        if (timeout && timeout > 0) {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION), { timeout }, undefined, undefined, callback);
        }
        else {
            return this.connection.post(this.baseUrl, this.containerSuffix(RemoteLoading.OPEN_SESSION), { timeout: this.connection.cfg.defaultSessionTimeout }, undefined, undefined, callback);
        }
    }
}
RemoteLoading.CONTAINER_PREFIX = 'readerapi';
RemoteLoading.ATR = '/atr';
RemoteLoading.APDU = '/apdu';
RemoteLoading.APDUS = '/apdus';
RemoteLoading.CCID = '/ccid';
RemoteLoading.CCID_FEATURES = '/ccid-features';
RemoteLoading.CMD = '/command';
RemoteLoading.CMDS = '/commands';
RemoteLoading.CLOSE_SESSION = '/close-session';
RemoteLoading.IS_PRESENT = '/is-present';
RemoteLoading.OPEN_SESSION = '/open-session';
//# sourceMappingURL=RemoteLoading.js.map