
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {LocalAuthConnection, GCLConfig} from '../../..';
import {CoreService} from '../../../scripts/core/service/CoreService';



const gclConfig = new GCLConfig({gclUrl: 'https://localhost:10443/v1'});
const gclUnderTest = 'https://localhost:10443/v1';
const localAuthConnection: LocalAuthConnection = new LocalAuthConnection(gclConfig);
const core: CoreService = new CoreService(gclUnderTest, localAuthConnection);

let mock: MockAdapter;

beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('/v1/card-readers').reply(200, {
        success: true,
        data: [
            {id: '12', card: {atr: '111', description: ['Mocked Unknown Card']}, name: 'Mocked Reader', pinpad: false},
            {id: '34', card: {atr: '222', description: ['Bla']}, name: 'Mocked Reader', pinpad: false}
        ]
    });
});

afterEach(() => {
    mock.restore();
});


test('containerForReader', () => {
});

test('dumpData', () => {
});

test('authenticateCapable', () => {
});

test('signCapable', () => {
});

test('verifyPinCapable', () => {
});

test('authenticate', () => {
});

test('sign', () => {
});

test('verifyPin', () => {
});

