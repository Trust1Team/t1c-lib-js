"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var Options = (function () {
    function Options(parseCerts, filters) {
        this.parseCerts = parseCerts;
        this.filters = filters;
    }
    return Options;
}());
exports.Options = Options;
var RequestOptions = (function () {
    function RequestOptions(parseCerts, params, callback) {
        this.parseCerts = parseCerts;
        this.params = params;
        this.callback = callback;
    }
    return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
var RequestHandler = (function () {
    function RequestHandler() {
    }
    RequestHandler.determineOptions = function (firstParam, secondParam) {
        var result = new RequestOptions(false);
        if (firstParam) {
            if (typeof firstParam === 'function') {
                result.callback = firstParam;
            }
            else {
                result.callback = secondParam;
                if (lodash.has(firstParam, 'parseCerts')) {
                    result.parseCerts = firstParam.parseCerts;
                }
            }
        }
        else {
            if (typeof secondParam === 'function') {
                result.callback = secondParam;
            }
        }
        return result;
    };
    RequestHandler.determineOptionsWithFilter = function (firstParam) {
        var result = new RequestOptions(false, {});
        if (lodash.isArray(firstParam)) {
            if (firstParam.length) {
                result.params.filter = firstParam.join(',');
            }
        }
        else if (lodash.isObject(firstParam)) {
            if (lodash.has(firstParam, 'filters') && lodash.isArray(firstParam.filters)) {
                if (firstParam.filters.length) {
                    result.params.filter = firstParam.filters.join(',');
                }
            }
            if (lodash.has(firstParam, 'parseCerts')) {
                result.parseCerts = firstParam.parseCerts;
            }
        }
        return result;
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=RequestHandler.js.map