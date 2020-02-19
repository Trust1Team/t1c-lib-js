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


describe('Aventra Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('aventra', ['aventra-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const aventra = new PluginFactory('', connection).createAventraNO('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:34752/v3/card-readers/123').reply(() => {
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

    describe('resetPin', function () {
        beforeEach(function () {
            mock.onPost('containers/aventra-v2-1-1/123/reset-pin',
                { puk: '9999999', new_pin: '1234', private_key_reference: 'non-repudiation' }).reply(() => {
                return [ 200, { data: 'Reset Pin Data', success: true }];
            });
        });

        test('makes the correct call for reset pin', () => {
            return aventra.resetPin({ puk: '9999999', new_pin: '1234', private_key_reference: 'non-repudiation' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

    describe('verifyPin', function () {
        beforeEach(function () {
            mock.onPost('containers/aventra-v2-1-1/123/verify-pin').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.private_key_reference === 'private_key' && data.pin && data.pin.length) {
                    return [ 200, { data: 'Verify Pin Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        test('makes the correct call for verify pin', () => {
            return aventra.verifyPin({ pin: '1234', private_key_reference: 'private_key' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
            });
        });
    });

});
