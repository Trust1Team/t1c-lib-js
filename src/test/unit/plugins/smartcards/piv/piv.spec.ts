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

describe("PIV/CIV Container", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const piv = new PluginFactory("", connection).createPIV("123");
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("printedInformation", function () {
        beforeEach(function () {
            mock.onPost("plugins/piv/123/printed-information", { pin: "1234" }).reply(() => {
                return [ 200, { data: "Printed Information Data", success: true }];
            });
        });

        it("makes the correct call for printed information data", () => {
            return piv.printedInformation({ pin: "1234" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string").eq("Printed Information Data");
            });
        });
    });

    describe("facialImage", function () {
        beforeEach(function () {
            mock.onPost("plugins/piv/123/facial-image", { pin: "1234" }).reply(() => {
                return [ 200, { data: "Facial Image Data", success: true }];
            });
        });

        it("makes the correct call for facial image data", () => {
            return piv.facialImage({ pin: "1234" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string").eq("Facial Image Data");
            });
        });
    });

});
