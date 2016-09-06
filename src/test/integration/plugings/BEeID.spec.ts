import {expect} from "chai";
import {LocalConnection, LocalAuthConnection} from "../../../scripts/core/client/Connection";
import {CoreService} from "../../../scripts/core/services/CoreService";
import {CardFactory} from "../../../scripts/Plugins/smartcards/CardFactory";

describe('Plugin-Belgian eID', () => {
    let gclUnderTest = "https://localhost:10443/v1";
    let localConnection:LocalConnection;
    let localAuthConnection:LocalAuthConnection;
    let coreService;
    let cardFactory;
    let beidPlugin;

    beforeEach(()=>{
        localConnection = new LocalConnection();
        localAuthConnection = new LocalAuthConnection();
        coreService = new CoreService(gclUnderTest,localAuthConnection);
        cardFactory = new CardFactory(gclUnderTest,localConnection)
        beidPlugin = cardFactory.createEidBE();
    });

    describe('Belgian eID Test Cases', () => {

        it('should verify an existing local connection instance', ()=>{
           expect(localConnection).not.undefined;
        });

        it('should verify an existing local authentication connection instance', ()=>{
            expect(localAuthConnection).not.undefined;
        });

        it('should verify an existing core service instance', ()=>{
            expect(coreService).not.undefined;
        });

        it('should verify an existing card factory instance', ()=>{
            expect(cardFactory).not.undefined;
        });

        it('should return a belgian eid instance', ()=>{
            expect(beidPlugin).not.undefined;
        });

    });
});