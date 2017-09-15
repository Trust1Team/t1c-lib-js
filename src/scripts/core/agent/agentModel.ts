/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";
import { T1CResponse } from "../service/CoreModel";

export { AbstractAgent, AgentResponse };


interface AbstractAgent {
    get(filters?: { [filterParam: string]: string },
        callback?: (error: CoreExceptions.RestException, data: AgentResponse) => void): void | Promise<AgentResponse>;
}

interface AgentResponse extends T1CResponse {
    data: Agent[]
}

interface Agent {
    port: number,
    hostname: string
    last_update: string
}