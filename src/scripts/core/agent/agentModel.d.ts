import * as CoreExceptions from "../exceptions/CoreExceptions";
import { T1CResponse } from "../service/CoreModel";
export { AbstractAgent, AgentResponse, Agent };
interface AbstractAgent {
    get(filters?: {
        [filterParam: string]: string;
    }, callback?: (error: CoreExceptions.RestException, data: AgentResponse) => void): Promise<AgentResponse>;
}
interface AgentResponse extends T1CResponse {
    data: Agent[];
}
declare class Agent {
    hostname: string;
    port: number;
    last_update: string;
    constructor(hostname: string, port: number, last_update: string);
}
