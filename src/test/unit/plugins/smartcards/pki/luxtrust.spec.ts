/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { GCLConfig } from '../../../../../scripts/core/GCLConfig';
import { LocalConnection } from '../../../../../scripts/core/client/Connection';
import { PluginFactory } from '../../../../../scripts/plugins/PluginFactory';

describe('LuxTrust Container', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
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
            mock.onGet('containers/luxtrust/123/activated').reply(() => {
                return [ 200, { data: 'Activated Data', success: true }];
            });
        });

        it('makes the correct call for activated data', () => {
            return luxtrust.activated().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Activated Data');
            });
        });
    });

});
