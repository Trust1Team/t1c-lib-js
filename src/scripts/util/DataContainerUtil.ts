
import { ClientService } from './ClientService';


export class DataContainerUtil {
    // constructor
    constructor() {}

    // TODO switch to DSContainer[]
    public static setupDataContainers(containers: { path?: string, id: string, name: string, version: string, type?: string }[]): void {
        // go through list and find data containers
        // for each container found, spin up data container handler and attach to client
        let client = ClientService.getClient();
        containers.forEach(ct => {
            // detect data containers
            if (ct.type === 'data') {
                // make sure the path starts with a slash
                ct.path = '/' + ct.name;
                client[ct.name] = client.pf().createDataContainer(ct.path);
            }
        });
    }
}
