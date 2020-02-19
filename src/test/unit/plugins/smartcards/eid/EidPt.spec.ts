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

describe('Portuguese eID Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('pteid', ['pteid-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const pt = new PluginFactory('', connection).createEidPT('123');
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

    describe('idData', function () {
        beforeEach(function () {
            mock.onGet('containers/pteid-v2-1-1/123/id').reply((config) => {
                if (config.params && config.params.photo === 'false') {
                    return [ 200, { data: 'ID Data without photo', success: true }];
                } else {
                    return [ 200, { data: 'ID Data', success: true }];
                }
            });
        });

        test('makes the correct call for ID Data', () => {
            return pt.idData().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });

        test('makes the correct call for ID Data without photo', () => {
            return pt.idDataWithOutPhoto().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

    describe('photo', function () {
        beforeEach(function () {
            mock.onGet('containers/pteid-v2-1-1/123/photo').reply(() => {
                return [ 200, { data: 'Photo Data', success: true }];
            });
        });

        test('makes the correct call for Photo Data', () => {
            return pt.photo().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });
});
