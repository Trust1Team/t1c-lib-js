"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientService_1 = require("./ClientService");
class DataContainerUtil {
    constructor() { }
    static setupDataContainers(containers) {
        let client = ClientService_1.ClientService.getClient();
        containers.forEach(ct => {
            if (ct.type === 'data') {
                ct.path = '/' + ct.name;
                client[ct.name] = client.pf().createDataContainer(ct.path);
            }
        });
    }
}
exports.DataContainerUtil = DataContainerUtil;
//# sourceMappingURL=DataContainerUtil.js.map