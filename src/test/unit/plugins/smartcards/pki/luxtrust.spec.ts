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

describe('LuxTrust Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('luxtrust', ['luxtrust-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const luxtrust = new PluginFactory('', connection).createLuxTrust('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('activated', function () {
        beforeEach(function () {
            mock.onGet('containers/luxtrust-v2-1-1/123/activated').reply(() => {
                return [ 200, { data: 'Activated Data', success: true }];
            });
        });

        test('makes the correct call for activated data', () => {
            return luxtrust.activated().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Activated Data');
            });
        });
    });

});
