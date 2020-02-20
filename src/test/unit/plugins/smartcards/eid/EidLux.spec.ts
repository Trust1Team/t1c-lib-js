import { LocalConnection } from './../../../../../scripts/core/client/Connection';
import { GCLConfig } from './../../../../../scripts/core/GCLConfig';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PubKeyService } from '../../../../../scripts/util/PubKeyService';
import { AbstractEidLUX } from '../../../../../scripts/plugins/smartcards/eid/lux/EidLuxModel';
import { PluginFactory } from '../../../../../scripts/plugins/PluginFactory';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

describe('Luxembourg eID Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('luxeid', ['luxeid-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    PubKeyService.setPubKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n' +
        'FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n' +
        'xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n' +
        'gwQco1KRMDSmXSMkDwIDAQAB\n');
    const lux: AbstractEidLUX = new PluginFactory('', connection).createEidLUX('123', '1234');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:34752/v3/card-readers/123').reply(() => {
            return [ 200, { data: { pinpad: false }, success: true }];
        });
    });

    afterEach(() => {
        mock.restore();
    });

    describe('allData', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: { authentication_certificate: 'All Data' }, success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for allData', () => {
            return lux.allData({ filters: [], parseCerts: false }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('authentication_certificate');
                expect(res.data.authentication_certificate).toHaveProperty('base64');
                expect(res.data.authentication_certificate.base64).toEqual('All Data');
            });
        });
    });

    describe('allCerts', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123/certificates').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: { authentication_certificate: 'AllCert Data' }, success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for allData', () => {
            return lux.allCerts({ filters: [], parseCerts: false }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('authentication_certificate');
                expect(res.data.authentication_certificate).toHaveProperty('base64');
                expect(res.data.authentication_certificate.base64).toEqual('AllCert Data');
            });
        });
    });

    describe('biometric', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123/biometric').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: 'Biometric Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for biometric data', () => {
            return lux.biometric().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Biometric Data');
            });
        });
    });

    describe('picture', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123/picture').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: 'Picture Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for picture data', () => {
            return lux.picture().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Picture Data');
            });
        });
    });

    describe('getCertificate', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123/certificates/authentication').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: 'Auth Cert Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for a certificate', () => {
            return lux.authenticationCertificate({ parseCerts: false }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('base64', 'Auth Cert Data');
            });
        });
    });

    describe('getCertificateArray', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123/certificates/root').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: ['Cert 1', 'Cert 2'], success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for a certificate array data', () => {
            return lux.rootCertificate({ parseCerts: false }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data[0]).toHaveProperty('base64', 'Cert 1');
                expect(res.data[1]).toHaveProperty('base64', 'Cert 2');
            });
        });
    });

    describe('signatureImage', function () {
        beforeEach(function () {
            mock.onGet('containers/luxeid-v2-1-1/123/signature-image').reply((config) => {
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length) {
                    return [ 200, { data: 'Signature Image Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for signature image data', () => {
            return lux.signatureImage().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Signature Image Data');
            });
        });
    });

    describe('verifyPin', function () {
        beforeEach(function () {
            mock.onPost('containers/luxeid-v2-1-1/123/verify-pin').reply((config) => {
                let data = JSON.parse(config.data);
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length && data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Verify Pin Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call to verify pin', () => {
            return lux.verifyPin({ pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Verify Pin Data');
            });
        });
    });


    describe('authenticate', function () {
        beforeEach(function () {
            mock.onPost('containers/luxeid-v2-1-1/123/authenticate').reply((config) => {
                let data = JSON.parse(config.data);
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length && data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Authenticate Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call to authenticate', () => {
            return lux.authenticate({ pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Authenticate Data');
            });
        });
    });

    describe('signData', function () {
        beforeEach(function () {
            mock.onPost('containers/luxeid-v2-1-1/123/sign').reply((config) => {
                let data = JSON.parse(config.data);
                let headers = config.headers;
                if (headers['X-Encrypted-Pin'] && headers['X-Encrypted-Pin'].length && data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Sign Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call to sign data', () => {
            return lux.signData({ pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Sign Data');
            });
        });
    });
});
