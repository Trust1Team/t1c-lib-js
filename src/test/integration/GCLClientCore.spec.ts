
import {LocalAuthConnection} from '../../scripts/core/client/Connection';
import {CoreService} from '../../scripts/core/service/CoreService';
import {GCLConfig, GCLConfigOptions} from '../../scripts/core/GCLConfig';


describe('GCLClient', () => {
    let gclUnderTest = 'https://localhost:34752/v3';
    let localAuthConnection: LocalAuthConnection;
    let core: CoreService;
    let config = new GCLConfig(new GCLConfigOptions());

    beforeEach(() => {
        localAuthConnection = new LocalAuthConnection(config);
        core = new CoreService(gclUnderTest, localAuthConnection);
    });

    describe('GCL Core Service', () => {

        it('should verify that a connection has been instantiated', () => {
            expect(localAuthConnection).not.toBeDefined;
        });

        it('should verify that a core service instance is available', () => {
            expect(core).not.toBeDefined;
        });

        it('should verify that the URL has been set correctly', () => {
            expect(core.getUrl()).toEqual(gclUnderTest);
        });

        it('should return information about the client browser', (done) => {
            core.infoBrowser((err, data) => {
                expect(err).toBeNull;
                expect(data).toBe;
                done();
            });
        });
    });
});
