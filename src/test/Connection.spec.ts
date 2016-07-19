/**
 * @author Maarten Casteels
 * @since 2016
 */
import {expect} from "chai";
import * as Sinon from "sinon";
import {Promise} from "es6-promise";
import {connection} from "../scripts/Plugins/Connection";

describe('Connection', () => {
/*    var server:Sinon.SinonFakeServer;

    beforeEach(() => {
        server = Sinon.fakeServer.create();
    });

    afterEach(() => {
        server.restore();
    });

    describe('responding to a generic request', function () {
        beforeEach(function () {
            var okResponse = [
                200,
                {'Content-type': 'application/json'},
                '{"hello":"world"}'
            ];

            server.respondWith('GET', '/hello', okResponse);
        });

        it('returns correct body', function (done) {
            var p:Promise<any> = connection.get('/hello');
            p.then(
                (result) => {
                    expect(result.hello).to.be.eq("world");
                    //sinon.assertCalledWith('');
                    done();
                }
            );
            server.respond();
        });
    });*/
});