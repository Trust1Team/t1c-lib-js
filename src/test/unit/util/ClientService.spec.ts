/**
 * @author Maarten Somers
 * @since 2018
 */

import { expect } from 'chai';
import { GCLConfig } from '../../../scripts/core/GCLConfig';
import { GCLClient } from '../../../scripts/core/GCLLib';
import { ClientService } from '../../../scripts/util/ClientService';

describe('Client Service', () => {

    describe('can store the current client instance and retrieve it later', function () {
        let config: GCLConfig = new GCLConfig({});
        const client = new GCLClient(config, false);

        it('stores a given client instance', () => {
            ClientService.setClient(client);
        });

        it('retrieves the same instance at a later time', () => {
            const retrieved = ClientService.getClient();
            expect(retrieved).to.eq(client);
        });
    });
});
