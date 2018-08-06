import { GCLConfig } from './../../../scripts/core/GCLConfig';
import { UrlUtil } from '../../../scripts/util/UrlUtil';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

describe('URL Utility', () => {

    describe('can generate the correct url to use', function () {
        let config: GCLConfig;

        beforeEach(() => {
            config = new GCLConfig({});
        });

        test('for a default environment', () => {
            let url = UrlUtil.create('http://base', '/suffix', config, false);
            expect(url).toEqual('http://base/suffix');
        });

        test('for a Citrix environment', () => {
            config.citrix = true;
            config.agentPort = 10;
            let url = UrlUtil.create('http://base', '/suffix', config, false);
            expect(url).toEqual('http://base/agent/10/suffix');
        });

        test('for a Citrix environment, where the agent port is not set', () => {
            config.citrix = true;
            let url = UrlUtil.create('http://base', '/suffix', config, false);
            expect(url).toEqual('http://base/agent/-1/suffix');
        });

        test('for a Citrix environment, for a request that doesn\'t need to be proxied to the agent', () => {
            config.citrix = true;
            config.agentPort = 10;
            let url = UrlUtil.create('http://base', '/suffix', config, true);
            expect(url).toEqual('http://base/suffix');
        });
    });
});
