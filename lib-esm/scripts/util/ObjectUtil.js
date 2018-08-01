export class ObjectUtil {
    static removeNullAndUndefinedFields(obj) {
        Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
    }
}
//# sourceMappingURL=ObjectUtil.js.map