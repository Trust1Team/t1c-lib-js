/**
 * @author Maarten Somers
 * @since 2018
 */

import { expect } from 'chai';
import { GCLConfig } from '../../../scripts/core/GCLConfig';
import { GCLClient } from '../../../scripts/core/GCLLib';
import { ClientService } from '../../../scripts/util/ClientService';
import { DataContainerUtil } from '../../../scripts/util/DataContainerUtil';

describe('Data Container Utility', () => {

    describe('create data containers when needed', function () {
        let config: GCLConfig = new GCLConfig({});
        let client = new GCLClient(config, false);
        ClientService.setClient(client);

        it('creates a data container for data container type', () => {
            let dataContainer = [{ id: 'container-a-v2', name: 'test', version: 'v2.0.0', type: 'data' }];
            DataContainerUtil.setupDataContainers(dataContainer);
            expect(client).to.have.property('test');
        });

        it('does nothing for other container types', () => {
            let regularContainer = [{ id: 'container-b-v2', name: 'demo', version: 'v2.0.0', type: 'regular' }];
            DataContainerUtil.setupDataContainers(regularContainer);
            expect(client).to.not.have.property('demo');
        });
    });
});
