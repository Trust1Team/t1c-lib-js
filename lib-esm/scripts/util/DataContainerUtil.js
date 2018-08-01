import { ClientService } from './ClientService';
export class DataContainerUtil {
    constructor() { }
    static setupDataContainers(containers) {
        let client = ClientService.getClient();
        containers.forEach(ct => {
            if (ct.type === 'data') {
                ct.path = '/' + ct.name;
                client[ct.name] = client.pf().createDataContainer(ct.path);
            }
        });
    }
}
//# sourceMappingURL=DataContainerUtil.js.map