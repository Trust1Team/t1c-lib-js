import { T1CLibException } from '../exceptions/CoreExceptions';
import { AbstractAgent, AgentResponse } from './agentModel';
import { LocalAuthConnection } from '../client/Connection';
export declare class AgentClient implements AbstractAgent {
    private url;
    private connection;
    static AGENT_PATH: string;
    constructor(url: string, connection: LocalAuthConnection);
    static urlPrefix(port: number): string;
    get(username: string, callback?: (error: T1CLibException, data: AgentResponse) => void): Promise<any>;
}
