import { PinEnforcer } from './../../../scripts/util/PinEnforcer';
import { LocalConnection } from './../../../scripts/core/client/Connection';
import { GCLConfig } from './../../../scripts/core/GCLConfig';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

describe('PinEnforcer Utility', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const enforcingConfig = new GCLConfig({});
    enforcingConfig.forceHardwarePinpad = true;
    const enforcingConnection = new LocalConnection(enforcingConfig);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('Configuration', function () {
        beforeEach(function () {
            mock.onGet('https://localhost:10443/v2/card-readers/123')
                .reply(config => {
                    return [ 200, { success: true, data: { pinpad: true } }];
                });
        });

        test('will not intervene if the config does not enable checking', () => {
            return PinEnforcer.check(connection, '123', { pin: '1234' });
        });

        test('will intervene if pin checking is enabled in the config', () => {
            return PinEnforcer.check(enforcingConnection, '123', { pin: '1234'}).catch(err => {
                expect(err).toHaveProperty('data');
                expect(err.data).toHaveProperty('description');
                expect(err.data.description).toEqual('Strict pinpad enforcement is enabled.' +
                    ' This request was sent with a PIN, but the reader has a pinpad.');
            });
        });
    });

    describe('Pin Enforcement', () => {
        beforeEach(function () {
            mock.onGet('https://localhost:10443/v2/card-readers/123')
                .reply(config => {
                    return [ 200, { success: true, data: { pinpad: true } }];
                });
            mock.onGet('https://localhost:10443/v2/card-readers/321')
                .reply(config => {
                    return [ 200, { success: true, data: { pinpad: false } }];
                });
        });

        test('will reject a request that needs a pin', () => {
            return PinEnforcer.check(enforcingConnection, '321', {}).then(() => {
            }, err => {
                expect(err).toHaveProperty('data');
                expect(err.data).toHaveProperty('status', 400);
                expect(err.data).toHaveProperty('code', '601');
                expect(err.data).toHaveProperty('description');
                expect(err.data.description).toEqual('Strict pinpad enforcement is enabled.' +
                    ' This request was sent without a PIN, but the reader does not have' +
                    ' a pinpad and OS PIN dialog is not enabled.');
            });
        });

        test('will reject a request that has pin but should not have one', () => {
            return PinEnforcer.check(enforcingConnection, '123',  { pin: '1234' }).then(() => {
            }, err => {
                // console.log(err);
                // console.log(err.data);
                expect(err).toHaveProperty('data');
                expect(err.data).toHaveProperty('status', 400);
                expect(err.data).toHaveProperty('code', '600');
                expect(err.data).toHaveProperty('description');
                expect(err.data.description).toEqual('Strict pinpad enforcement is enabled.' +
                    ' This request was sent with a PIN, but the reader has a pinpad.');
            });
        });
    });
});
