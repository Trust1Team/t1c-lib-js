export class ResponseHandler {
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
//# sourceMappingURL=ResponseHandler.js.map