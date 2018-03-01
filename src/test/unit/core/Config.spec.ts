/**
 * @author Maarten Casteels
 * @since 2016
 */
import { expect } from 'chai';
import { GCLConfig } from '../../../scripts/core/GCLConfig';

describe('Config', () => {
    let config: GCLConfig;

    beforeEach(() => {
        config = new GCLConfig({});
    });

    describe('gcl-config', () => {
        it('should return the default connector url', () => {
            let url: string = config.gclUrl;
            expect(url).to.be.eq('https://localhost:10443/v1');
        });

        it('should return the custom connector url', () => {
            let test = 'http://localhost:10080/v2';
            let myConfig: GCLConfig = new GCLConfig({ gclUrl: test });
            let url: string = myConfig.gclUrl;
            expect(url).to.be.eq(test);
        });

        it('should return the custom ds url', () => {
            let options = { gwOrProxyUrl: 'https://gw.here.com', dsContextPath: '/trust1team/gclds/v200' };
            let myConfig: GCLConfig = new GCLConfig(options);
            let dsUrl: string = myConfig.dsUrl;
            expect(dsUrl).to.be.eq(options.gwOrProxyUrl + options.dsContextPath);
        });

        it('should return the correct API key when set', () => {
            let test = 'somekey';
            let myConfig: GCLConfig = new GCLConfig({ apiKey: test});
            let apikey: string = myConfig.apiKey;
            expect(apikey).to.be.eq(test);
        });

    });

    describe('#gcl-config-constructor', () => {
        it('should set the config as constructed', () => {
            let gwUrl = 'https://dist.t1t.be';
            let apikey = 'someapikey';
            let myConfig = new GCLConfig({ gwOrProxyUrl: gwUrl, apiKey: apikey });
            expect(myConfig.dsUrl).to.be.eq(gwUrl + '/trust1team/gclds/v2');
            expect(myConfig.apiKey).to.be.eq(apikey);
        });
    });
});
