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

describe("Aventra Container", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const aventra = new PluginFactory("", connection).createAventraNO("123");
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("resetPin", function () {
        beforeEach(function () {
            mock.onPost("plugins/aventra/123/reset-pin",
                { puk: "9999999", new_pin: "1234", private_key_reference: "non-repudiation" }).reply(() => {
                return [ 200, { data: "Reset Pin Data", success: true }];
            });
        });

        it("makes the correct call for reset pin", () => {
            return aventra.resetPin({ puk: "9999999", new_pin: "1234", private_key_reference: "non-repudiation" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string").eq("Reset Pin Data");
            });
        });
    });

    describe("verifyPin", function () {
        beforeEach(function () {
            mock.onPost("plugins/aventra/123/verify-pin", { pin: "1234", private_key_reference: "private_key" }).reply(() => {
                return [ 200, { data: "Verify Pin Data", success: true }];
            });
        });

        it("makes the correct call for verify pin", () => {
            return aventra.verifyPin({ pin: "1234", private_key_reference: "private_key" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string").eq("Verify Pin Data");
            });
        });
    });

});
