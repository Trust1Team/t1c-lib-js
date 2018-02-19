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

describe('Mobib Container', () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const mobib = new PluginFactory('', connection).createMobib('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('cardIssuing', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib/123/card-issuing').reply(() => {
                return [ 200, { data: 'Card Issuing Data', success: true }];
            });
        });

        it('makes the correct call for card issuing data', () => {
            return mobib.cardIssuing().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Card Issuing Data');
            });
        });
    });

    describe('contracts', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib/123/contracts').reply(() => {
                return [ 200, { data: 'Contracts Data', success: true }];
            });
        });

        it('makes the correct call for contracts data', () => {
            return mobib.contracts().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Contracts Data');
            });
        });
    });

    describe('picture', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib/123/picture').reply(() => {
                return [ 200, { data: 'Picture Data', success: true }];
            });
        });

        it('makes the correct call for picture data', () => {
            return mobib.picture().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Picture Data');
            });
        });
    });

    describe('status', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib/123/status').reply(() => {
                return [ 200, { data: 'Status Data', success: true }];
            });
        });

        it('makes the correct call for picture data', () => {
            return mobib.status().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Status Data');
            });
        });
    });

});
