import { AdminService } from './../../../scripts/core/admin/admin';
import { LocalAuthAdminConnection, LocalAdminConnection } from './../../../scripts/core/client/Connection';
import { GCLConfig } from './../../../scripts/core/GCLConfig';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('AdminService', () => {
    let gclConfig = new GCLConfig({});
    const connection: LocalAuthAdminConnection = new LocalAuthAdminConnection(gclConfig);
    const noAuthConnection: LocalAdminConnection = new LocalAdminConnection(gclConfig);
    let admin = new AdminService('', connection, noAuthConnection);
    let mock;


    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test('activate', done => {
        const mockresponse = {
            data: 'Activation Data',
            success: true
        };
        mock.onPost('/admin/activate').reply(200, mockresponse);

        return admin.activate().then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', 'Activation Data');
            done();
        });
    });


    test('makes the correct call to get pub key', () => {
        const mockresponse = {
            data:
                {
                    device: 'Device Pub Key',
                    ssl: 'SSL Pub Key'
                },
            success: true
        };
        mock.onGet('/admin/certificate').reply(200, mockresponse);

        return admin.getPubKey().then(res => {
            expect(res).toHaveProperty('success', true);

            expect(res).toHaveProperty('data');
            expect(res.success).toBe(true);

            expect(res).toHaveProperty('data.device', 'Device Pub Key');
            expect(res).toHaveProperty('data.ssl', 'SSL Pub Key');
        });
    });


    test('makes the correct call to set pub key', done => {
        const mockresponse = {data: 'Set Pub Key Data', success: true};
        mock.onPut('/admin/certificate', {encryptedPublicKey: 'pubkey', encryptedAesKey: 'aeskey', ns: ''}).reply(200, mockresponse);

        return admin.setPubKey({encryptedAesKey: 'aeskey', encryptedPublicKey: 'pubkey', ns: ''}).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', 'Set Pub Key Data');
            done();
        });
    });

    // TODO fix body
    // test('updateContainerConfig', done => {
    //     const mockresponse = {data: 'Update Container Config', success: true};
    //     mock.onPost('/admin/containers', {containers: []}).reply(200, mockresponse);
    //
    //     return admin.updateContainerConfig(new ContainerSyncRequest([])).then(res => {
    //         expect(res).toHaveProperty('success', true);
    //
    //         expect(res).toHaveProperty('data', 'Update Container Config');
    //         done();
    //     });
    // });
});
