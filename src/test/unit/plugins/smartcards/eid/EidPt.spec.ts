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

describe('Portuguese eID Container', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const pt = new PluginFactory('', connection).createEidPT('123');
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

    describe('idData', function () {
        beforeEach(function () {
            mock.onGet('containers/pteid/123/id').reply((config) => {
                if (config.params && config.params.photo === 'false') {
                    return [ 200, { data: 'ID Data without photo', success: true }];
                } else {
                    return [ 200, { data: 'ID Data', success: true }];
                }
            });
        });

        it('makes the correct call for ID Data', () => {
            return pt.idData().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('ID Data');
            });
        });

        it('makes the correct call for ID Data without photo', () => {
            return pt.idDataWithOutPhoto().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('ID Data without photo');
            });
        });
    });

    describe('photo', function () {
        beforeEach(function () {
            mock.onGet('containers/pteid/123/photo').reply(() => {
                return [ 200, { data: 'Photo Data', success: true }];
            });
        });

        it('makes the correct call for Photo Data', () => {
            return pt.photo().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Photo Data');
            });
        });
    });
});
