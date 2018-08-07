import { ClientService } from './../../../scripts/util/ClientService';
import { GCLClient } from './../../../scripts/core/GCLLib';
import { GCLConfig } from './../../../scripts/core/GCLConfig';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

describe('Client Service', () => {

    describe('can store the current client instance and retrieve it later', function () {
        let config: GCLConfig = new GCLConfig({});
        const client = new GCLClient(config, false);

        test('stores a given client instance', () => {
            ClientService.setClient(client);
        });

        test('retrieves the same instance at a later time', () => {
            const retrieved = ClientService.getClient();
            expect(retrieved).toEqual(client);
        });
    });
});
