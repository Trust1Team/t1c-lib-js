import { LocalConnection } from './../../../../../scripts/core/client/Connection';
import { GCLConfig } from './../../../../../scripts/core/GCLConfig';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PluginFactory } from '../../../../../scripts/plugins/PluginFactory';
import { PubKeyService } from '../../../../../scripts/util/PubKeyService';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('PIV/CIV Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('piv', ['piv-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const piv = new PluginFactory('', connection).createPIV('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v2/card-readers/123').reply(() => {
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
            mock.onPost('containers/piv-v2-1-1/123/printed-information').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Printed Information Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        test('makes the correct call for printed information data', () => {
            return piv.printedInformation({ pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

    describe('facialImage', function () {
        beforeEach(function () {
            mock.onPost('containers/piv-v2-1-1/123/facial-image').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { data: 'Facial Image Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        test('makes the correct call for facial image data', () => {
            return piv.facialImage({ pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

});