import { RestException } from '../exceptions/CoreExceptions';
import { AbstractAgent, AgentResponse } from './agentModel';
import { LocalAuthConnection } from '../client/Connection';
export { AgentClient };
declare class AgentClient implements AbstractAgent {
    private url;
    private connection;
    static AGENT_PATH: string;
    constructor(url: string, connection: LocalAuthConnection);
    static urlPrefix(port: number): string;
    get(filters?: {
        [filterParam: string]: string;
    }, callback?: (error: RestException, data: AgentResponse) => void): Promise<any>;
}
