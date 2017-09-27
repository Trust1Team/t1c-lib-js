/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from "chai";
import * as axios from "axios";
import * as MockAdapter from "axios-mock-adapter";
import { GCLConfig } from "../../../../../scripts/core/GCLConfig";
import { LocalConnection } from "../../../../../scripts/core/client/Connection";
import { PluginFactory } from "../../../../../scripts/plugins/PluginFactory";

describe("Oberthur Container", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const oberthur = new PluginFactory("", connection).createOberthurNO("123");
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("verifyPin", function () {
        beforeEach(function () {
            mock.onPost("plugins/oberthur/123/verify-pin", { private_key_reference: "key", pin: "1234" }).reply(() => {
                return [ 200, { data: "Verify Pin Data", success: true }];
            });
        });

        it("makes the correct call for activated data", () => {
            return oberthur.verifyPin({ private_key_reference: "key", pin: "1234" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string").eq("Verify Pin Data");
            });
        });
    });

});
