"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    static error(err, callback) {
        if (callback && typeof callback === 'function') {
            callback(err, null);
        }
        return Promise.reject(err);
    }
    static response(data, callback) {
        if (callback && typeof callback === 'function') {
            callback(null, data);
        }
        return Promise.resolve(data);
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=ResponseHandler.js.map