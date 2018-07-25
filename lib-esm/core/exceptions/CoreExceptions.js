import { ObjectUtil } from '../../util/ObjectUtil';
var RestException = (function () {
    function RestException(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil.removeNullAndUndefinedFields(this);
    }
    return RestException;
}());
export { RestException };
//# sourceMappingURL=CoreExceptions.js.map