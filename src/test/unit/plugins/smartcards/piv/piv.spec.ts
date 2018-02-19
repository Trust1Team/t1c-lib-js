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
import { PubKeyService } from '../../../../../scripts/util/PubKeyService';

describe('PIV/CIV Container', () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const piv = new PluginFactory('', connection).createPIV('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v1/card-readers/123').reply(() => {
            return [ 200, { data: { pinpad: false }, success: true }];
        });
        PubKeyService.setPubKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n' +
                                'FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n' +
                                'xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n' +
                                'gwQco1KRMDSmXSMkDwIDAQAB\n');
    });

    afterEach(() => {
        mock.restore();
    });

    describe('printedInformation', function () {
        beforeEach(function () {
            mock.onPost('containers/piv/123/printed-information').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Printed Information Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        it('makes the correct call for printed information data', () => {
            return piv.printedInformation({ pin: '1234' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Printed Information Data');
            });
        });
    });

    describe('facialImage', function () {
        beforeEach(function () {
            mock.onPost('containers/piv/123/facial-image').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Facial Image Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        it('makes the correct call for facial image data', () => {
            return piv.facialImage({ pin: '1234' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string').eq('Facial Image Data');
            });
        });
    });

});
