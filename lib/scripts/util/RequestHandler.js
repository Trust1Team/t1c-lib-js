"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Options {
    constructor(parseCerts, filters) {
        this.parseCerts = parseCerts;
        this.filters = filters;
    }
}
exports.Options = Options;
class RequestOptions {
    constructor(parseCerts, params, callback) {
        this.parseCerts = parseCerts;
        this.params = params;
        this.callback = callback;
    }
}
exports.RequestOptions = RequestOptions;
class RequestHandler {
    static determineOptions(firstParam, secondParam) {
        let result = new RequestOptions(false);
        if (firstParam) {
            if (typeof firstParam === 'function') {
                result.callback = firstParam;
            }
            else {
                result.callback = secondParam;
                if (_.has(firstParam, 'parseCerts')) {
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
    }
    static determineOptionsWithFilter(firstParam) {
        let result = new RequestOptions(false, {});
        if (_.isArray(firstParam)) {
            if (firstParam.length) {
                result.params.filter = firstParam.join(',');
            }
        }
        else if (_.isObject(firstParam)) {
            if (_.has(firstParam, 'filters') && _.isArray(firstParam.filters)) {
                if (firstParam.filters.length) {
                    result.params.filter = firstParam.filters.join(',');
                }
            }
            if (_.has(firstParam, 'parseCerts')) {
                result.parseCerts = firstParam.parseCerts;
            }
        }
        return result;
    }
}
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=RequestHandler.js.map