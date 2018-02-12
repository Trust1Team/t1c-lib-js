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
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const beid: AbstractEidBE = new PluginFactory('', connection).createEidBE('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        PubKeyService.setPubKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n' +
                                'FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n' +
                                'xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n' +
                                'gwQco1KRMDSmXSMkDwIDAQAB\n');
    });

    afterEach(() => {
        mock.restore();
    });

    describe('rnData', function () {
        beforeEach(function () {
            mock.onGet('plugins/beid/123/rn').reply(() => {
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
            mock.onGet('plugins/beid/123/address').reply(() => {
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
            mock.onGet('plugins/beid/123/picture').reply(() => {
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
            mock.onPost('plugins/beid/123/verify-pin').reply((config) => {
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
