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

    test('Export certificate', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/exportcert', {entity: 't1t', keystore: 't1t.jks', type: 'test', alias: 'selfsigned', file: 'cert.pem'}).reply(200, {
                data: {
                    alias: 'selfsigned',
                    path: 'documents/t1t/cert.pem'
                },
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            file: 'cert.pem'
        };

        jks.ExportCertificate(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data');
            expect(res.data).toHaveProperty('alias', 'selfsigned');
            expect(res.data).toHaveProperty('path', 'documents/t1t/cert.pem');
        }).catch(err => {
            // console.log(err)
        });
    });

    test('Change keystore password', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/storepasswd​', {entity: 't1t', keystore: 't1t.jks', type: 'test', alias: 'selfsigned', new_password: '123456'}).reply(200, {
                data: true,
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'selfsigned',
            new_password: '123456'
        };

        jks.ChangeKeystorePassword(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', true);
        }).catch(err => {
            // console.log(err)
        });
    });

    test('Change key password', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/keypasswd​', {entity: 't1t', keystore: 't1t.jks', type: 'test', alias: 'selfsigned', new_password: '123456'}).reply(200, {
                data: true,
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'selfsigned',
            new_password: '123456'
        };

        jks.ChangeKeyPassword(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', true);
        }).catch(err => {
            // console.log(err)
        });
    });

    test('Change alias', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/changealias', {entity: 't1t', keystore: 't1t.jks', type: 'test', alias: 'selfsigned', destalias: 'signed'}).reply(200, {
                data: true,
                success: true
            });
        })
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'selfsigned',
            destalias: 'signed'
        };

        jks.ChangeKeyPassword(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', true);
        }).catch(err => {
            // console.log(err)
        });
    });
});
