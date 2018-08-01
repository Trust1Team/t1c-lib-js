import { ObjectUtil } from '../../util/ObjectUtil';
export class T1CLibException {
    constructor(status, code, description, client) {
        this.status = status;
        this.code = code;
        this.description = description;
        this.client = client;
        ObjectUtil.removeNullAndUndefinedFields(this);
    }
}
//# sourceMappingURL=CoreExceptions.js.map