import MockAdapter from 'axios-mock-adapter';
import {GenericConnection, LocalConnection} from '../../../client/Connection';
import axios from 'axios';
import {GCLConfig} from '../../../GCLConfig';
import store = require('store2');

describe('Connection', () => {
    const gclConfig = new GCLConfig({});
    const tokenConfig = new GCLConfig({});
    tokenConfig.tokenCompatible = true;
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const tokenConnection: LocalConnection = new LocalConnection(tokenConfig);
    let mock: MockAdapter;

    beforeEach(() => {
        store(GenericConnection.BROWSER_AUTH_TOKEN, 'ZGRlMjk3YjktNzVkNi00MjhlLWExZDMtM2I0ZDUyMDExMGU5LTAwNWRkYTVk');
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        store.remove(GenericConnection.BROWSER_AUTH_TOKEN);
        mock.restore();
    });

    describe('responding to a generic GET request', function () {
        beforeEach(() => {
            mock.onGet('hello').reply(config => {
                return [ 200, { hello: 'world', headers: config.headers } ];
            });
        });

        test('returns correct body', () => {
            return connection.get('', '/hello', undefined, undefined).then(res => {
                expect(res.hello).toBe('world');
            });
        });

        test('sends the correct headers for regular connections', () => {
            return connection.get('', '/hello', undefined).then(res => {
                expect(res.headers).toBeObject();
                expect(res.headers).not.toHaveProperty(GenericConnection.AUTH_TOKEN_HEADER);
            });
        });

        test('sends the X-Authentication-Token header for compatible connections', () => {
            return tokenConnection.get('', '/hello', undefined).then(res => {
                expect(res.headers).toBeObject();
                expect(res.headers).toHaveProperty(GenericConnection.AUTH_TOKEN_HEADER, 'ZGRlMjk3YjktNzVkNi00MjhlLWExZDMtM2I0ZDUyMDExMGU5LTAwNWRkYTVk');
            });
        });
    });

    describe('responding to a generic POST request', function () {
        beforeEach(function () {
            mock.onPost('hello').reply(config => {
                return [ 200, { data: JSON.parse(config.data), headers: config.headers } ];
            });
        });

        test('correct payload was sent', () => {
            return connection.post('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('payload', 'some string');
            });
        });

        test('sends the correct headers for regular connections', () => {
            return connection.post('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res.headers).toBeObject();
                expect(res.headers).not.toHaveProperty(GenericConnection.AUTH_TOKEN_HEADER);
            });
        });

        test('sends the X-Authentication-Token header for compatible connections', () => {
            return tokenConnection.post('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res.headers).toBeObject();
                expect(res.headers).toHaveProperty(GenericConnection.AUTH_TOKEN_HEADER, 'ZGRlMjk3YjktNzVkNi00MjhlLWExZDMtM2I0ZDUyMDExMGU5LTAwNWRkYTVk');
            });
        });
    });

    describe('responding to a generic PUT request', function () {
        beforeEach(function () {
            mock.onPut('hello').reply(config => {
                return [ 200, { data: JSON.parse(config.data), headers: config.headers } ];
            });
        });

        test('correct payload was sent', () => {
            return connection.put('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res).toHaveProperty('data');
                expect(res.data).toHaveProperty('payload', 'some string');
            });
        });

        test('sends the correct headers for regular connections', () => {
            return connection.put('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res.headers).toBeObject();
                expect(res.headers).not.toHaveProperty(GenericConnection.AUTH_TOKEN_HEADER);
            });
        });

        test('sends the X-Authentication-Token header for compatible connections', () => {
            return tokenConnection.put('', '/hello', { payload: 'some string' }, undefined).then(res => {
                expect(res.headers).toBeObject();
                expect(res.headers).toHaveProperty(GenericConnection.AUTH_TOKEN_HEADER, 'ZGRlMjk3YjktNzVkNi00MjhlLWExZDMtM2I0ZDUyMDExMGU5LTAwNWRkYTVk');
            });
        });
    });
});
