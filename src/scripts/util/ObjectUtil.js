"use strict";
/**
 * @author Maarten Somers
 * @since 2018
 */
exports.__esModule = true;
var ObjectUtil = /** @class */ (function () {
    function ObjectUtil() {
    }
    ObjectUtil.removeNullAndUndefinedFields = function (obj) {
        Object.keys(obj).forEach(function (key) { return !obj[key] && delete obj[key]; });
    };
    return ObjectUtil;
}());
exports.ObjectUtil = ObjectUtil;
