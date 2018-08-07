import { DataContainerUtil } from './../../../scripts/util/DataContainerUtil';
import { ClientService } from './../../../scripts/util/ClientService';
import { GCLClient } from './../../../scripts/core/GCLLib';
import { GCLConfig } from './../../../scripts/core/GCLConfig';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */
describe('Data Container Utility', () => {

    describe('create data containers when needed', function () {
        let config: GCLConfig = new GCLConfig({});
        let client = new GCLClient(config, false);
        ClientService.setClient(client);

        test('creates a data container for data container type', () => {
            let dataContainer = [{ id: 'container-a-v2', name: 'test', version: 'v2.0.0', type: 'data' }];
            DataContainerUtil.setupDataContainers(dataContainer);
            expect(client).toHaveProperty('test');
        });

        test('does nothing for other container types', () => {
            let regularContainer = [{ id: 'container-b-v2', name: 'demo', version: 'v2.0.0', type: 'regular' }];
            DataContainerUtil.setupDataContainers(regularContainer);
            expect(client).not.toHaveProperty('demo');
        });
    });
});
