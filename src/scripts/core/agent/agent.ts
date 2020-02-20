import {T1CLibException} from '../exceptions/CoreExceptions';
import {AbstractAgent, AgentResponse} from './agentModel';
import {LocalAuthConnection, RequestBody} from '../client/Connection';

/**
 * Provides access to the /agent endpoint and a URL prefixing utility method
 */
export class AgentClient implements AbstractAgent {
    static AGENT_PATH = '/agent';

    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {
    }

    public static urlPrefix(port: number) {
        return AgentClient.AGENT_PATH + '/' + port;
    }

    public get(username: string, callback?: (error: T1CLibException, data: AgentResponse) => void): Promise<any> {
        let body: RequestBody = { 'username' :  username};
        return this.connection.postSkipCitrix(this.url, AgentClient.AGENT_PATH, undefined, body, undefined, callback);
    }

}
