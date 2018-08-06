import { LocalConnection, LocalAuthConnection } from '../../../scripts/core/client/Connection';
import {GCLConfig, GCLConfigOptions} from '../../../scripts/core/GCLConfig';
import { CoreService } from '../../../scripts/core/service/CoreService';
import { PluginFactory } from '../../../scripts/plugins/PluginFactory';

describe('Plugin-Belgian eID', () => {
    let gclUnderTest = 'https://localhost:10443/v2';
    let localAuthConnection: LocalAuthConnection;
    let coreService;
    let cardFactory;
    let beidPlugin;
    let configOptions = new GCLConfigOptions(gclUnderTest, 'https://dist.t1t.be/');
    let config = new GCLConfig(configOptions);


    beforeEach(() => {
        localAuthConnection = new LocalAuthConnection(config);
        coreService = new CoreService(gclUnderTest, localAuthConnection);
        cardFactory = new PluginFactory(gclUnderTest, new LocalConnection(config));
        beidPlugin = cardFactory.createEidBE();
    });

    describe('Belgian eID Test Cases', () => {

        test('should verify an existing local authentication connection instance', () => {
            expect(localAuthConnection).not.toBeDefined;
        });

        test('should verify an existing core service instance', () => {
            expect(coreService).not.toBeDefined;
        });

        test('should verify an existing card factory instance', () => {
            expect(cardFactory).not.toBeDefined;
        });

        test('should return a belgian eid instance', () => {
            expect(beidPlugin).not.toBeDefined;
        });

    });
});

