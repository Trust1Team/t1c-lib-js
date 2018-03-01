/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import { GCLConfig } from '../../../../scripts/core/GCLConfig';
import { LocalConnection } from '../../../../scripts/core/client/Connection';
import { PluginFactory } from '../../../../scripts/plugins/PluginFactory';
import { PubKeyService } from '../../../../scripts/util/PubKeyService';

describe('Generic cards and containers', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
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

    describe('Generic Container', function () {
        // instantiate a class that implements generic container
        const relo = new PluginFactory('', connection).createRemoteLoading('123');
        const beid = new PluginFactory('test', connection).createEidBE('123134141');

        it('creates a correct container suffix', () => {
            let reloSuffix = (relo as any).containerSuffix('/test');
            expect(reloSuffix).to.be.a('string');
            expect(reloSuffix, 'Wrong suffix created').to.eq('/containers/readerapi/123/test');

            let beidSuffix = (beid as any).containerSuffix('/beid-url');
            expect(beidSuffix).to.be.a('string');
            expect(beidSuffix, 'Wrong suffix created').to.eq('/containers/beid/123134141/beid-url');
        });
    });


    describe('Generic SmartCard', function () {
        // instantiate a class that implements generic smartcard
        const mobib = new PluginFactory('', connection).createMobib('123');

        beforeEach(function () {
            mock.onGet('containers/mobib/123')
                .reply(config => {
                    return [ 200, { success: true, data: config.params } ];
                });
        });

        it('makes the correct call to get all data', () => {
            return mobib.allData([]).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'Filter property found when not expected').to.not.have.property('filter');
            });
        });

        it('makes the correct call with filters', () => {
            return mobib.allData({ filters: [ 'test1', 'test2' ], parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'Filter property not found when expected').to.have.property('filter');
                expect(res.data.filter).to.eq('test1,test2');
            });
        });
    });

    describe('Generic PinCard', function () {
        // instantiate a class that implements generic pincard
        const ocra = new PluginFactory('', connection).createOcra('123');

        beforeEach(function () {
            mock.onPost('containers/ocra/123/verify-pin')
                .reply(config => {
                    return [ 200, { success: true, data: JSON.parse(config.data) } ];
                });
        });

        it('makes the correct call to verify pin', () => {
            return ocra.verifyPin({}).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'PIN property found when not expected').to.not.have.property('pin');
            });
        });

        it('makes the correct call to verify pin with provided pincode', () => {
            return ocra.verifyPin({ pin: '1234' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'PIN property not found when expected').to.have.property('pin');
            });
        });
    });

    describe('Generic CertCard', function () {
        // instantiate a class that implements generic certcard
        const aventra = new PluginFactory('', connection).createAventraNO('123');

        beforeEach(function () {
            // authenticate
            mock.onGet('containers/aventra/123/authenticate').reply(() => {
                return [ 200, { success: true, data: [ 'algo', 'refs', 'authentication'] }];
            });
            mock.onPost('containers/aventra/123/authenticate').reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // sign
            mock.onGet('containers/aventra/123/sign').reply(() => {
                return [ 200, { success: true, data: [ 'algo', 'refs', 'signing'] }];
            });
            mock.onPost('containers/aventra/123/sign').reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // certificates
            mock.onGet('containers/aventra/123/certificates').reply(config => {
                return [ 200, { success: true, data: config.params }];
            });
            mock.onGet('containers/aventra/123/certificates/root').reply(config => {
                return [ 200, { success: true, data: 'mockrootcert' }];
            });
        });

        it('can get algo refs for authentication', () => {
            return aventra.allAlgoRefsForAuthentication().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(3).contains('algo').contains('refs').contains('authentication');
            });
        });

        it('can get algo refs for signing', () => {
            return aventra.allAlgoRefsForSigning().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(3).contains('algo').contains('refs').contains('signing');
            });
        });

        it('can get all certificates', () => {
            return aventra.allCerts([]).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'Filter property found when not expected').to.not.have.property('filter');
            });
        });

        it('can get a filtered subset of the certificates', () => {
            return aventra.allCerts({ filters: [ 'cert1', 'cert2' ], parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'Filter property not found when expected').to.have.property('filter');
                expect(res.data.filter, 'Incorrect filter parameter').to.eq('cert1,cert2');
            });
        });

        it('can authenticate', () => {
            return aventra.authenticate({ algorithm_reference: 'SHA256', data: 'inputdata'}).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.a('object');
                expect(mockData, 'Algorithm reference not passed to GCL').to.have.property('algorithm_reference');
                expect(mockData.algorithm_reference, 'Algorithm reference should be lowercase').to.eq('sha256');
                expect(mockData, 'Data not passed to GCL').to.have.property('data');
                expect(mockData.data, 'Incorrect data passed to GCL').to.eq('inputdata');
            });
        });

        it('can sign data', () => {
            return aventra.signData({ algorithm_reference: 'SHA256', data: 'inputdata'}).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.a('object');
                expect(mockData, 'Algorithm reference not passed to GCL').to.have.property('algorithm_reference');
                expect(mockData.algorithm_reference, 'Algorithm reference should be lowercase').to.eq('sha256');
                expect(mockData, 'Data not passed to GCL').to.have.property('data');
                expect(mockData.data, 'Incorrect data passed to GCL').to.eq('inputdata');
            });
        });

        it('can retrieve a requested certificate', () => {
            return (aventra as any).getCertificate('/root', { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.a('object');
                expect(mockData, 'Base64 certificate not found').to.have.property('base64');
                expect(mockData.base64, 'Incorrect cert data returned').to.eq('mockrootcert');
            });
        });
    });

    describe('Generic Secured CertCard', function () {
        // instantiate a class that implements generic certcard
        const piv = new PluginFactory('', connection).createPIV('123');

        beforeEach(function () {
            // all data
            mock.onPost('containers/piv/123').reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // authenticate
            mock.onGet('containers/piv/123/authenticate').reply(() => {
                return [ 200, { success: true, data: [ 'algo', 'refs', 'authentication'] }];
            });
            mock.onPost('containers/piv/123/authenticate').reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // sign
            mock.onGet('containers/piv/123/sign').reply(() => {
                return [ 200, { success: true, data: [ 'algo', 'refs', 'signing'] }];
            });
            mock.onPost('containers/piv/123/sign').reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // verify pin
            mock.onPost('containers/piv/123/verify-pin')
                .reply(config => {
                    return [ 200, { success: true, data: JSON.parse(config.data) } ];
                });

            // certificates
            mock.onPost('containers/piv/123/certificates').reply(config => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { success: true, data: config.params }];
                } else { return [ 404 ]; }
            });
            mock.onPost('containers/piv/123/certificates/authentication').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { success: true, data: 'mockauthcert' }];
                } else { return [ 404 ]; }
            });
            mock.onPost('containers/piv/123/certificates/root').reply((config) => {
                let data = JSON.parse(config.data);
                if (data && data.pin && data.pin.length) {
                    return [ 200, { success: true, data: [ 'mockrootcert', 'mockrootcert2' ] }];
                } else { return [ 404 ]; }
            });
        });

        it('can get algo refs for authentication', () => {
            return piv.allAlgoRefsForAuthentication().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(3).contains('algo').contains('refs').contains('authentication');
            });
        });

        it('can get algo refs for signing', () => {
            return piv.allAlgoRefsForSigning().then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(3).contains('algo').contains('refs').contains('signing');
            });
        });

        it('can get all certificates', () => {
            return piv.allCerts([], { pin: '0000' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'Filter property found when not expected').to.not.have.property('filter');
            });
        });

        it('makes get a filtered subset of the certificates', () => {
            return piv.allCerts({ filters: [ 'cert1', 'cert2' ], parseCerts: false }, { pin: '0000' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'Filter property not found when expected').to.have.property('filter');
                expect(res.data.filter, 'Incorrect filter parameter').to.eq('cert1,cert2');
            });
        });

        it('can authenticate', () => {
            return piv.authenticate({ algorithm_reference: 'SHA256', data: 'inputdata' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.a('object');
                expect(mockData, 'Algorithm reference not passed to GCL').to.have.property('algorithm_reference');
                expect(mockData, 'Data not passed to GCL').to.have.property('data');
                expect(mockData.data, 'Incorrect data passed to GCL').to.eq('inputdata');
            });
        });


        it('can sign data', () => {
            return piv.signData({ algorithm_reference: 'SHA256', data: 'inputdata' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.a('object');
                expect(mockData, 'Algorithm reference not passed to GCL').to.have.property('algorithm_reference');
                expect(mockData, 'Data not passed to GCL').to.have.property('data');
                expect(mockData.data, 'Incorrect data passed to GCL').to.eq('inputdata');
            });
        });

        it('can verify pin', () => {
            return piv.verifyPin({}).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'PIN property found when not expected').to.not.have.property('pin');
            });
        });

        it('can verify pin with provided pincode', () => {
            return piv.verifyPin({ pin: '0000' }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                expect(res.data).to.be.a('object');
                expect(res.data, 'PIN property not found when expected').to.have.property('pin');
            });
        });

        it('can retrieve a requested certificate', () => {
            return (piv as any).getCertificate('/authentication', { pin: '0000' }, { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.a('object');
                expect(mockData, 'Base64 certificate not found').to.have.property('base64');
                expect(mockData.base64, 'Incorrect cert data returned').to.eq('mockauthcert');
            });
        });

        it('can retrieve a requested certificate array', () => {
            return (piv as any).getCertificateArray('/root', { pin: '0000' }, { parseCerts: false }).then(res => {
                expect(res).to.have.property('success');
                expect(res.success).to.be.a('boolean');
                expect(res.success).to.eq(true);

                expect(res).to.have.property('data');
                let mockData: any = res.data;
                expect(mockData).to.be.an('array').of.length(2);
                expect(mockData[0], 'Base64 certificate not found').to.have.property('base64');
                expect(mockData[1], 'Base64 certificate not found').to.have.property('base64');
                expect(mockData[0].base64, 'Incorrect cert data returned').to.eq('mockrootcert');
                expect(mockData[1].base64, 'Incorrect cert data returned').to.eq('mockrootcert2');
            });
        });
    });
});
