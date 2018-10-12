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
        });
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
        });
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
        });
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'test'
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
        });
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            file: 'cert.pem',
            alias: 'test'
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
        });
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
        });
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
        });
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'selfsigned',
            destalias: 'signed'
        };

        jks.ChangeAlias(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', true);
        }).catch(err => {
            // console.log(err)
        });
    });

    test('List entries', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/list', {entity: 't1t', keystore: 't1t.jks', type: 'test', alias: 'selfsigned'}).reply(200, {
                data: [
                    {
                        alias: ' ca',
                        base64: 'MIICdjCCAjSgAwIBAgIEVp2pPzALBgcqhkjOOAQDBQAwDTELMAkGA1UEAxMCQ0EwHhcNMTgwNzI2MDk0MjA0WhcNMTgxMDI0MDk0MjA0WjANMQswCQYDVQQDEwJDQTCCAbcwggEsBgcqhkjOOAQBMIIBHwKBgQD9f1OBHXUSKVLfSpwu7OTn9hG3UjzvRADDHj+AtlEmaUVdQCJR+1k9jVj6v8X1ujD2y5tVbNeBO4AdNG/yZmC3a5lQpaSfn+gEexAiwk+7qdf+t8Yb+DtX58aophUPBPuD9tPFHsMCNVQTWhaRMvZ1864rYdcq7/IiAxmd0UgBxwIVAJdgUI8VIwvMspK5gqLrhAvwWBz1AoGBAPfhoIXWmz3ey7yrXDa4V7l5lK+7+jrqgvlXTAs9B4JnUVlXjrrUWU/mcQcQgYC0SRZxI+hMKBYTt88JMozIpuE8FnqLVHyNKOCjrh4rs6Z1kW6jfwv6ITVi8ftiegEkO8yk8b6oUZCJqIPf4VrlnwaSi2ZegHtVJWQBTDv+z0kqA4GEAAKBgFkkLxsYxCUUkMRmOB7TN9l5R1QiZhZgfJQtEZExgWWH2gO3qIZ7IinLU7hTBIPr21PlmoUs+TwtTmSbCi6bTUjELCXRZUepsRNLPgo3nFMY3GzKTLTFR7pqNpSMQw+B+pXW9DSoIffXBrouWDS4MpSuJEXZnX+KR6v21VVSCE9DoyEwHzAdBgNVHQ4EFgQUM6mX6OK6gL4KRyY5eyZTPJLHZpAwCwYHKoZIzjgEAwUAAy8AMCwCFA59m6LtWk1LrsqC4c1tAIdViv24AhReWz0JnfLPWoMLtPHghmfwu9zsNw=='
                    },
                    {
                        alias: ' selfsigned',
                        base64: 'MIIDVTCCAj2gAwIBAgIEBVoiuzANBgkqhkiG9w0BAQsFADBbMQswCQYDVQQGEwJCRTEJMAcGA1UECBMAMQ4wDAYDVQQHEwVHaGVudDETMBEGA1UEChMKVHJ1c3QxVGVhbTEMMAoGA1UECxMDVDFUMQ4wDAYDVQQDEwVKb25hczAeFw0xODA3MjUxMjE0NTBaFw0xOTA3MjAxMjE0NTBaMFsxCzAJBgNVBAYTAkJFMQkwBwYDVQQIEwAxDjAMBgNVBAcTBUdoZW50MRMwEQYDVQQKEwpUcnVzdDFUZWFtMQwwCgYDVQQLEwNUMVQxDjAMBgNVBAMTBUpvbmFzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSz+9/Gbd9ndhJqLD7gD89hRwBWLHQlZSyFhmnxgJZBuruAz3I3sLuA7XDBXZ1DDCAuksE5r1opQrjHy2UVx0UA6JHnl5cLh9SuwQDNAAW5oFpUGsTQ3Owm3KktDTFROCi33+TzfpwW9x8tTwOEaMGKWxDI2qOxwrhFfmmquUmjNikDLPqNQL40Zh6Ir0jADSncijYDGfGapn9uHzmhpI+TPtGkc7/pG/mrPR142CvuykCsjFQi+fCElxoDpMV2WoJch7sHoymEilxE5gApHfjHuHQWPG03xPT9VG+4au4wy97nttMiQk7puWrMzKL27lI0RtdUKmsWvKMsk9tIQPwIDAQABoyEwHzAdBgNVHQ4EFgQUh2U42AGSxtvnWs2V7A89PpaUWSswDQYJKoZIhvcNAQELBQADggEBABElpAN/tTH5Ya36CRv9M/0RTa4BWdBkrc2pv2sss8b0tPYD5BuPqvBn2QsMULpyDUWKRu2SuoIryRyULl41dpxUrldQgt/q00GY4sIha2RcNdtAkDwddAqyUEBGIn0i9UPAABObhjDGAGFNTfpURAtdnK/Do6Qbc+LmhYax25CRKg7IO05VN0nbxRji1w0ZfdeWrTzlsEOOL0DBRPA/DjZ5ZXLAx1NunU5C8v2MtQQ5+zluSZAyjhfFfi/MBWNEFRZRmCw1v8C7O9lHuMLdZXxUJDCuwuh8qvijSbWdSbDV9jdfFNmgqrsGHrTWF3AOeHC1wPSjhv9JZar+ao6l7AI='
                    }
                ],
                success: true
            });
        });
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'selfsigned'
        };

        jks.ListEntries(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data');
            expect(res.data[0]).toHaveProperty('base64', 'MIICdjCCAjSgAwIBAgIEVp2pPzALBgcqhkjOOAQDBQAwDTELMAkGA1UEAxMCQ0EwHhcNMTgwNzI2MDk0MjA0WhcNMTgxMDI0MDk0MjA0WjANMQswCQYDVQQDEwJDQTCCAbcwggEsBgcqhkjOOAQBMIIBHwKBgQD9f1OBHXUSKVLfSpwu7OTn9hG3UjzvRADDHj+AtlEmaUVdQCJR+1k9jVj6v8X1ujD2y5tVbNeBO4AdNG/yZmC3a5lQpaSfn+gEexAiwk+7qdf+t8Yb+DtX58aophUPBPuD9tPFHsMCNVQTWhaRMvZ1864rYdcq7/IiAxmd0UgBxwIVAJdgUI8VIwvMspK5gqLrhAvwWBz1AoGBAPfhoIXWmz3ey7yrXDa4V7l5lK+7+jrqgvlXTAs9B4JnUVlXjrrUWU/mcQcQgYC0SRZxI+hMKBYTt88JMozIpuE8FnqLVHyNKOCjrh4rs6Z1kW6jfwv6ITVi8ftiegEkO8yk8b6oUZCJqIPf4VrlnwaSi2ZegHtVJWQBTDv+z0kqA4GEAAKBgFkkLxsYxCUUkMRmOB7TN9l5R1QiZhZgfJQtEZExgWWH2gO3qIZ7IinLU7hTBIPr21PlmoUs+TwtTmSbCi6bTUjELCXRZUepsRNLPgo3nFMY3GzKTLTFR7pqNpSMQw+B+pXW9DSoIffXBrouWDS4MpSuJEXZnX+KR6v21VVSCE9DoyEwHzAdBgNVHQ4EFgQUM6mX6OK6gL4KRyY5eyZTPJLHZpAwCwYHKoZIzjgEAwUAAy8AMCwCFA59m6LtWk1LrsqC4c1tAIdViv24AhReWz0JnfLPWoMLtPHghmfwu9zsNw==');
            expect(res.data[0]).toHaveProperty('alias', 'ca');
            expect(res.data[1]).toHaveProperty('base64', 'MIIDVTCCAj2gAwIBAgIEBVoiuzANBgkqhkiG9w0BAQsFADBbMQswCQYDVQQGEwJCRTEJMAcGA1UECBMAMQ4wDAYDVQQHEwVHaGVudDETMBEGA1UEChMKVHJ1c3QxVGVhbTEMMAoGA1UECxMDVDFUMQ4wDAYDVQQDEwVKb25hczAeFw0xODA3MjUxMjE0NTBaFw0xOTA3MjAxMjE0NTBaMFsxCzAJBgNVBAYTAkJFMQkwBwYDVQQIEwAxDjAMBgNVBAcTBUdoZW50MRMwEQYDVQQKEwpUcnVzdDFUZWFtMQwwCgYDVQQLEwNUMVQxDjAMBgNVBAMTBUpvbmFzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSz+9/Gbd9ndhJqLD7gD89hRwBWLHQlZSyFhmnxgJZBuruAz3I3sLuA7XDBXZ1DDCAuksE5r1opQrjHy2UVx0UA6JHnl5cLh9SuwQDNAAW5oFpUGsTQ3Owm3KktDTFROCi33+TzfpwW9x8tTwOEaMGKWxDI2qOxwrhFfmmquUmjNikDLPqNQL40Zh6Ir0jADSncijYDGfGapn9uHzmhpI+TPtGkc7/pG/mrPR142CvuykCsjFQi+fCElxoDpMV2WoJch7sHoymEilxE5gApHfjHuHQWPG03xPT9VG+4au4wy97nttMiQk7puWrMzKL27lI0RtdUKmsWvKMsk9tIQPwIDAQABoyEwHzAdBgNVHQ4EFgQUh2U42AGSxtvnWs2V7A89PpaUWSswDQYJKoZIhvcNAQELBQADggEBABElpAN/tTH5Ya36CRv9M/0RTa4BWdBkrc2pv2sss8b0tPYD5BuPqvBn2QsMULpyDUWKRu2SuoIryRyULl41dpxUrldQgt/q00GY4sIha2RcNdtAkDwddAqyUEBGIn0i9UPAABObhjDGAGFNTfpURAtdnK/Do6Qbc+LmhYax25CRKg7IO05VN0nbxRji1w0ZfdeWrTzlsEOOL0DBRPA/DjZ5ZXLAx1NunU5C8v2MtQQ5+zluSZAyjhfFfi/MBWNEFRZRmCw1v8C7O9lHuMLdZXxUJDCuwuh8qvijSbWdSbDV9jdfFNmgqrsGHrTWF3AOeHC1wPSjhv9JZar+ao6l7AI=');
            expect(res.data[1]).toHaveProperty('alias', 'selfsigned');
        }).catch(err => {
            // console.log(err)
        });
    });

    test('Delete entry', () => {
        beforeEach(() => {
            mock.onPost('containers/java-keytool-v1-0-0/delete', {entity: 't1t', keystore: 't1t.jks', type: 'test', alias: 'selfsigned'}).reply(200, {
                data: true,
                success: true
            });
        });
        const body = {
            entity: 't1t',
            keystore: 't1t.jks',
            type: 'test',
            alias: 'selfsigned'
        };

        jks.DeleteEntry(body).then(res => {
            expect(res).toHaveProperty('success', true);
            expect(res).toHaveProperty('data', true);
        }).catch(err => {
            // console.log(err)
        });
    });
});
