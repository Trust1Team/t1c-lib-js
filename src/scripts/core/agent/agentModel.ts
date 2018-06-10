/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';
import { T1CResponse } from '../service/CoreModel';

export { AbstractAgent, AgentResponse, Agent };


interface AbstractAgent {
    get(filters?: { [filterParam: string]: string },
        callback?: (error: CoreExceptions.RestException, data: AgentResponse) => void): Promise<AgentResponse>;
}

interface AgentResponse extends T1CResponse {
    data: Agent[]
}

class Agent {
    constructor(public hostname: string, public port: number, public last_update: string) {}
}

