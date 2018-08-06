"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientService_1 = require("./ClientService");
var DataContainerUtil = (function () {
    function DataContainerUtil() {
    }
    DataContainerUtil.setupDataContainers = function (containers) {
        var client = ClientService_1.ClientService.getClient();
        containers.forEach(function (ct) {
            if (ct.type === 'data') {
                ct.path = '/' + ct.name;
                client[ct.name] = client.pf().createDataContainer(ct.path);
            }
        });
    };
    return DataContainerUtil;
}());
exports.DataContainerUtil = DataContainerUtil;
//# sourceMappingURL=DataContainerUtil.js.map