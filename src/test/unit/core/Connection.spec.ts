/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from "chai";
import * as axios from "axios";
import * as MockAdapter from "axios-mock-adapter";
import { GCLConfig } from "../../../scripts/core/GCLConfig";
import { LocalConnection } from "../../../scripts/core/client/Connection";

describe("Connection", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("responding to a generic GET request", function () {
        beforeEach(function () {
            mock.onGet("hello").reply(200, { hello: "world" });
        });

        it("returns correct body", () => {
            return connection.get("", "/hello", undefined, undefined).then(res => {
                expect(res.hello).to.be.eq("world");
            });
        });
    });

    describe("responding to a generic POST request", function () {
        beforeEach(function () {
            mock.onPost("hello").reply(config => {
                return [ 200, config.data ];
            });
        });

        it("correct payload was sent", () => {
            return connection.post("", "/hello", { payload: "some string" }, undefined).then(res => {
                expect(res).to.have.property("payload").with.lengthOf(11);
            });
        });
    });

    describe("responding to a generic PUT request", function () {
        beforeEach(function () {
            mock.onPut("hello").reply(config => {
                return [ 200, config.data ];
            });
        });

        it("correct payload was sent", () => {
            return connection.put("", "/hello", { payload: "some string" }, undefined).then(res => {
                expect(res).to.have.property("payload").with.lengthOf(11);
            });
        });
    });
});
