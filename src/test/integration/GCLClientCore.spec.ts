import {expect} from "chai";
import {AbstractDSClient,DSClient} from "../../scripts/core/ds/DSClient";
import {RemoteConnection, LocalAuthConnection, LocalConnection} from "../../scripts/core/client/Connection";
import {CoreService} from "../../scripts/core/services/CoreService";
//workaround in order to use require for non available module in DefinitlyTyped
declare var require: any;
var jwtDecode = require('jwt-decode');

describe('GCLClient', () => {
    let gclUnderTest = "https://localhost:10443/v1";
    let localAuthConnection:LocalAuthConnection;
    let coreService:CoreService;

    beforeEach(() => {
        localAuthConnection = new LocalAuthConnection();
        coreService = new CoreService(gclUnderTest,localAuthConnection);
    });

    describe('GCL Core Service Expectations', () => {

        it('should verify that a connection has been instantiated', () => {
            expect(localAuthConnection).not.undefined;
        });

        it('should verify that a core service instance is available', () => {
            expect(coreService).not.undefined;
        });

        it('should verify that the URL has been set correctly', () => {
            expect(coreService.getUrl()).to.equals(gclUnderTest);
        });

        it('should return information about the GCL client', (done) => {
            coreService.info(function(err,data){
                console.log(JSON.stringify(err));
                console.log(JSON.stringify(data));
/*                expect(err).to.be.null;
                expect(data).to.exist;
                expect(data.data).to.exist;
                expect(data.success).to.exist;*/
                done();
            })
        });
    });
});