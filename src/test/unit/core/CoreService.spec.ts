import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {LocalAuthConnection, GCLConfig} from '../../..';
import {CoreService} from '../../../scripts/core/service/CoreService';


describe('Core Services', () => {
    let gclConfig = new GCLConfig({});
    const connection: LocalAuthConnection = new LocalAuthConnection(gclConfig);
    let gclConfigModified = new GCLConfig({ consentDuration: 5});
    const connectionModified: LocalAuthConnection = new LocalAuthConnection(gclConfigModified);
    let core = new CoreService('', connection);
    let coreModified = new CoreService('', connectionModified);
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('getConsent', () => {
        beforeEach(function () {
            mock.onPost('/consent').reply((config) => {
                return [ 200, { data: JSON.parse(config.data), success: true }];
            });
        });

        test('makes the correct call to get consent', () => {
            return core.getConsent('test', 'code', 5, 'warning', 'center', 'reader', 20).then(res => {
                const result = res as any;
                expect(result).toHaveProperty('success');
                expect(result.success).toBe(true);

                expect(result).toHaveProperty('data');
                expect(result.data).toBeInstanceOf(Object);

                expect(result.data).toHaveProperty('title');
                expect(result.data.title).toBe('test');

                expect(result.data).toHaveProperty('text');
                expect(result.data.text).toBe('code');

                expect(result.data).toHaveProperty('days');
                expect(result.data.days).toBe(5);

                expect(result.data).toHaveProperty('alert_level');
                expect(result.data.alert_level).toBe('warning');

                expect(result.data).toHaveProperty('alert_position');

                expect(result.data).toHaveProperty('type');
                expect(result.data.type).toBe('reader');

                expect(result.data).toHaveProperty('timeout');
                expect(result.data.timeout).toBe(20);
            });
        });

        test('sets default duration if not provided', () => {
            return core.getConsent('test2', 'code2').then(res => {
                const result = res as any;
                expect(result).toHaveProperty('success');
                expect(result.success).toBe(true);

                expect(result).toHaveProperty('data');
                expect(result.data).toBeInstanceOf(Object);

                expect(result.data).toHaveProperty('title');
                expect(result.data.title).toBe('test2');

                expect(result.data).toHaveProperty('text');
                expect(result.data.text).toBe('code2');

                expect(result.data).toHaveProperty('days');
            });
        });

        test('allows the default duration to be changed via the config file', () => {
            return coreModified.getConsent('test2', 'code2').then(res => {
                const result = res as any;
                expect(result).toHaveProperty('success');
                expect(result.success).toBe(true);

                expect(result).toHaveProperty('data');
                expect(result.data).toBeInstanceOf(Object);

                expect(result.data).toHaveProperty('title');
                expect(result.data.title).toBe('test2');

                expect(result.data).toHaveProperty('text');
                expect(result.data.text).toBe('code2');

                expect(result.data).toHaveProperty('days');
                expect(result.data.days).toBe(5);
            });
        });

        test('rejects the request if no title is provided', () => {
            return core.getConsent(undefined, 'code3', 2).then(() => {
                return Promise.reject(new Error('no title was provided, this should fail!'));
            }, error => {
                expect(error).toHaveProperty('code');
                expect(error.code).toBe('801');

                expect(error).toHaveProperty('status');
                expect(error.status).toBe(400);

                expect(error).toHaveProperty('description');
                expect(error.description).toBe('Title is required!');
            });
        });

        test('rejects the request if no code word is provided', () => {
            return core.getConsent('test4', undefined, 4).then(() => {
                return Promise.reject(new Error('no code word was provided, this should fail!'));
            }, error => {
                expect(error).toHaveProperty('code');
                expect(error.code).toBe('801');

                expect(error).toHaveProperty('status');
                expect(error.status).toBe(400);

                expect(error).toHaveProperty('description');
                expect(error.description).toBe('Code word is required!');
            });
        });
    });

    describe('info', () => {
        beforeEach(function () {
            mock.onGet('/').reply(() => {
                return [ 200, { data: 'Info Data', success: true }];
            });
        });

        test('makes the correct call to get info', () => {
            return core.info().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toBe(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toBe('Info Data');
            });
        });
    });

    describe('reader', () => {
        beforeEach(function () {
            mock.onGet('/card-readers/123').reply(() => {
                return [ 200, { data: 'Reader Data', success: true }];
            });
        });

        test('makes the correct call to get card reader data', () => {
            return core.reader('123').then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toBe(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toBe('Reader Data');
            });
        });
    });

    describe('readers', () => {
        beforeEach(function () {
            mock.onGet('/card-readers').reply((config) => {
                if (config.params && config.params['card-inserted'] === true) {
                    return [ 200, { data: 'Readers Data Card Inserted', success: true }];
                } else if (config.params && config.params['card-inserted'] === false) {
                    return [ 200, { data: 'Readers Data No Card Inserted', success: true }];
                } else {
                    return [ 200, { data: 'Readers Data', success: true }];
                }
            });
        });

        test('makes the correct call to get card reader data', () => {
            return core.readers().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toBe(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toBe('Readers Data');
            });
        });

        test('makes the correct call to get card reader data with card inserted', () => {
            return core.readersCardAvailable().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toBe(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toBe('Readers Data Card Inserted');
            });
        });

        test('makes the correct call to get card reader data without card inserted', () => {
            return core.readersCardsUnavailable().then(res => {
                expect(res).toHaveProperty('success');
                expect(res.success).toBe(true);

                expect(res).toHaveProperty('data');
                expect(res.data).toBe('Readers Data No Card Inserted');
            });
        });
    });
});
