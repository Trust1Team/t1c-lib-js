/**
 * @author Maarten Somers
 * @since 2017
 */
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {GCLConfig, LocalAuthConnection} from '../../..';
import {CoreService} from '../../../scripts/core/service/CoreService';


describe('Generic Service', () => {
    const gclConfig = new GCLConfig({ gclUrl: 'https://localhost:10443/v1' });
    const gclUnderTest = 'https://localhost:10443/v1';
    const localAuthConnection: LocalAuthConnection = new LocalAuthConnection(gclConfig);
    const core: CoreService = new CoreService(gclUnderTest, localAuthConnection);

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        mock.onGet('https://localhost:10443/v1/card-readers').reply(config => {
            return [ 200, { success: true,
                data: [
                    { id: '12', card: { atr: '111', description: [ 'Mocked Unknown Card' ] }, name: 'Mocked Reader', pinpad: false },
                    { id: '34', card: { atr: '222', description: [ 'Bla' ] }, name: 'Mocked Reader', pinpad: false }
                ]
            }];
        });
    });

    afterEach(() => {
        mock.restore();
    });


    describe('containerForReader', () => {
        // it("returns the expected url for a given agent port", () => {
            // return core.containerFor.containerForReader(client, "34").then(res => {
            //     console.log(res);
            // });
        // });
    });

    describe('dumpData', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });

    describe('authenticateCapable', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });

    describe('signCapable', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });

    describe('verifyPinCapable', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });

    describe('authenticate', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });

    describe('sign', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });

    describe('verifyPin', () => {
        // it("returns the expected url for a given agent port", () => {
        //
        // });
    });
});
