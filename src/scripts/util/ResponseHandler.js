"use strict";
exports.__esModule = true;
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler() {
    }
    ResponseHandler.error = function (err, callback) {
        if (callback && typeof callback === 'function') {
            callback(err, null);
        }
        return Promise.reject(err);
    };
    ResponseHandler.response = function (data, callback) {
        if (callback && typeof callback === 'function') {
            callback(null, data);
        }
        return Promise.resolve(data);
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
