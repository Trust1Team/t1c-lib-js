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
import { AbstractEidBE } from '../../../../../scripts/plugins/smartcards/eid/be/EidBeModel';
import { PubKeyService } from '../../../../../scripts/util/PubKeyService';

describe('Belgian eID Container', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const beid: AbstractEidBE = new PluginFactory('', connection).createEidBE('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v1/card-readers/123').reply(() => {
            return [ 200, { data: { pinpad: false }, success: true }];
        });
        PubKeyService.setPubKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvb2PY42OifgdjoWrIPYezOiN0p859PK+k4ts0JY9S1I0WqWJROsoaB4o9JjubZPlP7A6chp30g++XE1KjQOzSm6Epr+t6rdlPxD+MfpB1y+4ACfB0xmoh6SWAtiSUKK4N76mPOyeIGvQ4/zmqKL1JyVxEFKyvUOH1zVQT4YPbmyxLpanXI2coP8q00BKcravSTxgmdOMlaCiD+bINwiv1x3rHq+lGT8rc2jUbTAHsS61Nj6Kten2QCtCpKYipe5H0jDTAnOlfaJHnEQ3qg7ULUN+KiwElIyvr2lf3SR9tLhyV9x8ezO8IOQPLZSMXT1w4UdGwIblXKpVgA9w2fs+SwIDAQAB');
    });

    afterEach(() => {
        mock.restore();
    });

    describe('rnData', function () {
        beforeEach(function () {
            mock.onGet('containers/beid/123/rn').reply(() => {
                return [ 200, { data: 'RN Data', success: true }];
            });
        });

        it('makes the correct call for RN Data', () => {
            return beid.rnData().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('RN Data');
            });
        });
    });

    describe('address', function () {
        beforeEach(function () {
            mock.onGet('containers/beid/123/address').reply(() => {
                return [ 200, { data: 'Address Data', success: true }];
            });
        });

        it('makes the correct call for address data', () => {
            return beid.address().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Address Data');
            });
        });
    });

    describe('picture', function () {
        beforeEach(function () {
            mock.onGet('containers/beid/123/picture').reply(() => {
                return [ 200, { data: 'Picture Data', success: true }];
            });
        });

        it('makes the correct call for picture data', () => {
            return beid.picture().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Picture Data');
            });
        });
    });

    describe('verifyPin', function () {
        beforeEach(function () {
            mock.onPost('containers/beid/123/verify-pin').reply((config) => {
                let data = JSON.parse(config.data);
                // console.log('pin verify beid');
                // console.log(data);
                if (data && data.private_key_reference === 'non-repudiation' && data.pin && data.pin.length) {
                    return [ 200, { data: 'Verify Pin Data', success: true }];
                } else { return [ 404 ]; }
            });
        });

        it('makes the correct call for verify pin', () => {
            return beid.verifyPin({ pin: '1234' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('string');
                expect(res.data).to.eq('Verify Pin Data');
            });
        });
    });
});
