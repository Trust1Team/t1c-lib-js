import { LocalConnection } from './../../../../../scripts/core/client/Connection';
import { GCLConfig } from './../../../../../scripts/core/GCLConfig';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PluginFactory } from '../../../../../scripts/plugins/PluginFactory';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('Mobib Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('mobib', ['mobib-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
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
            mock.onGet('containers/mobib-v2-1-1/123/card-issuing').reply(() => {
                return [ 200, { data: 'Card Issuing Data', success: true }];
            });
        });

        test('makes the correct call for card issuing data', () => {
            return mobib.cardIssuing().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

    describe('contracts', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib-v2-1-1/123/contracts').reply(() => {
                return [ 200, { data: 'Contracts Data', success: true }];
            });
        });

        test('makes the correct call for contracts data', () => {
            return mobib.contracts().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

    describe('picture', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib-v2-1-1/123/picture').reply(() => {
                return [ 200, { data: 'Picture Data', success: true }];
            });
        });

        test('makes the correct call for picture data', () => {
            return mobib.picture().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

    describe('status', function () {
        beforeEach(function () {
            mock.onGet('containers/mobib-v2-1-1/123/status').reply(() => {
                return [ 200, { data: 'Status Data', success: true }];
            });
        });

        test('makes the correct call for picture data', () => {
            return mobib.status().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

});
