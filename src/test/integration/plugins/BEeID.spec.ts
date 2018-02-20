
import { expect } from "chai";
import { LocalConnection, LocalAuthConnection } from "../../../scripts/core/client/Connection";
import { GCLConfig } from "../../../scripts/core/GCLConfig";
import { CoreService } from "../../../scripts/core/service/CoreService";
import { PluginFactory } from "../../../scripts/plugins/PluginFactory";

describe("Plugin-Belgian eID", () => {
    let gclUnderTest = "https://localhost:10443/v1";
    let localAuthConnection: LocalAuthConnection;
    let coreService;
    let cardFactory;
    let beidPlugin;
    let config = new GCLConfig("https://dist.t1t.be/v1", "someapikey");


    beforeEach(() => {
        localAuthConnection = new LocalAuthConnection(config);
        coreService = new CoreService(gclUnderTest, localAuthConnection);
        cardFactory = new PluginFactory(gclUnderTest, new LocalConnection(config));
        beidPlugin = cardFactory.createEidBE();
    });

    describe("Belgian eID Test Cases", () => {

        it("should verify an existing local authentication connection instance", () => {
            expect(localAuthConnection).not.undefined;
        });

        it("should verify an existing core service instance", () => {
            expect(coreService).not.undefined;
        });

        it("should verify an existing card factory instance", () => {
            expect(cardFactory).not.undefined;
        });

        it("should return a belgian eid instance", () => {
            expect(beidPlugin).not.undefined;
        });

    });
});


