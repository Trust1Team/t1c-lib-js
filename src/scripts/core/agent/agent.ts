/**
 * @author Maarten Somers
 */
import { RestException } from '../exceptions/CoreExceptions';
import { AbstractAgent, AgentResponse } from './agentModel';
import { LocalAuthConnection } from '../client/Connection';


export { AgentClient };

/**
 * Provides access to the /agent endpoint and a URL prefixing utility method
 */
class AgentClient implements AbstractAgent {
    static AGENT_PATH = '/agent';
    static AGENT_RESOLVE_PATH = '/resolve';

    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {}

    public static urlPrefix(port: number) {
        return AgentClient.AGENT_PATH + '/' + port;
    }

    public get(filters?: { [filterParam: string]: string }, callback?: (error: RestException, data: AgentResponse) => void): Promise<any> {
        return this.connection.getSkipCitrix(this.url, AgentClient.AGENT_PATH, filters, undefined, callback);
    }

    public resolve (challenge: string, callback?: (error: RestException, data: AgentResponse) => void): Promise<any> {
        return this.connection.post(this.url, AgentClient.AGENT_PATH + AgentClient.AGENT_RESOLVE_PATH, { challenge }, [], undefined, callback);
    }

}
