/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";
import { T1CResponse } from "../service/CoreModel";
import {RestException} from "../exceptions/CoreExceptions";

export { AbstractAgent, AgentResponse, Agent, ResolvedAgent };


interface AbstractAgent {
    get(filters?: { [filterParam: string]: string },
        callback?: (error: CoreExceptions.RestException, data: AgentResponse) => void): Promise<AgentResponse>;
    resolve(challenge: string,callback?: (error: RestException, data: ResolvedAgent) => void): Promise<any>;
}

interface AgentResponse extends T1CResponse {
    data: Agent[]
}

class Agent {
    constructor(public hostname: string, public port: number, public last_update: string) {}
}

class ResolvedAgent {
    constructor(public hostname?: string, public challenge?: string, public last_update?: string, public metadata?: any, public port?: number, public type?: string, public username?: string) {}
}
