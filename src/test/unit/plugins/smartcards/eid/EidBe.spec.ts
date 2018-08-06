/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {AbstractEidBE, LocalConnection, PubKeyService, GCLConfig, PluginFactory} from '../../../../..';

let gclconfig = new GCLConfig({});
let activecontainers = new Map<string, string[]>();
activecontainers.set('beid', ['beid-v2-1-1']);
gclconfig.activeContainers = activecontainers;
const connection: LocalConnection = new LocalConnection(gclconfig);
const beid: AbstractEidBE = new PluginFactory('', connection).createEidBE('123');
let mock: MockAdapter;

describe('Belgian eID Container', () => {
    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v2/card-readers/123').reply(200, {data: {pinpad: false}, success: true});
    });
    PubKeyService.setPubKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvb2PY42OifgdjoWrIPYezOiN0p859PK+k4ts0JY9S1I0WqWJROsoaB4o9JjubZPlP7A6chp30g++XE1KjQOzSm6Epr+t6rdlPxD+MfpB1y+4ACfB0xmoh6SWAtiSUKK4N76mPOyeIGvQ4/zmqKL1JyVxEFKyvUOH1zVQT4YPbmyxLpanXI2coP8q00BKcravSTxgmdOMlaCiD+bINwiv1x3rHq+lGT8rc2jUbTAHsS61Nj6Kten2QCtCpKYipe5H0jDTAnOlfaJHnEQ3qg7ULUN+KiwElIyvr2lf3SR9tLhyV9x8ezO8IOQPLZSMXT1w4UdGwIblXKpVgA9w2fs+SwIDAQAB');


    afterEach(() => {
        mock.restore();
    });

    describe('rnData', function () {
        beforeEach(function () {
            mock.onGet('/containers/beid-v2-1-1/123/rn').reply(200, {data: 'RN Data', success: true});
        });
        test('makes the correct call for RN Data', () => {
            return beid.rnData().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('RN Data');
            });
        });
    });


    describe('address', function () {
        beforeEach(function () {
            mock.onGet('/containers/beid-v2-1-1/123/address').reply(200, {data: 'BeidAddress Data', success: true});
        });
        test('makes the correct call for address data', () => {
            return beid.address().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('BeidAddress Data');
            });
        });
    });


    describe('picture', function () {
        beforeEach(function () {
            mock.onGet('containers/beid-v2-1-1/123/picture').reply(200, {data: 'Picture Data', success: true});
        });
        test('makes the correct call for picture data', () => {
            return beid.picture().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Picture Data');
            });
        });
    });

    describe('verifyPin', function () {
        beforeEach(function () {
            mock.onPost('containers/beid-v2-1-1/123/verify-pin').reply((config) => {
                let data = JSON.parse(config.data);
                // console.log('pin verify beid');
                // console.log(data);
                if (data && data.private_key_reference === 'non-repudiation' && data.pin && data.pin.length) {
                    return [200, {data: 'Verify Pin Data', success: true}];
                } else {
                    return [404];
                }
            });
        });

        test('makes the correct call for verify pin', () => {
            return beid.verifyPin({pin: '1234'}).then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toEqual('Verify Pin Data');
            });
        });
    });
});
