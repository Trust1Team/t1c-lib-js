/**
 * @author Michallis Pashidis
 * @since 2018
 */
import {expect} from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import {GCLConfig} from '../../../../scripts/core/GCLConfig';
import {LocalConnection} from '../../../../scripts/core/client/Connection';
import {PluginFactory} from '../../../../scripts/plugins/PluginFactory';

describe('File Exchange', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalConnection = new LocalConnection(gclConfig);
    const filex = new PluginFactory('', connection).createFileExchange();
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });
    describe('can create a new Type for an Entity', function () {
        it('opens a session with default timeout', () => {
            filex.createType('testent', 'testtype').then(res => {
                console.log('result:' + res.success);
               expect(res).to.have.property('success');
            });
        });
    });
});