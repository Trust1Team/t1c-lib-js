/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import { GCLConfig } from '../../../../../scripts/core/GCLConfig';
import { LocalConnection } from '../../../../../scripts/core/client/Connection';
import { PluginFactory } from '../../../../../scripts/plugins/PluginFactory';
import { Pkcs11ModuleConfig } from '../../../../../scripts/plugins/smartcards/pkcs11/pkcs11Model';
import { PubKeyService } from '../../../../../scripts/util/PubKeyService';

describe('PKCS#11 Container', () => {
    const gclConfig = new GCLConfig({ pkcs11Config: new Pkcs11ModuleConfig('linux', 'mac', 'win ') });
    const failConfig = new GCLConfig({ pkcs11Config:  new Pkcs11ModuleConfig('fail', 'not there', 'wrong ') });
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const failConnection: LocalConnection = new LocalConnection(failConfig);
    const pkcs11 = new PluginFactory('', connection).createPKCS11();
    const defaultPkcs11 = new PluginFactory('', connection).createPKCS11();
    const failPkcs11 = new PluginFactory('', failConnection).createPKCS11();
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        PubKeyService.setPubKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n' +
                                'FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n' +
                                'xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n' +
                                'gwQco1KRMDSmXSMkDwIDAQAB\n');
    });

    afterEach(() => {
        mock.restore();
    });

    describe('certificates', function () {
        beforeEach(function () {
            mock.onPost('containers/pkcs11/certificates',
                { module: 'mac', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Cert 1', id: '1' }, { base64: 'Cert 2', id: '2' }], success: true }];
            });
            mock.onPost('containers/pkcs11/certificates',
                { module: 'linux', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Cert 1', id: '1' }, { base64: 'Cert 2', id: '2' }], success: true }];
            });
            mock.onPost('containers/pkcs11/certificates',
                { module: 'win', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Cert 1', id: '1' }, { base64: 'Cert 2', id: '2' }], success: true }];
            });
        });

        it('makes the correct call for certificates data', () => {
            return pkcs11.certificates( 1, { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('base64').eq('Cert 1');
                expect(res.data[1]).to.have.property('base64').eq('Cert 2');
            });
        });
    });

    describe('info', function () {
        beforeEach(function () {
            mock.onPost('containers/pkcs11/info',
                { module: 'mac' }).reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
            mock.onPost('containers/pkcs11/info',
                { module: 'linux' }).reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
            mock.onPost('containers/pkcs11/info',
                { module: 'win' }).reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
        });

        it('makes the correct call for info data', () => {
            return pkcs11.info().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Info Data');
            });
        });
    });

    describe('signData', function () {
        beforeEach(function () {
            mock.onPost('containers/pkcs11/sign').reply((config) => {
                const data = JSON.parse(config.data);
                if (data.module === 'mac' || data.module === 'linux' || data.module === 'win' ) {
                    return [ 200, { data, success: true }];
                } else if (data.module === '/usr/local/lib/libeTPkcs11.dylib' ||
                            data.module === '/usr/local/lib/libeTPkcs11.so' ||
                            data.module === 'C:\\Windows\\System32\\eTPKCS11.dll') {
                    return [ 200, { data, source: 'Default', success: true }];
                } else {
                    return [404];
                }
            });
        });

        it('makes the correct call for slot data', () => {
            const certId = '1';
            const pin = '1234';
            const data = 'thedata';
            const algo = 'sha1';
            const slotId = 1;

            return pkcs11.signData({ pin, slot_id: slotId, cert_id: certId, data, algorithm_reference: algo }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).not.to.have.property('source');

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data).to.have.property('id').eq(certId);
                expect(res.data).to.have.property('slot_id').eq(slotId);
                expect(res.data).to.have.property('pin');
                expect(res.data).to.have.property('data').eq(data);
                expect(res.data).to.have.property('digest').eq(algo);
            });
        });
    });

    describe('slots', function () {
        beforeEach(function () {
            mock.onPost('containers/pkcs11/slots',
                { module: 'mac' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Slot Data', success: true }];
                }
            });
            mock.onPost('containers/pkcs11/slots',
                { module: 'linux' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Slot Data', success: true }];
                }
            });
            mock.onPost('containers/pkcs11/slots',
                { module: 'win' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Slot Data', success: true }];
                }
            });

            // defaults
            mock.onPost('containers/pkcs11/slots',
                { module: '/usr/local/lib/libeTPkcs11.dylib' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Default Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Default Slot Data', success: true }];
                }
            });
            mock.onPost('containers/pkcs11/slots',
                { module: '/usr/local/lib/libeTPkcs11.so' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Default Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Default Slot Data', success: true }];
                }
            });
            mock.onPost('containers/pkcs11/slots',
                { module: 'C:\\Windows\\System32\\eTPKCS11.dll' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Default Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Default Slot Data', success: true }];
                }
            });
        });

        it('makes the correct call for slot data', () => {
            return pkcs11.slots().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Slot Data');
            });
        });

        it('makes the correct call for slot data with token present', () => {
            return pkcs11.slotsWithTokenPresent().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Slot Data With Token Present');
            });
        });
    });

    describe('token', function () {
        beforeEach(function () {
            mock.onPost('containers/pkcs11/token', { slot_id: 1, module: 'mac' }).reply((config) => {
                return [ 200, { data: 'Token Data', success: true }];
            });
            mock.onPost('containers/pkcs11/token', { slot_id: 1, module: 'linux' }).reply((config) => {
                return [ 200, { data: 'Token Data', success: true }];
            });
            mock.onPost('containers/pkcs11/token', { slot_id: 1, module: 'win' }).reply((config) => {
                return [ 200, { data: 'Token Data', success: true }];
            });
        });

        it('makes the correct call for token data', () => {
            return pkcs11.token(1).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Token Data');
            });
        });
    });

});
