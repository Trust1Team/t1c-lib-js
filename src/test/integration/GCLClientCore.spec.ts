import {expect} from "chai";
import {LocalAuthConnection} from "../../scripts/core/client/Connection";
import {CoreService} from "../../scripts/core/services/CoreService";

describe('GCLClient', () => {
    let gclUnderTest = "https://localhost:10443/v1";
    let localAuthConnection:LocalAuthConnection;
    let core:CoreService;

    beforeEach(() => {
        localAuthConnection = new LocalAuthConnection();
        core = new CoreService(gclUnderTest,localAuthConnection);
    });

    describe('GCL Core Service', () => {

        it('should verify that a connection has been instantiated', () => {
            expect(localAuthConnection).not.undefined;
        });

        it('should verify that a core service instance is available', () => {
            expect(core).not.undefined;
        });

        it('should verify that the URL has been set correctly', () => {
            expect(core.getUrl()).to.equals(gclUnderTest);
        });

        it('should return information about the GCL client', (done) => {
            core.info(function(err,data){
                expect(err).to.be.null;
                expect(data).exist;
                done();
            })
        });
    });
});