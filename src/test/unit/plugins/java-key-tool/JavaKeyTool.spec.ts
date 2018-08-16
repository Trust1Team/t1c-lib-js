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
})