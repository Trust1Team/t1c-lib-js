/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import { CoreService } from '../../../scripts/core/service/CoreService';
import { GCLConfig } from '../../../scripts/core/GCLConfig';
import { LocalConnection } from '../../../scripts/core/client/Connection';
import { Promise } from 'es6-promise';

describe('Core Services', () => {
    let gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    let core = new CoreService('', connection);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('activate', () => {
        beforeEach(function () {
            mock.onPost('admin/activate').reply(() => {
                return [ 200, { data: 'Activation Data', success: true }];
            });
        });

        it('makes the correct call to activate', () => {
            return core.activate().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Activation Data');
            });
        });
    });

    describe('getConsent', () => {
        beforeEach(function () {
            mock.onPost('/consent').reply((config) => {
                return [ 200, { data: JSON.parse(config.data), success: true }];
            });
        });

        it('makes the correct call to get consent', () => {
            return core.getConsent('test', 'code', 5).then(res => {
                const result = res as any;
                expect(result).to.have.property('success');
                expect(result.success).to.be.a('boolean');
                expect(result.success).to.eq(true);

                expect(result).to.have.property('data');
                expect(result.data).to.be.an('object');

                expect(result.data).to.have.property('title');
                expect(result.data.title).to.be.a('string').eq('test');

                expect(result.data).to.have.property('text');
                expect(result.data.text).to.be.a('string').eq('code');

                expect(result.data).to.have.property('days');
                expect(result.data.days).to.be.a('number').eq(5);
            });
        });

        it('sets default duration if not provided', () => {
            return core.getConsent('test2', 'code2').then(res => {
                const result = res as any;
                expect(result).to.have.property('success');
                expect(result.success).to.be.a('boolean');
                expect(result.success).to.eq(true);

                expect(result).to.have.property('data');
                expect(result.data).to.be.an('object');

                expect(result.data).to.have.property('title');
                expect(result.data.title).to.be.a('string').eq('test2');

                expect(result.data).to.have.property('text');
                expect(result.data.text).to.be.a('string').eq('code2');

                expect(result.data).to.have.property('days');
                expect(result.data.days).to.be.a('number').eq(1);
            });
        });

        it('rejects the request if no title is provided', () => {
            return core.getConsent(undefined, 'code3', 2).then(() => {
                return Promise.reject(new Error('no title was provided, this should fail!'));
            }, error => {
                expect(error).to.have.property('code');
                expect(error.code).to.be.a('string');
                expect(error.code).to.eq('801');

                expect(error).to.have.property('status');
                expect(error.status).to.be.a('number');
                expect(error.status).to.eq(400);

                expect(error).to.have.property('description');
                expect(error.description).to.be.a('string');
                expect(error.description).to.eq('Title is required!');
            });
        });

        it('rejects the request if no code word is provided', () => {
            return core.getConsent('test4', undefined, 4).then(() => {
                return Promise.reject(new Error('no code word was provided, this should fail!'));
            }, error => {
                expect(error).to.have.property('code');
                expect(error.code).to.be.a('string');
                expect(error.code).to.eq('801');

                expect(error).to.have.property('status');
                expect(error.status).to.be.a('number');
                expect(error.status).to.eq(400);

                expect(error).to.have.property('description');
                expect(error.description).to.be.a('string');
                expect(error.description).to.eq('Code word is required!');
            });
        });
    });

    describe('getPubKey', () => {
        beforeEach(function () {
            mock.onGet('admin/certificate').reply(() => {
                return [ 200, { data: 'Get Pub Key Data', success: true }];
            });
        });

        it('makes the correct call to get pub key', () => {
            return core.getPubKey().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Get Pub Key Data');
            });
        });
    });

    describe('info', () => {
        beforeEach(function () {
            mock.onGet('/').reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
        });

        it('makes the correct call to get info', () => {
            return core.info().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Info Data');
            });
        });
    });

    describe('plugins', () => {
        beforeEach(function () {
            mock.onGet('/plugins').reply(() => {
                return [ 200, { data: 'Plugins Data', success: true }];
            });
        });

        it('makes the correct call to get plugins', () => {
            return core.plugins().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Plugins Data');
            });
        });
    });

    describe('reader', () => {
        beforeEach(function () {
            mock.onGet('/card-readers/123').reply(() => {
                return [ 200, { data: 'Reader Data', success: true }];
            });
        });

        it('makes the correct call to get card reader data', () => {
            return core.reader('123').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Reader Data');
            });
        });
    });

    describe('readers', () => {
        beforeEach(function () {
            mock.onGet('/card-readers').reply((config) => {
                if (config.params && config.params['card-inserted'] === true) {
                    return [ 200, { data: 'Readers Data Card Inserted', success: true }];
                } else if (config.params && config.params['card-inserted'] === false) {
                    return [ 200, { data: 'Readers Data No Card Inserted', success: true }];
                } else {
                    return [ 200, { data: 'Readers Data', success: true }];
                }
            });
        });

        it('makes the correct call to get card reader data', () => {
            return core.readers().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Readers Data');
            });
        });

        it('makes the correct call to get card reader data with card inserted', () => {
            return core.readersCardAvailable().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Readers Data Card Inserted');
            });
        });

        it('makes the correct call to get card reader data without card inserted', () => {
            return core.readersCardsUnavailable().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Readers Data No Card Inserted');
            });
        });
    });

    describe('setPubKey', () => {
        beforeEach(function () {
            mock.onPut('/admin/certificate', { certificate: 'pubkey' }).reply(() => {
                return [ 200, { data: 'Set Pub Key Data', success: true }];
            });
        });

        it('makes the correct call to set pub key', () => {
            return core.setPubKey('pubkey').then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Set Pub Key Data');
            });
        });
    });
});
