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
import { AbstractEidBE } from "../../../../../scripts/plugins/smartcards/eid/be/EidBeModel";

describe("Belgian eID Container", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const beid: AbstractEidBE = new PluginFactory("", connection).createEidBE("123");
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("rnData", function () {
        beforeEach(function () {
            mock.onGet("plugins/beid/123/rn").reply(() => {
                return [ 200, { data: "RN Data", success: true }];
            });
        });

        it("makes the correct call for RN Data", () => {
            return beid.rnData().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("RN Data");
            });
        });
    });

    describe("address", function () {
        beforeEach(function () {
            mock.onGet("plugins/beid/123/address").reply(() => {
                return [ 200, { data: "Address Data", success: true }];
            });
        });

        it("makes the correct call for address data", () => {
            return beid.address().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Address Data");
            });
        });
    });

    describe("picture", function () {
        beforeEach(function () {
            mock.onGet("plugins/beid/123/picture").reply(() => {
                return [ 200, { data: "Picture Data", success: true }];
            });
        });

        it("makes the correct call for picture data", () => {
            return beid.picture().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Picture Data");
            });
        });
    });

    describe("verifyPin", function () {
        beforeEach(function () {
            mock.onPost("plugins/beid/123/verify-pin", { private_key_reference: "non-repudiation", pin: "1234" }).reply(() => {
                return [ 200, { data: "Verify Pin Data", success: true }];
            });
        });

        it("makes the correct call for verify pin", () => {
            return beid.verifyPin({ pin: "1234" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Verify Pin Data");
            });
        });
    });
});
