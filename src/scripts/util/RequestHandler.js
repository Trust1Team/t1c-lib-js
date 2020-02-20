"use strict";
/**
 * @author Maarten Somers
 */
exports.__esModule = true;
var Options = /** @class */ (function () {
    function Options(parseCerts, filters) {
        this.parseCerts = parseCerts;
        this.filters = filters;
    }
    return Options;
}());
exports.Options = Options;
var RequestOptions = /** @class */ (function () {
    function RequestOptions(parseCerts, params, callback) {
        this.parseCerts = parseCerts;
        this.params = params;
        this.callback = callback;
    }
    return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
var RequestHandler = /** @class */ (function () {
    function RequestHandler() {
    }
    // TODO deprecate for v3
    // maintains backward compatibility with the old request style
    RequestHandler.determineOptions = function (firstParam, secondParam) {
        var result = new RequestOptions(false);
        if (firstParam) {
            if (typeof firstParam === 'function') {
                result.callback = firstParam;
            }
            else {
                result.callback = secondParam;
                if (firstParam.parseCerts) {
                    result.parseCerts = firstParam.parseCerts;
                }
            }
        }
        else {
            // no first param, check second
            if (typeof secondParam === 'function') {
                result.callback = secondParam;
            }
        }
        return result;
    };
    RequestHandler.determineOptionsWithFilter = function (firstParam) {
        var result = new RequestOptions(false, {});
        if (Array.isArray(firstParam)) {
            // array of strings; assume parse boolean is false
            if (firstParam.length) {
                result.params.filter = firstParam.join(',');
            }
        }
        else if (typeof firstParam === 'object') {
            // not an array, but object
            if (firstParam.filters && Array.isArray(firstParam.filters)) {
                if (firstParam.filters.length) {
                    result.params.filter = firstParam.filters.join(',');
                }
            }
            if (firstParam.parseCerts) {
                result.parseCerts = firstParam.parseCerts;
            }
        }
        return result;
    };
    return RequestHandler;
}());
exports.RequestHandler = RequestHandler;
