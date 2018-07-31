import { T1CResponse } from '../service/CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export interface AbstractAgent {
    get(username?: string, callback?: (error: T1CLibException, data: AgentResponse) => void): Promise<AgentResponse>;
}
export interface AgentResponse extends T1CResponse {
    data: Agent[];
}
export declare class Agent {
    hostname: string;
    port: number;
    last_update: string;
    constructor(hostname: string, port: number, last_update: string);
}
