/**
 * @author Maarten Somers
 * @since 2017
 */
///<reference path="../../../../../typings/index.d.ts"/>

import { expect } from "chai";
import * as axios from "axios";
import * as MockAdapter from "axios-mock-adapter";
import { GCLConfig } from "../../../../scripts/core/GCLConfig";
import { LocalConnection } from "../../../../scripts/core/client/Connection";
import { PluginFactory } from "../../../../scripts/plugins/PluginFactory";

describe("Generic cards and containers", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("Generic Container", function () {
        // instantiate a class that implements generic container
        const relo = new PluginFactory("", connection).createRemoteLoading("123");
        const beid = new PluginFactory("test", connection).createEidBE("123134141");

        it("creates a correct container suffix", () => {
            let reloSuffix = (relo as any).containerSuffix("/test");
            expect(reloSuffix).to.be.a("string");
            expect(reloSuffix, "Wrong suffix created").to.eq("/plugins/readerapi/123/test");

            let beidSuffix = (beid as any).containerSuffix("/beid-url");
            expect(beidSuffix).to.be.a("string");
            expect(beidSuffix, "Wrong suffix created").to.eq("/plugins/beid/123134141/beid-url");
        });
    });


    describe("Generic SmartCard", function () {
        // instantiate a class that implements generic smartcard
        const mobib = new PluginFactory("", connection).createMobib("123");

        beforeEach(function () {
            mock.onGet("plugins/mobib/123")
                .reply(config => {
                    return [ 200, { success: true, data: config.params } ];
                });
        });

        it("makes the correct call to get all data", () => {
            return mobib.allData([]).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");
                expect(res.data, "Filter property found when not expected").to.not.have.property("filter");
            });
        });

        it("makes the correct call with filters", () => {
            return mobib.allData({ filters: [ "test1", "test2" ] }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");
                expect(res.data, "Filter property not found when expected").to.have.property("filter");
                expect(res.data.filter).to.eq("test1,test2");
            });
        });
    });

    describe("Generic PinCard", function () {
        // instantiate a class that implements generic pincard
        const ocra = new PluginFactory("", connection).createOcra("123");

        beforeEach(function () {
            mock.onPost("plugins/ocra/123/verify-pin")
                .reply(config => {
                    return [ 200, { success: true, data: JSON.parse(config.data) } ];
                });
        });

        it("makes the correct call to verify pin", () => {
            return ocra.verifyPin({}).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");
                expect(res.data, "PIN property found when not expected").to.not.have.property("pin");
            });
        });

        it("makes the correct call to verify pin with provided pincode", () => {
            return ocra.verifyPin({ pin: "1234" }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");
                expect(res.data, "PIN property not found when expected").to.have.property("pin", "1234");
            });
        });
    });

    describe("Generic CertCard", function () {
        // instantiate a class that implements generic certcard
        const aventra = new PluginFactory("", connection).createAventraNO("123");

        beforeEach(function () {
            // authenticate
            mock.onGet("plugins/aventra/123/authenticate").reply(() => {
                return [ 200, { success: true, data: [ "algo", "refs", "authentication"] }];
            });
            mock.onPost("plugins/aventra/123/authenticate").reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // sign
            mock.onGet("plugins/aventra/123/sign").reply(() => {
                return [ 200, { success: true, data: [ "algo", "refs", "signing"] }];
            });
            mock.onPost("plugins/aventra/123/sign").reply(config => {
                return [ 200, { success: true, data: JSON.parse(config.data) }];
            });

            // certificates
            mock.onGet("plugins/aventra/123/certificates").reply(config => {
                return [ 200, { success: true, data: config.params }];
            });
            mock.onGet("plugins/aventra/123/certificates/root").reply(config => {
                return [ 200, { success: true, data: "mockrootcert" }];
            });
        });

        it("can get algo refs for authentication", () => {
            return aventra.allAlgoRefsForAuthentication().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.an("array").of.length(3).contains("algo").contains("refs").contains("authentication");
            });
        });

        it("can get algo refs for signing", () => {
            return aventra.allAlgoRefsForSigning().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.an("array").of.length(3).contains("algo").contains("refs").contains("signing");
            });
        });

        it("can get all certificates", () => {
            return aventra.allCerts([]).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");
                expect(res.data, "Filter property found when not expected").to.not.have.property("filter");
            });
        });

        it("makes get a filtered subset of the certificates", () => {
            return aventra.allCerts({ filters: [ "cert1", "cert2" ] }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");
                expect(res.data, "Filter property not found when expected").to.have.property("filter");
                expect(res.data.filter, "Incorrect filter parameter").to.eq("cert1,cert2");
            });
        });

        it("can authenticate", () => {
            return aventra.authenticate({ algorithm_reference: "SHA256", data: "inputdata"}).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                let mockData: any = res.data;
                expect(mockData).to.be.a("object");
                expect(mockData, "Algorithm reference not passed to GCL").to.have.property("algorithm_reference");
                expect(mockData.algorithm_reference, "Algorithm reference should be lowercase").to.eq("sha256");
                expect(mockData, "Data not passed to GCL").to.have.property("data");
                expect(mockData.data, "Incorrect data passed to GCL").to.eq("inputdata");
            });
        });

        it("can sign data", () => {
            return aventra.signData({ algorithm_reference: "SHA256", data: "inputdata"}).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                let mockData: any = res.data;
                expect(mockData).to.be.a("object");
                expect(mockData, "Algorithm reference not passed to GCL").to.have.property("algorithm_reference");
                expect(mockData.algorithm_reference, "Algorithm reference should be lowercase").to.eq("sha256");
                expect(mockData, "Data not passed to GCL").to.have.property("data");
                expect(mockData.data, "Incorrect data passed to GCL").to.eq("inputdata");
            });
        });

        it("can retrieve a requested certificate", () => {
            return (aventra as any).getCertificate("/root", { parseCerts: false }).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                let mockData: any = res.data;
                expect(mockData).to.be.a("object");
                expect(mockData, "Base64 certificate not found").to.have.property("base64");
                expect(mockData.base64, "Incorrect cert data returned").to.eq("mockrootcert");
            });
        });
    });

});
