/**
 * @author Maarten Somers
 * @since 2018
 */

import { ClientService } from './ClientService';

export { DataContainerUtil };

class DataContainerUtil {
    // constructor
    constructor() {}

    public static setupDataContainers(containers: [{ path?: string, id: string, name: string, version: string, type: string }]): void {
        // go through list and find data containers
        // for each container found, spin up data container handler and attach to client
        let client = ClientService.getClient();
        containers.forEach(ct => {
            // detect data containers
            if (ct.type === 'data') {
                // make sure the path starts with a slash
                ct.path = '/' + ct.id;
                client[ct.id] = client.pf().createDataContainer(ct.path);
            }
        });
    }
}
