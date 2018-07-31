import { ClientService } from './ClientService';
var DataContainerUtil = (function () {
    function DataContainerUtil() {
    }
    DataContainerUtil.setupDataContainers = function (containers) {
        var client = ClientService.getClient();
        containers.forEach(function (ct) {
            if (ct.type === 'data') {
                ct.path = '/' + ct.name;
                client[ct.name] = client.pf().createDataContainer(ct.path);
            }
        });
    };
    return DataContainerUtil;
}());
export { DataContainerUtil };
//# sourceMappingURL=DataContainerUtil.js.map