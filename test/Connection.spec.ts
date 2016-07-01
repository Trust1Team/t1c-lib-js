/**
 * @author Maarten Casteels
 * @since 2016
 */
import { Config, Connection } from '../src/Trust1Team';
import { expect } from 'chai';
import * as sinon from  'sinon';
import { Promise } from 'es6-promise';

describe('Connection', () => {
    let connection:Connection;
    var server:Sinon.SinonFakeServer;

    beforeEach(() => {
        connection = new Connection(new Config());
        server = sinon.fakeServer.create();
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
                    console.log(result);
                    //expect(result).to.be.eq();
                    done();
                }
            );
            server.respond();
            //server.done();
        });
    });
});