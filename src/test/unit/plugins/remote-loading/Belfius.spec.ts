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
import { Promise } from "es6-promise";

describe("Belfius Container", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const belfius = new PluginFactory("", connection).createBelfius("123");
    const nonBelfiusReader = new PluginFactory("", connection).createBelfius("321");

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("can open a session", function () {
        beforeEach(function () {
            mock.onPost("plugins/readerapi/123/open-session", { timeout: 5 }).reply(() => {
                return [ 200, { data: "87d2ee2d-6f2e-4de4-a077-a57e8b8d42c3", success: true }];
            });
            mock.onPost("plugins/readerapi/123/open-session", { timeout: 22 }).reply(() => {
                return [ 200, { data: "7f6f5de4-3bb1-4a77-9b30-274196bdf15e", success: true }];
            });
        });

        it("opens a session with default timeout", () => {
            return belfius.openSession().then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("87d2ee2d-6f2e-4de4-a077-a57e8b8d42c3");
            });
        });

        it("opens a session with a specified timeout", () => {
            return belfius.openSession(22).then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("string");
                expect(res.data).to.eq("7f6f5de4-3bb1-4a77-9b30-274196bdf15e");
            });
        });
    });

    describe("can check if a reader is a Belfius reader", function () {
        beforeEach(function () {
            mock.onGet("card-readers/123").reply(() => {
                return [ 200, { success: true, data: { name: "VASCO DIGIPASS 870"} }];
            });
            mock.onGet("card-readers/321").reply(() => {
                return [ 200, { success: true, data: { name: "Some Other Reader"} }];
            });
            mock.onPost("plugins/readerapi/123/apdu", { cla: "F1", ins: "95", p1: "F7", p2: "E4", data: "FE0000040001300000" })
                .reply(config => {
                    if (config.params && config.params["session-id"] && config.params["session-id"] === "123") {
                        return [ 200, { success: true, data: {
                            rx:	"FE0000040067B4AD49",
                            sw:	"9000",
                            tx:	"F195F7E409FE0000040001300000"}
                        }];
                    } else { return [ 200, { success: false, data: "Incorrect session-id received" } ]; }
                });
        });

        it("checks if a sessionId was provided (Belfius Reader)", () => {
            const sessionId: string = undefined as any;
            return belfius.isBelfiusReader(sessionId).then(() => {
                return Promise.reject(new Error("no sessionId was provided, this should fail!"));
            }, error => {
                expect(error).to.have.property("code");
                expect(error.code).to.be.a("string");
                expect(error.code).to.eq("402");

                expect(error).to.have.property("status");
                expect(error.status).to.be.a("number");
                expect(error.status).to.eq(400);

                expect(error).to.have.property("description");
                expect(error.description).to.be.a("string");
                expect(error.description).to.eq("Session ID is required!");
            });
        });

        it("checks if a sessionId was provided (Non-Belfius Reader)", () => {
            const sessionId: string = undefined as any;
            return nonBelfiusReader.isBelfiusReader(sessionId).then(() => {
                return Promise.reject(new Error("no sessionId was provided, this should fail!"));
            }, error => {
                expect(error).to.have.property("code");
                expect(error.code).to.be.a("string");
                expect(error.code).to.eq("402");

                expect(error).to.have.property("status");
                expect(error.status).to.be.a("number");
                expect(error.status).to.eq(400);

                expect(error).to.have.property("description");
                expect(error.description).to.be.a("string");
                expect(error.description).to.eq("Session ID is required!");
            });
        });

        it("correctly identifies a Belfius reader", () => {
            return belfius.isBelfiusReader("123").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data, "Belfius reader not recognized").to.be.a("boolean").eq(true);
            });
        });

        it("correctly identifies a non-Belfius reader", () => {
            return nonBelfiusReader.isBelfiusReader("123").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data, "Non-Belfius reader incorrectly identified!").to.be.a("boolean").eq(false);
            });
        });
    });

    describe("can retrieve a nonce", function () {
        beforeEach(function () {
            mock.onGet("card-readers/123").reply(() => {
                return [ 200, { success: true, data: { name: "VASCO DIGIPASS 870"} }];
            });
            mock.onPost("plugins/readerapi/123/apdu", { cla: "F1", ins: "95", p1: "F7", p2: "E4", data: "FE0000040001300000" })
                .reply(config => {
                    if (config.params && config.params["session-id"] && config.params["session-id"] === "123") {
                        return [ 200, { success: true, data: {
                            rx:	"FE0000040067B4AD49",
                            sw:	"9000",
                            tx:	"F195F7E409FE0000040001300000"}
                        }];
                    } else { return [ 200, { success: false, data: "Incorrect session-id received" } ]; }
                });
        });

        it("checks if a sessionId was provided", () => {
            const sessionId: string = undefined as any;
            return belfius.nonce(sessionId).then(() => {
                return Promise.reject(new Error("no sessionId was provided, this should fail!"));
            }, error => {
                expect(error).to.have.property("code");
                expect(error.code).to.be.a("string");
                expect(error.code).to.eq("402");

                expect(error).to.have.property("status");
                expect(error.status).to.be.a("number");
                expect(error.status).to.eq(400);

                expect(error).to.have.property("description");
                expect(error.description).to.be.a("string");
                expect(error.description).to.eq("Session ID is required!");
            });
        });

        it("retrieves a nonce for a session", () => {
            return belfius.nonce("123").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");

                expect(res.data).to.have.property("tx");
                expect(res.data.tx).to.be.a("string");
                expect(res.data.tx).to.eq("F195F7E409FE0000040001300000");

                expect(res.data).to.have.property("sw");
                expect(res.data.sw).to.be.a("string");
                expect(res.data.sw).to.eq("9000");

                expect(res.data).to.have.property("rx");
                expect(res.data.rx).to.be.a("string");
                expect(res.data.rx).to.eq("FE0000040067B4AD49");
            });
        });
    });

    describe("can send an STX command", function () {
        beforeEach(function () {
            mock.onGet("card-readers/123").reply(() => {
                return [ 200, { success: true, data: { name: "VASCO DIGIPASS 870"} }];
            });
            mock.onPost("plugins/readerapi/123/apdu", { cla: "F1", ins: "95", p1: "F7", p2: "E4", data: "FE0000040001300000" })
                .reply(config => {
                    if (config.params && config.params["session-id"] && config.params["session-id"] === "123") {
                        return [ 200, { success: true, data: {
                            rx:	"FE0000040067B4AD49",
                            sw:	"9000",
                            tx:	"F195F7E409FE0000040001300000"}
                        }];
                    } else { return [ 200, { success: false, data: "Incorrect session-id received" } ]; }
                });
        });

        it("checks if a sessionId was provided", () => {
            const sessionId: string = undefined as any;
            return belfius.stx("FE0000040001300000", sessionId).then(() => {
                return Promise.reject(new Error("no sessionId was provided, this should fail!"));
            }, error => {
                expect(error).to.have.property("code");
                expect(error.code).to.be.a("string");
                expect(error.code).to.eq("402");

                expect(error).to.have.property("status");
                expect(error.status).to.be.a("number");
                expect(error.status).to.eq(400);

                expect(error).to.have.property("description");
                expect(error.description).to.be.a("string");
                expect(error.description).to.eq("Session ID is required!");
            });
        });

        it("executes an STX command for a session", () => {
            return belfius.stx("FE0000040001300000", "123").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);

                expect(res).to.have.property("data");
                expect(res.data).to.be.a("object");

                expect(res.data).to.have.property("tx");
                expect(res.data.tx).to.be.a("string");
                expect(res.data.tx).to.eq("F195F7E409FE0000040001300000");

                expect(res.data).to.have.property("sw");
                expect(res.data.sw).to.be.a("string");
                expect(res.data.sw).to.eq("9000");

                expect(res.data).to.have.property("rx");
                expect(res.data.rx).to.be.a("string");
                expect(res.data.rx).to.eq("FE0000040067B4AD49");
            });
        });
    });

    describe("can close a session", function () {
        beforeEach(function () {
            mock.onGet("plugins/readerapi/123/close-session").reply(() => {
                return [ 200, { success: true }];
            });
        });

        it("closes the session", () => {
            return belfius.closeSession("123").then(res => {
                expect(res).to.have.property("success");
                expect(res.success).to.be.a("boolean");
                expect(res.success).to.eq(true);
            });
        });
    });
});
