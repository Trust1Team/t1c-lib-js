"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectUtil_1 = require("../../util/ObjectUtil");
var RestException = (function () {
    function RestException(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil_1.ObjectUtil.removeNullAndUndefinedFields(this);
    }
    return RestException;
}());
exports.RestException = RestException;
//# sourceMappingURL=CoreExceptions.js.map