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

    beforeEach(()=>{
        localAuthConnection = new LocalAuthConnection();
        coreService = new CoreService(gclUnderTest,localAuthConnection);
        cardFactory = new CardFactory(gclUnderTest,localAuthConnection);
        beidPlugin = cardFactory.createEidBE();
    });

    describe('Belgian eID Test Cases', () => {

/*        it('should verify an existing local connection instance', ()=>{
           expect(localConnection).not.undefined;
        });*/

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
            $.ajax({
                url: gclUnderTest+'/',
                type: 'GET',
                dataType: 'json',
                headers: { 'Authorization':('Bearer ' + GCLConfig.Instance.jwt), 'Accept-Language':'en-US' },
                success: function(successResponse,status,jqXHR) {
                    console.log(JSON.stringify(successResponse));
                    done();
                },
                error: function(jqXHR,textStatus,errorThrown) {
                    console.log(JSON.stringify(jqXHR));
                    done();
                }
            });
/*            coreService.readers(function(err,data){
                console.log("Error: "+JSON.stringify(err));
                console.log("data: "+data);
                done();
            });*/
        });

    });
});


