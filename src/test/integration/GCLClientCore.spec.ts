///<reference path="../../../typings/index.d.ts"/>
import {expect} from "chai";
import {LocalAuthConnection} from "../../scripts/core/client/Connection";
import {CoreService} from "../../scripts/core/services/CoreService";
import {GCLConfig} from "../../scripts/core/GCLConfig";

describe('GCLClient', () => {
    let gclUnderTest = "https://localhost:10443/v1";
    let localAuthConnection:LocalAuthConnection;
    let core:CoreService;
    let config = new GCLConfig("https://dist.t1t.be/v1","someapikey");


    beforeEach(() => {
        localAuthConnection = new LocalAuthConnection(config);
        core = new CoreService(gclUnderTest,localAuthConnection, config);
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

        it('should return information about the client browser', (done) => {
            core.infoBrowser((err,data) => {
                expect(err).to.be.null;
                expect(data).exist;
                done();
            });
        });

        it('should return info about the GCL installation', (done) => {
            core.info((err, data) => {
                expect(err).to.be.null;
                expect(data).exist;
                done()
            });
        });

        it('should return available card readers', (done) => {
            core.readers((err,data) => {
                expect(err).to.be.null;
                expect(data).exist;
                done();
            });
        });

        it('should return readers with available cards', (done) => {
            core.readersCardAvailable((err,data) => {
                expect(err).to.be.null;
                expect(data).exist;
                done();
            });
        });

        it('should return readers without available cards', (done) => {
            core.readersCardsUnavailable((err,data) => {
                expect(err).to.be.null;
                expect(data).exist;
                done();
            });
        });

        it('should return a list of available plugins', (done) => {
            core.plugins((err, data) => {
                expect(err).to.be.null;
                expect(data).exist;
                done();
            })
        });

        it('should return the T1C-Lib version', () => {
            expect(core.version()).to.be.a('string');
            expect(core.version()).to.equal('%%GULP_INJECT_VERSION%%');
        });
    });
});