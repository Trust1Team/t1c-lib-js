/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from "chai";
import { GCLConfig } from "../../../scripts/core/GCLConfig";
import { UrlUtil } from "../../../scripts/util/UrlUtil";

describe("URL Utility", () => {

    describe("can generate the correct url to use", function () {
        let config: GCLConfig;

        beforeEach(() => {
            config = new GCLConfig({});
        });

        it("for a default environment", () => {
            let url = UrlUtil.create("http://base", "/suffix", config, false);
            expect(url).to.be.a("string");
            expect(url).to.eq("http://base/suffix");
        });

        it("for a Citrix environment", () => {
            config.citrix = true;
            config.agentPort = 10;
            let url = UrlUtil.create("http://base", "/suffix", config, false);
            expect(url).to.be.a("string");
            expect(url).to.eq("http://base/agent/10/suffix");
        });

        it("for a Citrix environment, where the agent port is not set", () => {
            config.citrix = true;
            let url = UrlUtil.create("http://base", "/suffix", config, false);
            expect(url).to.be.a("string");
            expect(url).to.eq("http://base/agent/-1/suffix");
        });

        it("for a Citrix environment, for a request that doesn't need to be proxied to the agent", () => {
            config.citrix = true;
            config.agentPort = 10;
            let url = UrlUtil.create("http://base", "/suffix", config, true);
            expect(url).to.be.a("string");
            expect(url).to.eq("http://base/suffix");
        });
    });
});
