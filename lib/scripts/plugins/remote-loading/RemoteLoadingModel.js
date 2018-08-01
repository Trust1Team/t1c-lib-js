"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../core/service/CoreModel");
class APDU {
    constructor(cla, ins, p1, p2, data, le) {
        this.cla = cla;
        this.ins = ins;
        this.p1 = p1;
        this.p2 = p2;
        this.data = data;
        this.le = le;
    }
}
exports.APDU = APDU;
class CommandResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.CommandResponse = CommandResponse;
class CommandsResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.CommandsResponse = CommandsResponse;
class Command {
    constructor(sw, tx, rx) {
        this.sw = sw;
        this.tx = tx;
        this.rx = rx;
    }
}
exports.Command = Command;
//# sourceMappingURL=RemoteLoadingModel.js.map