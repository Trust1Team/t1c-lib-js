/**
 * @author Michallis Pashidis
 * @since 2018
 */
import {expect} from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
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
        it('create a new type and verifies response', () => {
            filex.createType('testent', 'testtype').then(res => {
                console.log('result:' + res);
                expect(res).to.have.property('success');
                expect(res).to.have.property('data');
                expect(res.data).to.have.property('entity');
                expect(res.data.entity).to.be.a('string');
                expect(res.data.entity).to.eq('testent');
            });
        });
    });
});