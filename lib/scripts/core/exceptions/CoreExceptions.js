"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectUtil_1 = require("../../util/ObjectUtil");
class T1CLibException {
    constructor(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil_1.ObjectUtil.removeNullAndUndefinedFields(this);
    }
}
exports.T1CLibException = T1CLibException;
//# sourceMappingURL=CoreExceptions.js.map