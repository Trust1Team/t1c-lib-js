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


describe('Idemia_Ias_Ecc Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('idemia_ias_ecc', ['idemia_ias_ecc-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const idemia_ias_ecc = new PluginFactory('', connection).createIdemia_Ias_EccNO('123');
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

    describe('verifyPin', function () {
        beforeEach(function () {
            mock.onPost('containers/idemia_ias_ecc-v2-1-1/123/verify-pin').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.private_key_reference === 'key' && data.pin && data.pin.length) {
                    return [ 200, { data: 'Verify Pin Data', success: true }];
                } else { return [404]; }
            });
        });

        it('makes the correct call for activated data', () => {
            return idemia_ias_ecc.verifyPin({ private_key_reference: 'key', pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Verify Pin Data');
            });
        });
    });

});
