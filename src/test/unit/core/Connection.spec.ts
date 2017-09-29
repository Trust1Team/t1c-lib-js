/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import { GCLConfig } from '../../../scripts/core/GCLConfig';
import { GenericConnection, LocalConnection } from '../../../scripts/core/client/Connection';
import * as ls from 'local-storage';

describe('Connection', () => {
    const gclConfig = new GCLConfig();
    const connection: LocalConnection = new LocalConnection(gclConfig);
    let mock: MockAdapter;

    beforeEach(() => {
        ls.set(GenericConnection.BROWSER_AUTH_TOKEN, 'test-id');
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        ls.remove(GenericConnection.BROWSER_AUTH_TOKEN);
        mock.restore();
    });

    describe('responding to a generic GET request', function () {
        beforeEach(() => {
            mock.onGet('hello').reply(config => {
                return [ 200, { hello: 'world', headers: config.headers } ];
            });
        });

        it('returns correct body', () => {
            return connection.get('', '/hello', undefined, undefined).then(res => {
                expect(res.hello).to.be.eq('world');
            });
        });

        it('sends the correct headers', () => {
            return connection.get('', '/hello', undefined).then(res => {
                expect(res.headers).to.be.an('object');
                expect(res.headers).to.have.property(GenericConnection.AUTH_TOKEN_HEADER).eq('test-id');
            });
        });
    });

    describe('responding to a generic POST request', function () {
        beforeEach(function () {
            mock.onPost('hello').reply(config => {
                return [ 200, { data: JSON.parse(config.data), headers: config.headers } ];
            });
        });

        it('correct payload was sent', () => {
            return connection.post('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res).to.have.property('data');
                expect(res.data).to.have.property('payload').with.lengthOf(11).eq('some string');
            });
        });

        it('sends the correct headers', () => {
            return connection.post('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res.headers).to.be.an('object');
                expect(res.headers).to.have.property(GenericConnection.AUTH_TOKEN_HEADER).eq('test-id');
            });
        });
    });

    describe('responding to a generic PUT request', function () {
        beforeEach(function () {
            mock.onPut('hello').reply(config => {
                return [ 200, { data: JSON.parse(config.data), headers: config.headers } ];
            });
        });

        it('correct payload was sent', () => {
            return connection.put('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res).to.have.property('data');
                expect(res.data).to.have.property('payload').with.lengthOf(11).eq('some string');
            });
        });

        it('sends the correct headers', () => {
            return connection.put('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res.headers).to.be.an('object');
                expect(res.headers).to.have.property(GenericConnection.AUTH_TOKEN_HEADER).eq('test-id');
            });
        });
    });
});
