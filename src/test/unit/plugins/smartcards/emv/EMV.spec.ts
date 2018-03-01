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

describe('EMV Container', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const emv = new PluginFactory('', connection).createEmv('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v1/card-readers/123').reply(() => {
            return [ 200, { data: { pinpad: false }, success: true }];
        });
    });

    afterEach(() => {
        mock.restore();
    });

    describe(':: Application Data ::', function () {
        beforeEach(function () {
            mock.onGet('containers/emv/123/application-data').reply(() => {
                return [ 200, { data: { country: 'BE', country_code: '0056', effective_date: '091101', expiration_date: '141130',
                    language: 'fr', name: 'LASTNAME/FIRSTNAME', pan: '6703XXXXXXXXXXXXXXX' }, success: true }];
            });
        });

        it('Makes the correct call for application data', () => {
            return emv.applicationData().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data).to.have.property('country').eq('BE');
                expect(res.data).to.have.property('country_code').eq('0056');
                expect(res.data).to.have.property('effective_date').eq('091101');
                expect(res.data).to.have.property('expiration_date').eq('141130');
                expect(res.data).to.have.property('language').eq('fr');
                expect(res.data).to.have.property('name').eq('LASTNAME/FIRSTNAME');
                expect(res.data).to.have.property('pan').eq('6703XXXXXXXXXXXXXXX');
            });
        });
    });

    describe(':: Applications ::', function () {
        beforeEach(function () {
            mock.onGet('containers/emv/123/applications').reply(() => {
                return [ 200, { data: [ { aid: 'A0000000048002', name: 'MAESTRO', priority: 1 },
                    { aid: 'A0000000048008', name: 'MASTERCARD', priority: 1}], success: true }];
            });
        });

        it('Makes the correct call for applications', () => {
            return emv.applications().then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('name').eq('MAESTRO');
                expect(res.data[1]).to.have.property('name').eq('MASTERCARD');
            });
        });

    });

    describe(':: ICC Public Key Certificate ::', function () {
        beforeEach(function () {
            mock.onPost('containers/emv/123/icc-public-key-certificate', { aid: 'A0000000048002' }).reply(() => {
                return [ 200, { data: { data: 'base64data', exponent: 'base64exponent', remainder: 'base64remainder' }, success: true }];
            });
        });

        it('Makes the correct call for ICC public key certificate', () => {
            return emv.iccPublicKeyCertificate('A0000000048002').then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data).to.have.property('data').eq('base64data');
                expect(res.data).to.have.property('exponent').eq('base64exponent');
                expect(res.data).to.have.property('remainder').eq('base64remainder');
            });
        });

    });

    describe(':: Issuer Public Key Certificate ::', function () {
        beforeEach(function () {
            mock.onPost('containers/emv/123/issuer-public-key-certificate', { aid: 'A0000000048008' }).reply(() => {
                return [ 200, { data: { data: 'base64data', exponent: 'base64exponent', remainder: 'base64remainder' }, success: true }];
            });
        });

        it('Makes the correct call for issuer public key certificate', () => {
            return emv.issuerPublicKeyCertificate('A0000000048008').then((res) => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data).to.have.property('data').eq('base64data');
                expect(res.data).to.have.property('exponent').eq('base64exponent');
                expect(res.data).to.have.property('remainder').eq('base64remainder');
            });
        });

    });

});
