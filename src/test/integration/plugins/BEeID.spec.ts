///<reference path="../../../../typings/index.d.ts"/>

import {expect} from "chai";
import {LocalConnection, LocalAuthConnection,Connection} from "../../../scripts/core/client/Connection";
import {CoreService} from "../../../scripts/core/services/CoreService";
import {CardFactory} from "../../../scripts/Plugins/smartcards/CardFactory";
import {GCLConfig} from "../../../scripts/core/GCLConfig";

describe('Plugin-Belgian eID', () => {
    let gclUnderTest = "https://localhost:10443/v1";
    let localAuthConnection:LocalAuthConnection;
    let coreService;
    let cardFactory;
    let beidPlugin;
    let config = new GCLConfig("https://dist.t1t.be/v1","someapikey");


    beforeEach(()=>{
        localAuthConnection = new LocalAuthConnection(config);
        coreService = new CoreService(gclUnderTest,localAuthConnection, config);
        cardFactory = new CardFactory(gclUnderTest,new LocalConnection(config), config);
        beidPlugin = cardFactory.createEidBE();
    });

    describe('Belgian eID Test Cases', () => {

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

        it('should return available card readers', (done)=>{
            coreService.readers(function(err,data){
                console.log("Error: "+JSON.stringify(err));
                console.log("data: "+data);
                done();
            });
        });

    });
});


