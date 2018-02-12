/**
 * @author Maarten Somers
 * @since 2018
 */

import { ClientService } from './ClientService';
import * as _ from 'lodash';

export { DataContainerUtil };

class DataContainerUtil {
    // constructor
    constructor() {}

    public static setupDataContainers(containers: [{ path: string, type: string, property?: string }]): void {
        // go through list and find data containers
        // for each container found, spin up data container handler and attach to client
        let client = ClientService.getClient();
        containers.forEach(ct => {
            // detect data containers
            if (ct.type === 'data') {
                // make sure the path starts with a slash
                if (!_.startsWith(ct.path, '/')) { ct.path = '/' + ct.path; }
                ct.property = 'data' + _.capitalize(_.join(_.drop(ct.path, 1), ''));
                client[ct.property] = client.pf().createDataContainer(ct.path);
            }
        });
    }
}
