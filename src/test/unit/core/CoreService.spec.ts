/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from "chai";
import * as axios from "axios";
import * as MockAdapter from "axios-mock-adapter";
import { CoreService } from "../../../scripts/core/service/CoreService";
import { GCLConfig } from "../../../scripts/core/GCLConfig";
import { LocalConnection } from "../../../scripts/core/client/Connection";

describe("Core Services", () => {
    let gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    let core = new CoreService("", connection);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("activate", () => {
        beforeEach(function () {
            mock.onPost("admin/activate").reply(() => {
                return [ 200, { data: "Activation Data", success: true }];
            });
        });

        it("makes the correct call to activate", () => {
            return core.activate().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Activation Data");
            });
        });
    });

    describe("getPubKey", () => {
        beforeEach(function () {
            mock.onGet("admin/certificate").reply(() => {
                return [ 200, { data: "Get Pub Key Data", success: true }];
            });
        });

        it("makes the correct call to get pub key", () => {
            return core.getPubKey().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Get Pub Key Data");
            });
        });
    });

    describe("info", () => {
        beforeEach(function () {
            mock.onGet("/").reply(() => {
                return [ 200, { data: "Info Data", success: true }];
            });
        });

        it("makes the correct call to get info", () => {
            return core.info().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Info Data");
            });
        });
    });

    describe("plugins", () => {
        beforeEach(function () {
            mock.onGet("/plugins").reply(() => {
                return [ 200, { data: "Plugins Data", success: true }];
            });
        });

        it("makes the correct call to get plugins", () => {
            return core.plugins().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Plugins Data");
            });
        });
    });

    describe("reader", () => {
        beforeEach(function () {
            mock.onGet("/card-readers/123").reply(() => {
                return [ 200, { data: "Reader Data", success: true }];
            });
        });

        it("makes the correct call to get card reader data", () => {
            return core.reader("123").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Reader Data");
            });
        });
    });

    describe("readers", () => {
        beforeEach(function () {
            mock.onGet("/card-readers").reply((config) => {
                console.log(config.params);
                if (config.params && config.params["card-inserted"] === true) {
                    return [ 200, { data: "Readers Data Card Inserted", success: true }];
                } else if (config.params && config.params["card-inserted"] === false) {
                    return [ 200, { data: "Readers Data No Card Inserted", success: true }];
                } else {
                    return [ 200, { data: "Readers Data", success: true }];
                }
            });
        });

        it("makes the correct call to get card reader data", () => {
            return core.readers().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Readers Data");
            });
        });

        it("makes the correct call to get card reader data with card inserted", () => {
            return core.readersCardAvailable().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Readers Data Card Inserted");
            });
        });

        it("makes the correct call to get card reader data without card inserted", () => {
            return core.readersCardsUnavailable().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Readers Data No Card Inserted");
            });
        });
    });


    describe("setPubKey", () => {
        beforeEach(function () {
            mock.onPut("/admin/certificate", { certificate: "pubkey" }).reply(() => {
                return [ 200, { data: "Set Pub Key Data", success: true }];
            });
        });

        it("makes the correct call to set pub key", () => {
            return core.setPubKey("pubkey").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("Set Pub Key Data");
            });
        });
    });
});
