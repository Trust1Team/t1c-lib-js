"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectUtil {
    static removeNullAndUndefinedFields(obj) {
        Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
    }
}
exports.ObjectUtil = ObjectUtil;
//# sourceMappingURL=ObjectUtil.js.map