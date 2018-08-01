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

describe('Spanish eID Container', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const dnie = new PluginFactory('', connection).createDNIe('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v2/card-readers/123').reply(() => {
            return [ 200, { data: { pinpad: false }, success: true }];
        });
    });

    afterEach(() => {
        mock.restore();
    });

    describe('info', function () {
        beforeEach(function () {
            mock.onGet('containers/dnie/123/info').reply(() => {
                return [ 200, { data: 'DNIeInfo Data', success: true }];
            });
        });

        it('makes the correct call for DNIe DNIeInfo', () => {
            return dnie.info().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('DNIeInfo Data');
            });
        });
    });
});
