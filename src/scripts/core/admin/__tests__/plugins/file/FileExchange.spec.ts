/**
 * @author Michallis Pashidis
 * @since 2018
 */
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {LocalConnection, PluginFactory, GCLConfig, GCLClient, AbstractFileExchange} from '../../../../../..';

let mock: MockAdapter;
let gclconfig: GCLConfig;
let connection: LocalConnection;
let filex: AbstractFileExchange;
let client: GCLClient;

beforeAll(() => {
    gclconfig = new GCLConfig({});
    GCLClient.initialize(gclconfig);
    connection = new LocalConnection(gclconfig);
    filex = new PluginFactory('', connection).createFileExchange();
    GCLClient.initialize(gclconfig).then(res => {
        client = res;
    });
});

describe('File Exchange', () => {
    beforeEach(() => {
        mock = new MockAdapter(axios);

        const mockresponse = {
            data: {
                activated: true,
                arch: 'x86_64',
                citrix: false,
                consent: false,
                containers: [
                    {
                        name: 'beid',
                        status: 'INSTALLED',
                        version: 'v2.1.1'
                    },
                    {
                        name: 'emv',
                        status: 'INSTALLED',
                        version: 'v2.1.0'
                    },
                    {
                        name: 'readerapi',
                        status: 'INSTALLED',
                        version: 'v2.1.0'
                    },
                    {
                        name: 'file-exchange',
                        status: 'INSTALLED',
                        version: 'v1.1.0'
                    },
                    {
                        name: 'pkcs11',
                        status: 'INSTALLED',
                        version: 'v2.1.1'
                    },
                    {
                        name: 'oberthur',
                        status: 'INSTALLED',
                        version: 'v2.0.0'
                    },
                    {
                        name: 'luxtrust',
                        status: 'INSTALLED',
                        version: 'v2.1.1'
                    },
                    {
                        name: 'luxeid',
                        status: 'INSTALLED',
                        version: 'v2.1.1'
                    }
                ],
                log_expose_level: 'public',
                log_level: 'info',
                os: 'macOS',
                osid: 'macos',
                osversion: '10.13.6',
                uid: 'B69D99733DF4363B',
                version: '2.0.3'
            },
            success: true
        };
        mock.onGet('/').reply(200, mockresponse);
        mock.onGet('/v2/').reply(200, mockresponse);

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
