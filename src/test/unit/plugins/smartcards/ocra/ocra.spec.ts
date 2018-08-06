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


describe('OCRA Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('ocra', ['ocra-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const ocra = new PluginFactory('', connection).createOcra('123');
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

    describe('challenge', function () {
        beforeEach(function () {
            mock.onPost('containers/ocra-v2-1-1/123/challenge').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.challenge === 'theChallenge' && data.pin && data.pin.length) {
                    return [ 200, { data: 'Challenge Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        test('makes the correct call challenge data', () => {
            return ocra.challenge({ pin: '1234', challenge: 'theChallenge'}).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Challenge Data');
            });
        });
    });

    describe('readCounter', function () {
        beforeEach(function () {
            mock.onGet('containers/ocra-v2-1-1/123/counter').reply((config) => {
                if (config.params.pin) {
                    return [ 200, { counter: 'Read Counter Data', success: true }];
                } else {
                    return [ 404 ];
                }
            });
        });

        test('makes the correct call for counter data', () => {
            return ocra.readCounter({ pin: '1234' }).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('counter');
                expect(res.counter).toEqual('Read Counter Data');
            });
        });
    });
});
