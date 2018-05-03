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

describe('OCRA Container', () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const ocra = new PluginFactory('', connection).createOcra('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('challenge', function () {
        beforeEach(function () {
            mock.onPost('plugins/ocra/123/challenge', { pin: '1234', challenge: 'theChallenge' }).reply(() => {
                return [ 200, { data: 'Challenge Data', success: true }];
            });
        });

        it('makes the correct call challenge data', () => {
            return ocra.challenge({ pin: '1234', challenge: 'theChallenge'}).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Challenge Data');
            });
        });
    });

    describe('readCounter', function () {
        beforeEach(function () {
            mock.onGet('plugins/ocra/123/counter').reply((config) => {
                if (config.params.pin === '1234') {
                    return [ 200, { data: 'Read Counter Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        it('makes the correct call for counter data', () => {
            return ocra.readCounter({ pin: '1234' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Read Counter Data');
            });
        });
    });
});
