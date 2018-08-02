import {AdminService, ContainerSyncRequest, GCLConfig, GCLConfigOptions, LocalAdminConnection, LocalAuthAdminConnection} from '../../../../index';
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


    test('makes the correct call to set pub key', () => {
        beforeEach(function () {
            mock.onPut('/admin/certificate', {encryptedPublicKey: 'pubkey', encryptedAesKey: 'aeskey'}).reply(() => {
                return [200, {data: 'Set Pub Key Data', success: true}];
            });
        });

        return admin.setPubKey({encryptedAesKey: 'aeskey', encryptedPublicKey: 'pubkey', ns: ''}).then(res => {
            expect(res).toHaveProperty('success', true);

            expect(res).toHaveProperty('data', 'Set Pub Key Data');
        });
    });


    test('updateContainerConfig', () => {
        beforeEach(function () {
            mock.onPost('/admin/containers', 'containerConfig').reply(() => {
                return [200, {data: 'Update Container Config', success: true}];
            });
        });

        return admin.updateContainerConfig(new ContainerSyncRequest(undefined)).then(res => {
            expect(res).toHaveProperty('success', true);

            expect(res).toHaveProperty('data', 'Update Container Config');
        });
    });
});
