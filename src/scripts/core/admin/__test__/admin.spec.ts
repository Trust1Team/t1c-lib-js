import {AdminService, ContainerSyncRequest, GCLConfig, GCLConfigOptions, LocalAdminConnection, LocalAuthAdminConnection} from '../../../../index';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const defaults = {
    gclUrl: 'https://localhost:10443/v2',
    dsContextPath: '/trust1team/gclds/v2',
    ocvContextPath: '/trust1team/ocv-api/v1',
    dsContextPathTestMode: '/gcl-ds-web/v2',
    dsFileContextPath: '/trust1team/gclds-file/v1',
    tokenExchangeContextPath: '/apiengineauth/v1',
    lang: 'en',
    implicitDownload: false,
    localTestMode: false,
    forceHardwarePinpad: false,
    sessionTimeout: 5,
    consentDuration: 1,
    consentTimeout: 10,
    osPinDialog: false,
    containerDownloadTimeout: 30
};
let gclConfig = new GCLConfig(defaults);
const connection: LocalAuthAdminConnection = new LocalAuthAdminConnection(gclConfig);
const noAuthConnection: LocalAdminConnection = new LocalAdminConnection(gclConfig);
let admin = new AdminService('https://localhost:10443/v2', connection, noAuthConnection);
let mock;

beforeEach(() => {
    mock = new MockAdapter(axios);
});

afterEach(() => {
    mock.restore();
});

test('activate', () => {
    return admin.activate().then(res => {
        expect(res).toHaveProperty('success', true);
        expect(res).toHaveProperty('data', 'Activation Data');
    });
});

test('makes the correct call to get pub key', () => {
    beforeEach(function () {
        mock.onGet('/admin/certificate').reply(() => {
            return [200, {data: {device: 'Device Pub Key', ssl: 'SSL Pub Key'}, success: true}];
        });
    });

    return admin.getPubKey().then(res => {
        expect(res).toHaveProperty('success', true);

        expect(res).toHaveProperty('data');
        expect(res.success).toBe('object');

        expect(res).toHaveProperty('device', 'Device Pub Key');
        expect(res).toHaveProperty('ssl', 'Device Pub Key');
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
