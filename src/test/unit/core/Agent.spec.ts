/**
 * @author Maarten Somers
 * @since 2017
 */
import { expect } from 'chai';
import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';
import { AgentClient } from '../../../scripts/core/agent/agent';
import { GCLConfig } from '../../../scripts/core/GCLConfig';
import {LocalAuthConnection} from "../../../scripts/core/client/Connection";

describe('Agents', () => {
    const gclConfig = new GCLConfig({});
    const connection: LocalAuthConnection = new LocalAuthConnection(gclConfig);
    const agent = new AgentClient('', connection);

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });


    describe('Url Prefixer', () => {
        it('returns the expected url for a given agent port', () => {
            let url: string = AgentClient.urlPrefix(1234);
            expect(url).to.be.eq('/agent/1234');
        });
    });

/*    describe('Agent filtering', () => {
        beforeEach(() => {
            mock.onGet('/agent').reply(config => {
                return [ 200, { success: true, data: config.params }];
            });
        });

        it('makes a generic call if no filters are provided', () => {
            return agent.get(undefined).then(res => {
                expect(res.success).to.be.a('boolean').eq(true);
                expect(res.data).to.be.undefined;
            });
        });

        it('makes a filtered call if filters are present', () => {
            return agent.get('test' ).then(res => {
                expect(res.success).to.be.a('boolean').eq(true);
                expect(res.data).to.be.an('object');
                expect(res.data).to.be.have.property('username').eq('test');
            });
        });

        it('correctly handler multiple filter properties', () => {
            return agent.get('test').then(res => {
                expect(res.success).to.be.a('boolean').eq(true);
                expect(res.data).to.be.an('object');
                expect(res.data).to.be.have.property('username').eq('test');
                expect(res.data).to.be.have.property('customFilter').eq('some id');
            });
        });
    });*/
});
