/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LocalConnection, PluginFactory, GCLConfig} from '../../../../..';


describe('Spanish eID Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('dnie', ['dnie-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const dnie = new PluginFactory('', connection).createDNIe('123');
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

    describe('info', function () {
        beforeEach(function () {
            mock.onGet('containers/dnie-v2-1-1/123/info').reply(() => {
                return [ 200, { data: 'DNIeInfo Data', success: true }];
            });
        });

        test('makes the correct call for DNIe DNIeInfo', () => {
            return dnie.info().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('DNIeInfo Data');
            });
        });
    });
});
