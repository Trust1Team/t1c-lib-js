/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import { GCLConfig } from '../../../../scripts/core/GCLConfig';
import { LocalConnection } from '../../../../scripts/core/client/Connection';
import { PluginFactory } from '../../../../scripts/plugins/PluginFactory';

describe('Remote Loading Container', () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const relo = new PluginFactory('', connection).createRemoteLoading('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('can open a session', function () {
        beforeEach(function () {
            mock.onPost('containers/readerapi/123/open-session', { timeout: 5 }).reply(() => {
                return [ 200, { data: '87d2ee2d-6f2e-4de4-a077-a57e8b8d42c3', success: true }];
            });
            mock.onPost('containers/readerapi/123/open-session', { timeout: 22 }).reply(() => {
                return [ 200, { data: '7f6f5de4-3bb1-4a77-9b30-274196bdf15e', success: true }];
            });
        });

        it('opens a session with default timeout', () => {
            return relo.openSession().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('87d2ee2d-6f2e-4de4-a077-a57e8b8d42c3');
            });
        });

        it('opens a session with a specified timeout', () => {
            return relo.openSession(22).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('7f6f5de4-3bb1-4a77-9b30-274196bdf15e');
            });
        });
    });

    describe('can get a card\'s ATR', function () {
        beforeEach(function () {
            mock.onGet('containers/readerapi/123/atr')
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: '3B9813400AA503010101AD1311' }];
                    } else { return [ 200, { success: true, data: '4C0924511BB614121212BE2422' } ]; }
                });
        });

        it('works without a session id', () => {
            const sessionId: string = undefined as any;
            return relo.atr(sessionId).then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('4C0924511BB614121212BE2422');
            });
        });

        it('takes the session id into account if provided', () => {
            return relo.atr('123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('3B9813400AA503010101AD1311');
            });
        });
    });

    describe('can send and APDU call', function () {
        beforeEach(function () {
            mock.onPost('containers/readerapi/123/apdu', { cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' })
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: {
                            rx:	'FE0000040067B4AD49',
                            sw:	'9000',
                            tx:	'F195F7E409FE0000040001300000'}
                        }];
                    } else {
                        return [ 200, {
                            success: true, data: {
                                rx: 'GF1111151178C5BE50',
                                sw: '9000',
                                tx: 'F195F7E409FE0000040001300000'
                            }
                        }];
                    }
                });
        });

        it('works without a session id', () => {
            return relo.apdu({ cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' }).then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');

                expect(res.data).to.have.property('tx');
                expect(res.data.tx).to.be.a('string');
                expect(res.data.tx).to.eq('F195F7E409FE0000040001300000');

                expect(res.data).to.have.property('sw');
                expect(res.data.sw).to.be.a('string');
                expect(res.data.sw).to.eq('9000');

                expect(res.data).to.have.property('rx');
                expect(res.data.rx).to.be.a('string');
                expect(res.data.rx).to.eq('GF1111151178C5BE50');
            });
        });

        it('takes the session id into account when provided', () => {
            return relo.apdu({ cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' }, '123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');

                expect(res.data).to.have.property('tx');
                expect(res.data.tx).to.be.a('string');
                expect(res.data.tx).to.eq('F195F7E409FE0000040001300000');

                expect(res.data).to.have.property('sw');
                expect(res.data.sw).to.be.a('string');
                expect(res.data.sw).to.eq('9000');

                expect(res.data).to.have.property('rx');
                expect(res.data.rx).to.be.a('string');
                expect(res.data.rx).to.eq('FE0000040067B4AD49');
            });
        });
    });

    describe('can send bulk APDU calls', function () {
        beforeEach(function () {
            mock.onPost('containers/readerapi/123/apdus', [{ cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' },
                { cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' }])
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: [{
                            rx:	'FE0000040067B4AD49',
                            sw:	'9000',
                            tx:	'F195F7E409FE0000040001300000'
                        }, {
                            rx:	'FE0000040067B4AD49',
                            sw:	'9000',
                            tx:	'F195F7E409FE0000040001300000'}]
                        }];
                    } else {
                        return [ 200, {
                            success: true, data: [{
                                rx: 'GF1111151178C5BE50',
                                sw: '9000',
                                tx: 'F195F7E409FE0000040001300000'
                            }, {
                                rx: 'GF1111151178C5BE50',
                                sw: '9000',
                                tx: 'F195F7E409FE0000040001300000'
                            }]
                        }];
                    }
                });
        });

        it('works without a session id', () => {
            return relo.apdu([{ cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' },
                { cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' }]).then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array');
                expect(res.data[0]).to.be.an('object').that.has.property('rx');
                expect(res.data[0].rx).to.eq('GF1111151178C5BE50');
            });
        });

        it('takes the session id into account when provided', () => {
            return relo.apdu([{ cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' },
                { cla: 'F1', ins: '95', p1: 'F7', p2: 'E4', data: 'FE0000040001300000' }], '123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array');
                expect(res.data[0]).to.be.an('object').that.has.property('rx');
                expect(res.data[0].rx).to.eq('FE0000040067B4AD49');
            });
        });
    });

    // TODO fix once working
    describe('can send a CCID command', function () {
        beforeEach(function () {
            mock.onPost('containers/readerapi/123/ccid', { feature: 'VERIFY_PIN_DIRECT',
                apdu: '1E1E8947040C0402010904000000000D000000002000010820FFFFFFFFFFFFFF' })
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data:
                            { sw: '9000', tx: '1E1E8947040C0402010904000000000D000000002000010820FFFFFFFFFFFFFF' } }];
                    } else {
                        return [ 200, { success: true, data:
                            { sw: '9111', tx: '1E1E8947040C0402010904000000000D000000002000010820FFFFFFFFFFFFFF' } }];
                    }
                });
        });

        it('works without a session id', () => {
            return relo.ccid('VERIFY_PIN_DIRECT', '1E1E8947040C0402010904000000000D000000002000010820FFFFFFFFFFFFFF').then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');

                expect(res.data).to.have.property('sw');
                expect(res.data.sw).to.be.a('string');
                expect(res.data.sw).to.eq('9111');
            });
        });

        it('takes the session id into account when provided', () => {
            return relo.ccid('VERIFY_PIN_DIRECT', '1E1E8947040C0402010904000000000D000000002000010820FFFFFFFFFFFFFF', '123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');

                expect(res.data).to.have.property('sw');
                expect(res.data.sw).to.be.a('string');
                expect(res.data.sw).to.eq('9000');
            });
        });
    });

    describe('can retrieve CCID features of the reader', function () {
        beforeEach(function () {
            mock.onGet('containers/readerapi/123/ccid-features')
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: [{
                            control_code: 1110638598,
                            id:	'VERIFY_PIN_DIRECT'
                        }, {
                            control_code: 1110638599,
                            id:	'MODIFY_PIN_DIRECT' }]
                        }];
                    } else {
                        return [ 200, {
                            success: true, data: [{
                                control_code: 1110638598,
                                id:	'VERIFY_PIN_DIRECT'
                            }]
                        }];
                    }
                });
        });

        it('works without a session id', () => {
            return relo.ccidFeatures().then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(1);
            });
        });

        it('takes the session id into account when provided', () => {
            return relo.ccidFeatures('123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
            });
        });
    });

    describe('can send a hex command', function () {
        beforeEach(function () {
            mock.onPost('containers/readerapi/123/command', { tx: '00A4020C023F00' })
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: { sw: '9000', tx: '00A4020C023F00' } }];
                    } else { return [ 200, { success: true, data: { sw: '69b3', tx: '00A4020C023F00' } }]; }
                });
        });

        it('works without a session id', () => {
            return relo.command('00A4020C023F00').then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');

                expect(res.data).to.have.property('sw');
                expect(res.data.sw).to.be.a('string');
                expect(res.data.sw).to.eq('69b3');
            });
        });

        it('takes session id into account when provided', () => {
            return relo.command('00A4020C023F00', '123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');

                expect(res.data).to.have.property('sw');
                expect(res.data.sw).to.be.a('string');
                expect(res.data.sw).to.eq('9000');
            });
        });
    });

    describe('can send bulk hex commands', function () {
        beforeEach(function () {
            mock.onPost('containers/readerapi/123/commands', [{ tx: '00A4020C023F00' }, { tx: '00A4020C02DF01' },
                { tx: '00A4020C024031' }, { tx: '00B00000B3' } ])
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: [
                            { sw: '9000', tx: '00A4020C023F00' },
                            { sw: '9000', tx: '00A4020C02DF01' },
                            { sw: '9000', tx: '00A4020C024031' },
                            { rx: '010C35393232313736343635363002105', sw: '9000', tx : '00B00000B3' }]
                        }];
                    } else { return [ 200, { success: true, data: [
                        { sw: '9000', tx: '00A4020C023F00' },
                        { sw: '9000', tx: '00A4020C02DF01' },
                        { sw: '9000', tx: '00A4020C024031' },
                        { rx: '121DC6404343424847454746474113216', sw: '9000', tx : '00B00000B3' }] }];
                    }
                });
        });

        it('works without a session id', () => {
            return relo.command([ '00A4020C023F00', '00A4020C02DF01', '00A4020C024031', '00B00000B3' ]).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(4);

                expect(res.data[3]).to.have.property('tx');
                expect(res.data[3].tx).to.be.a('string');
                expect(res.data[3].tx).to.eq('00B00000B3');

                expect(res.data[3]).to.have.property('sw');
                expect(res.data[3].sw).to.be.a('string');
                expect(res.data[3].sw).to.eq('9000');

                expect(res.data[3]).to.have.property('rx');
                expect(res.data[3].rx).to.be.a('string');
                expect(res.data[3].rx).to.eq('121DC6404343424847454746474113216');
            });
        });

        it('takes session id into account if provided', () => {
            return relo.command([ '00A4020C023F00', '00A4020C02DF01', '00A4020C024031', '00B00000B3' ], '123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(4);

                expect(res.data[3]).to.have.property('tx');
                expect(res.data[3].tx).to.be.a('string');
                expect(res.data[3].tx).to.eq('00B00000B3');

                expect(res.data[3]).to.have.property('sw');
                expect(res.data[3].sw).to.be.a('string');
                expect(res.data[3].sw).to.eq('9000');

                expect(res.data[3]).to.have.property('rx');
                expect(res.data[3].rx).to.be.a('string');
                expect(res.data[3].rx).to.eq('010C35393232313736343635363002105');
            });
        });
    });

    describe('can verify that a card is present', function () {
        beforeEach(function () {
            mock.onGet('containers/readerapi/123/is-present')
                .reply(config => {
                    if (config.params && config.params['session-id'] && config.params['session-id'] === '123') {
                        return [ 200, { success: true, data: true }];
                    } else {
                        return [ 200, { success: true, data: false }];
                    }
                });
        });

        it('works without a session id', () => {
            return relo.isPresent().then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('boolean');
                expect(res.data).to.eq(false);
            });
        });

        it('takes the session id into account when provided', () => {
            return relo.isPresent('123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('boolean');
                expect(res.data).to.eq(true);
            });
        });
    });

    describe('can close a session', function () {
        beforeEach(function () {
            mock.onGet('containers/readerapi/123/close-session').reply(() => {
                return [ 200, { success: true }];
            });
        });

        it('closes the session', () => {
            return relo.closeSession().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);
            });
        });
    });
});
