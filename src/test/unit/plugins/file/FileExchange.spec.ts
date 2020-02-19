import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {AbstractFileExchange, GCLConfig, LocalConnection, PluginFactory, Type} from '../../../..';


let mock: MockAdapter;
let gclconfig: GCLConfig;
let connection: LocalConnection;
let filex: AbstractFileExchange;

gclconfig = new GCLConfig({});
let activecontainers = new Map<string, string[]>();
activecontainers.set('file-exchange', ['file-exchange-v1-1-0']);
gclconfig.activeContainers = activecontainers;
connection = new LocalConnection(gclconfig);
filex = new PluginFactory('', connection).createFileExchange(true);

describe('File Exchange', () => {
    beforeEach(() => {
        mock = new MockAdapter(axios);
        const mockresponse = {
            data: new Type('1', 'testent', 'type', '/'),
            success: true
        };
        mock.onPost('/file-exchange-v1-1-0/create-type', {entity: 'testent', type: 'testtype'}).reply(200, mockresponse);

    });

    afterEach(() => {
        mock.restore();
    });
    test('create a new type and verifies response', () => {
        filex.createType('testent', 'testtype').then(res => {
            expect(res).toHaveProperty('success');
            expect(res).toHaveProperty('data');
            expect(res.data).toHaveProperty('entity');
            expect(res.data.entity).toBe('testent');
        });
    });
});
