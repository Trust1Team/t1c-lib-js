/**
 * @author Maarten Casteels
 * @since 2016
 */
import { expect } from "chai";
import {GCLConfig} from "../../scripts/core/GCLConfig";

describe('Config', () => {
    let config:GCLConfig;

    beforeEach(() => {
        config = new GCLConfig();
    });

    describe('gcl-config', () => {
        it('should return the default connector url', () => {
            var url:string = config.gclUrl;
            expect(url).to.be.eq('https://localhost:10433/v1');
        });

        it('should return the custom connector url', () => {
            let test = "http://localhost:10080/v2";
            let myConfig:GCLConfig = new GCLConfig();
            myConfig.gclUrl = test;
            var url:string = myConfig.gclUrl;
            expect(url).to.be.eq(test);
        });

        it('should return the custom ds url', () => {
            let test = "https://accapim.t1t.be:443/trust1team/gclds/v1";
            let myConfig:GCLConfig = new GCLConfig();
            myConfig.dsUrl = test;
            var dsUrl:string = myConfig.dsUrl;
            expect(dsUrl).to.be.eq(test);
        });

        it('should return the custom ds url', () => {
            let test = "somekey";
            let myConfig:GCLConfig = new GCLConfig();
            myConfig.apiKey = test;
            var apikey:string = myConfig.apiKey;
            expect(apikey).to.be.eq(test);
        });

    });

    describe('#gcl-config-constructor', () => {
        it('should set the config as constructed', () => {
            var dsUrl = "https://dist.t1t.be/v1";
            var gclUrl = "https://localhost:10443/v1";
            var apikey = "someapikey";
            var allowAutoUpdate = true;
            var implicitDownload = false;
            let myConfig = new GCLConfig(gclUrl,dsUrl,apikey,allowAutoUpdate,implicitDownload);
            expect(myConfig.dsUrl).to.be.eq(dsUrl);
            expect(myConfig.gclUrl).to.be.eq(gclUrl);
            expect(myConfig.apiKey).to.be.eq(apikey);
            expect(myConfig.allowAutoUpdate).to.be.eq(allowAutoUpdate);
            expect(myConfig.implicitDownload).to.be.eq(implicitDownload);
        });
    });
});