import { T1CResponse } from '../../core/service/CoreModel';
export class APDU {
    constructor(cla, ins, p1, p2, data, le) {
        this.cla = cla;
        this.ins = ins;
        this.p1 = p1;
        this.p2 = p2;
        this.data = data;
        this.le = le;
    }
}
export class CommandResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class CommandsResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class Command {
    constructor(sw, tx, rx) {
        this.sw = sw;
        this.tx = tx;
        this.rx = rx;
    }
}
//# sourceMappingURL=RemoteLoadingModel.js.map