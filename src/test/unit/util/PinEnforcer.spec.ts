/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from "chai";
import * as axios from "axios";
import * as MockAdapter from "axios-mock-adapter";
import { GCLConfig } from "../../../scripts/core/GCLConfig";
import { LocalConnection } from "../../../scripts/core/client/Connection";
import { PinEnforcer } from "../../../scripts/util/PinEnforcer";


describe("PinEnforcer Utility", () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const enforcingConfig = new GCLConfig();
    enforcingConfig.forceHardwarePinpad = true;
    const enforcingConnection = new LocalConnection(enforcingConfig);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe("Configuration", function () {
        beforeEach(function () {
            mock.onGet("/card-readers/123")
                .reply(config => {
                    return [ 200, { success: true, data: { pinpad: true } }];
                });
        });

        it("will not intervene if the config does not enable checking", () => {
            return PinEnforcer.check(connection, "", "123", "1234");
        });

        it("will intervene if pin checking is enabled in the config", () => {
            return PinEnforcer.check(enforcingConnection, "", "123", "1234").catch(err => {
                expect(err).to.be.an("object");
                expect(err).to.have.property("data");
                expect(err.data).to.have.property("message");
                expect(err.data.message).to.be.a("string").eq("Strict pinpad enforcement is enabled. This request was sent with a PIN," +
                                                              " but the reader has a pinpad.");
            });
        });
    });

    describe("Pin Enforcement", () => {
        beforeEach(function () {
            mock.onGet("/card-readers/123")
                .reply(config => {
                    return [ 200, { success: true, data: { pinpad: true } }];
                });
            mock.onGet("/card-readers/321")
                .reply(config => {
                    return [ 200, { success: true, data: { pinpad: false } }];
                });
        });

        it("will reject a request that needs a pin", () => {
            return PinEnforcer.check(enforcingConnection, "", "321", undefined).then(() => {
                expect.fail(0, 1, "PinEnforcer should block execution of this call");
            }, err => {
                expect(err).to.be.an("object");
                expect(err).to.have.property("data");
                expect(err.data).to.have.property("message");
                expect(err.data.message).to.be.a("string").eq("Strict pinpad enforcement is enabled. This request was sent without a PIN," +
                                                              " but the reader does not have a pinpad.");
            });
        });

        it("will reject a request that has pin but should not have one", () => {
            return PinEnforcer.check(enforcingConnection, "", "123", "1234").then(() => {
                expect.fail(0, 1, "PinEnforcer should block execution of this call");
            }, err => {
                expect(err).to.be.an("object");
                expect(err).to.have.property("data");
                expect(err.data).to.have.property("message");
                expect(err.data.message).to.be.a("string").eq("Strict pinpad enforcement is enabled. This request was sent with a PIN," +
                                                              " but the reader has a pinpad.");
            });
        });
    });
});
