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

describe('SafeNet Container', () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const safenet = new PluginFactory('', connection).createSafeNet({ linux: 'linux', mac: 'mac', win: 'win '});
    const defaultSafenet = new PluginFactory('', connection).createSafeNet();
    const failSafenet = new PluginFactory('', connection).createSafeNet({ linux: 'fail', mac: 'not there', win: 'wrong'});
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('certificates', function () {
        beforeEach(function () {
            mock.onPost('plugins/safenet/certificates',
                { module: 'mac', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Cert 1', id: '1' }, { base64: 'Cert 2', id: '2' }], success: true }];
            });
            mock.onPost('plugins/safenet/certificates',
                { module: 'linux', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Cert 1', id: '1' }, { base64: 'Cert 2', id: '2' }], success: true }];
            });
            mock.onPost('plugins/safenet/certificates',
                { module: 'win', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Cert 1', id: '1' }, { base64: 'Cert 2', id: '2' }], success: true }];
            });

            // defaults
            mock.onPost('plugins/safenet/certificates',
                { module: '/usr/local/lib/libeTPkcs11.dylib', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Default 1', id: '1' }, { base64: 'Default 2', id: '2' }], success: true }];
            });
            mock.onPost('plugins/safenet/certificates',
                { module: '/usr/local/lib/libeTPkcs11.so', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Default 1', id: '1' }, { base64: 'Default 2', id: '2' }], success: true }];
            });
            mock.onPost('plugins/safenet/certificates',
                { module: 'C:\\Windows\\System32\\eTPKCS11.dll', slot_id: 1 }).reply(() => {
                return [ 200, { data: [{ base64: 'Default 1', id: '1' }, { base64: 'Default 2', id: '2' }], success: true }];
            });
        });

        it('makes the correct call for certificates data', () => {
            return safenet.certificates( 1, { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('base64').eq('Cert 1');
                expect(res.data[1]).to.have.property('base64').eq('Cert 2');
            });
        });

        it('falls back to defaults when no config is found', () => {
            return defaultSafenet.certificates(1, { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('base64').eq('Default 1');
                expect(res.data[1]).to.have.property('base64').eq('Default 2');
            });
        });

        it('retries with default config if provided config fails', () => {
            return failSafenet.certificates(1, { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('base64').eq('Default 1');
                expect(res.data[1]).to.have.property('base64').eq('Default 2');
            });
        });
    });

    describe('info', function () {
        beforeEach(function () {
            mock.onPost('plugins/safenet/info',
                { module: 'mac' }).reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
            mock.onPost('plugins/safenet/info',
                { module: 'linux' }).reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
            mock.onPost('plugins/safenet/info',
                { module: 'win' }).reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });

            // defaults
            mock.onPost('plugins/safenet/info',
                { module: '/usr/local/lib/libeTPkcs11.dylib' }).reply(() => {
                return [ 200, { data: 'Default Info Data', success: true }];
            });
            mock.onPost('plugins/safenet/info',
                { module: '/usr/local/lib/libeTPkcs11.so' }).reply(() => {
                return [ 200, { data: 'Default Info Data', success: true }];
            });
            mock.onPost('plugins/safenet/info',
                { module: 'C:\\Windows\\System32\\eTPKCS11.dll' }).reply(() => {
                return [ 200, { data: 'Default Info Data', success: true }];
            });
        });

        it('makes the correct call for info data', () => {
            return safenet.info().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Info Data');
            });
        });

        it('falls back to defaults when no config is found', () => {
            return defaultSafenet.info().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Default Info Data');
            });
        });
    });

    describe('signData', function () {
        beforeEach(function () {
            mock.onPost('plugins/safenet/sign').reply((config) => {
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

            return safenet.signData({ pin, slot_id: slotId, cert_id: certId, data, algorithm_reference: algo }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).not.to.have.property('source');

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data).to.have.property('id').eq(certId);
                expect(res.data).to.have.property('slot_id').eq(slotId);
                expect(res.data).to.have.property('pin').eq(pin);
                expect(res.data).to.have.property('data').eq(data);
                expect(res.data).to.have.property('digest').eq(algo);
            });
        });

        it('falls back to defaults when no config is found', () => {
            const certId = '999';
            const pin = '4345';
            const data = 'default';
            const algo = 'sha256';
            const slotId = 7;

            return defaultSafenet.signData({ pin, slot_id: slotId, cert_id: certId, data, algorithm_reference: algo }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('source').eq('Default');

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data).to.have.property('id').eq(certId);
                expect(res.data).to.have.property('slot_id').eq(slotId);
                expect(res.data).to.have.property('pin').eq(pin);
                expect(res.data).to.have.property('data').eq(data);
                expect(res.data).to.have.property('digest').eq(algo);
            });
        });
    });

    describe('slots', function () {
        beforeEach(function () {
            mock.onPost('plugins/safenet/slots',
                { module: 'mac' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Slot Data', success: true }];
                }
            });
            mock.onPost('plugins/safenet/slots',
                { module: 'linux' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Slot Data', success: true }];
                }
            });
            mock.onPost('plugins/safenet/slots',
                { module: 'win' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Slot Data', success: true }];
                }
            });

            // defaults
            mock.onPost('plugins/safenet/slots',
                { module: '/usr/local/lib/libeTPkcs11.dylib' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Default Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Default Slot Data', success: true }];
                }
            });
            mock.onPost('plugins/safenet/slots',
                { module: '/usr/local/lib/libeTPkcs11.so' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Default Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Default Slot Data', success: true }];
                }
            });
            mock.onPost('plugins/safenet/slots',
                { module: 'C:\\Windows\\System32\\eTPKCS11.dll' }).reply((config) => {
                if (config.params && config.params['token-present'] === 'true') {
                    return [ 200, { data: 'Default Slot Data With Token Present', success: true }];
                } else {
                    return [ 200, { data: 'Default Slot Data', success: true }];
                }
            });
        });

        it('makes the correct call for slot data', () => {
            return safenet.slots().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Slot Data');
            });
        });

        it('falls back to defaults when no config is found', () => {
            return defaultSafenet.slots().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Default Slot Data');
            });
        });

        it('makes the correct call for slot data with token present', () => {
            return safenet.slotsWithTokenPresent().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Slot Data With Token Present');
            });
        });

        it('falls back to defaults when no config is found', () => {
            return defaultSafenet.slotsWithTokenPresent().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Default Slot Data With Token Present');
            });
        });
    });

    describe('tokens', function () {
        beforeEach(function () {
            mock.onPost('plugins/safenet/tokens', { module: 'mac' }).reply((config) => {
                return [ 200, { data: 'Token Data', success: true }];
            });
            mock.onPost('plugins/safenet/tokens', { module: 'linux' }).reply((config) => {
                return [ 200, { data: 'Token Data', success: true }];
            });
            mock.onPost('plugins/safenet/tokens', { module: 'win' }).reply((config) => {
                return [ 200, { data: 'Token Data', success: true }];
            });

            // defaults
            mock.onPost('plugins/safenet/tokens',
                { module: '/usr/local/lib/libeTPkcs11.dylib' }).reply((config) => {
                return [ 200, { data: 'Default Token Data', success: true }];
            });
            mock.onPost('plugins/safenet/tokens',
                { module: '/usr/local/lib/libeTPkcs11.so' }).reply((config) => {
                return [ 200, { data: 'Default Token Data', success: true }];
            });
            mock.onPost('plugins/safenet/tokens',
                { module: 'C:\\Windows\\System32\\eTPKCS11.dll' }).reply((config) => {
                return [ 200, { data: 'Default Token Data', success: true }];
            });
        });

        it('makes the correct call for token data', () => {
            return safenet.tokens().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Token Data');
            });
        });

        it('falls back to defaults when no config is found', () => {
            return defaultSafenet.tokens().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Default Token Data');
            });
        });
    });

});
