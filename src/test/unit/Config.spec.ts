/**
 * @author Maarten Casteels
 * @since 2016
 */
///<reference path="../../../typings/index.d.ts"/>
import { expect } from "chai";
import {GCLConfig} from "../../scripts/core/GCLConfig";

describe('Config', () => {
    let config:GCLConfig;

    beforeEach(() => {
        config = new GCLConfig();
    });

    describe('gcl-config', () => {
        it('should return the default connector url', () => {
            let url:string = config.gclUrl;
            expect(url).to.be.eq('https://localhost:10443/v1');
        });

        it('should return the custom connector url', () => {
            let test = "http://localhost:10080/v2";
            let myConfig:GCLConfig = new GCLConfig();
            myConfig.gclUrl = test;
            let url:string = myConfig.gclUrl;
            expect(url).to.be.eq(test);
        });

        it('should return the custom ds url', () => {
            let test = "https://accapim.t1t.be:443/trust1team/gclds/v1";
            let myConfig:GCLConfig = new GCLConfig();
            myConfig.dsUrl = test;
            let dsUrl:string = myConfig.dsUrl;
            expect(dsUrl).to.be.eq(test);
        });

        it('should return the custom ds url', () => {
            let test = "somekey";
            let myConfig:GCLConfig = new GCLConfig();
            myConfig.apiKey = test;
            let apikey:string = myConfig.apiKey;
            expect(apikey).to.be.eq(test);
        });

    });

    describe('#gcl-config-constructor', () => {
        it('should set the config as constructed', () => {
            let dsUrl = "https://dist.t1t.be/v1";
            let apikey = "someapikey";
            let myConfig = new GCLConfig(dsUrl,apikey);
            expect(myConfig.dsUrl).to.be.eq(dsUrl + '/trust1team/gclds/v1');
            expect(myConfig.apiKey).to.be.eq(apikey);
        });
    });
});