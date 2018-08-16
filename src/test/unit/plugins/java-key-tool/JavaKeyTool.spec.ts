import MockAdapter from 'axios-mock-adapter';
import {AbstractJavaKeyTool, GCLConfig, LocalConnection, PluginFactory, Type} from '../../../../index';
import axios from 'axios';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


let mock: MockAdapter;
let gclconfig: GCLConfig;
let connection: LocalConnection;
let jks: AbstractJavaKeyTool;

gclconfig = new GCLConfig({});
let activecontainers = new Map<string, string[]>();
activecontainers.set('java-keytool', ['java-keytool-v1-0-0']);
gclconfig.activeContainers = activecontainers;
connection = new LocalConnection(gclconfig);
jks = new PluginFactory('', connection).createJavaKeyTool();

describe('Java key tool', () => {
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    test('generate a key pair', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/genkeypair', {entity: 't1t', keystore: 't1t.jks', type: 'test'}).reply(200, {
                data: '/Users/t1t/Documents/t1t.jks',
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test'
        };

        jks.generateKeyPair(body).then(res => {
            expect(res).toHaveProperty('success');
            expect(res).toHaveProperty('data');
            expect(res.data).toBe('/Users/t1t/Documents/t1t.jks');
        }).catch(err => {
            // console.log(err)
        });
    });

    test('generate certificate request', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/certreq​', {entity: 't1t', keystore: 't1t.jks', type: 'test'}).reply(200, {
                data: {
                    base64: 'base64Value'
                },
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test'
        };

        jks.GenerateCertificateRequest(body).then(res => {
            expect(res).toHaveProperty('success');
            expect(res).toHaveProperty('data');
            expect(res.data).toHaveProperty('base64', 'base64Value');
        }).catch(err => {
            // console.log(err)
        });
    });

    test('Import certificate', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/importcert', {entity: 't1t', keystore: 't1t.jks', type: 'test'}).reply(200, {
                data: true,
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test'
        };

        jks.ImportCertificate(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', true);
        }).catch(err => {
            // console.log(err)
        });
    });
});
