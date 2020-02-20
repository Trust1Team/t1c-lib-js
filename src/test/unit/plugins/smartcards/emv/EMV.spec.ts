import { LocalConnection } from './../../../../../scripts/core/client/Connection';
import { GCLConfig } from './../../../../../scripts/core/GCLConfig';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PluginFactory } from '../../../../../scripts/plugins/PluginFactory';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('EMV Container', () => {
    let gclconfig = new GCLConfig({});
    let activecontainers = new Map<string, string[]>();
    activecontainers.set('emv', ['emv-v2-1-1']);
    gclconfig.activeContainers = activecontainers;
    const connection: LocalConnection = new LocalConnection(gclconfig);
    const emv = new PluginFactory('', connection).createEmv('123');
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:34752/v3/card-readers/123').reply(() => {
            return [ 200, { data: { pinpad: false }, success: true }];
        });
    });

    afterEach(() => {
        mock.restore();
    });

    describe(':: EmvApplication Data ::', function () {
        beforeEach(function () {
            mock.onGet('containers/emv-v2-1-1/123/application-data').reply(() => {
                return [ 200, { data: { country: 'BE', country_code: '0056', effective_date: '091101', expiration_date: '141130',
                        language: 'fr', name: 'LASTNAME/FIRSTNAME', pan: '6703XXXXXXXXXXXXXXX' }, success: true }];
            });
        });

        test('Makes the correct call for application data', () => {
            return emv.applicationData().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('country', 'BE');
                expect(res.data).toHaveProperty('country_code', '0056');
                expect(res.data).toHaveProperty('effective_date', '091101');
                expect(res.data).toHaveProperty('expiration_date', '141130');
                expect(res.data).toHaveProperty('language', 'fr');
                expect(res.data).toHaveProperty('name', 'LASTNAME/FIRSTNAME');
                expect(res.data).toHaveProperty('pan', '6703XXXXXXXXXXXXXXX');
            });
        });
    });

    describe(':: Applications ::', function () {
        beforeEach(function () {
            mock.onGet('containers/emv-v2-1-1/123/applications').reply(() => {
                return [ 200, { data: [ { aid: 'A0000000048002', name: 'MAESTRO', priority: 1 },
                        { aid: 'A0000000048008', name: 'MASTERCARD', priority: 1}], success: true }];
            });
        });

        test('Makes the correct call for applications', () => {
            return emv.applications().then((res) => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data[0]).toHaveProperty('name', 'MAESTRO');
                expect(res.data[1]).toHaveProperty('name', 'MASTERCARD');
            });
        });

    });

    describe(':: ICC Public Key Certificate ::', function () {
        beforeEach(function () {
            mock.onPost('containers/emv-v2-1-1/123/icc-public-key-certificate', { aid: 'A0000000048002' }).reply(() => {
                return [ 200, { data: { data: 'base64data', exponent: 'base64exponent', remainder: 'base64remainder' }, success: true }];
            });
        });

        test('Makes the correct call for ICC public key certificate', () => {
            return emv.iccPublicKeyCertificate('A0000000048002').then((res) => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('data', 'base64data');
                expect(res.data).toHaveProperty('exponent', 'base64exponent');
                expect(res.data).toHaveProperty('remainder', 'base64remainder');
            });
        });

    });

    describe(':: Issuer Public Key Certificate ::', function () {
        beforeEach(function () {
            mock.onPost('containers/emv-v2-1-1/123/issuer-public-key-certificate', { aid: 'A0000000048008' }).reply(() => {
                return [ 200, { data: { data: 'base64data', exponent: 'base64exponent', remainder: 'base64remainder' }, success: true }];
            });
        });

        test('Makes the correct call for issuer public key certificate', () => {
            return emv.issuerPublicKeyCertificate('A0000000048008').then((res) => {
                expect(res).toHaveProperty('success');
                expect(res.success).toEqual(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('data', 'base64data');
                expect(res.data).toHaveProperty('exponent', 'base64exponent');
                expect(res.data).toHaveProperty('remainder', 'base64remainder');
            });
        });

    });

});
