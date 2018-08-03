/**
 * @author Maarten Casteels
 * @since 2016
 */
import {GCLConfig} from '../../../GCLConfig';

describe('Config', () => {
    let config: GCLConfig;

    beforeEach(() => {
        config = new GCLConfig({});
    });

    test('should return the default connector url', () => {
        let url: string = config.gclUrl;
        expect(url).toEqual('https://localhost:10443/v2');
    });

    test('should return the custom connector url', () => {
        let test = 'http://localhost:10080/v2';
        let myConfig: GCLConfig = new GCLConfig({gclUrl: test});
        let url: string = myConfig.gclUrl;
        expect(url).toEqual(test);
    });

    test('should return the custom ds url', () => {
        let options = {gwOrProxyUrl: 'https://gw.here.com', dsContextPath: '/trust1team/gclds/v200'};
        let myConfig: GCLConfig = new GCLConfig(options);
        let dsUrl: string = myConfig.dsUrl;
        expect(dsUrl).toEqual(options.gwOrProxyUrl + options.dsContextPath);
    });

    test('should return the correct API key when set', () => {
        let test = 'somekey';
        let myConfig: GCLConfig = new GCLConfig({apiKey: test});
        let apikey: string = myConfig.apiKey;
        expect(apikey).toEqual(test);
    });


    test('should set the config as constructed', () => {
        let gwUrl = 'https://dist.t1t.be';
        let apikey = 'someapikey';
        let myConfig = new GCLConfig({gwOrProxyUrl: gwUrl, apiKey: apikey});
        expect(myConfig.dsUrl).toEqual(gwUrl + '/trust1team/gclds/v2');
        expect(myConfig.apiKey).toEqual(apikey);
    });
});
