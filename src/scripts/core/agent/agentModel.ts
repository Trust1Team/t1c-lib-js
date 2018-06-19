/**
 * @author Maarten Somers
 * @since 2017
 */

import { T1CResponse } from '../service/CoreModel';
import {RestException} from '../exceptions/CoreExceptions';


export interface AbstractAgent {
    get(filters?: { [filterParam: string]: string },
        callback?: (error: RestException, data: AgentResponse) => void): Promise<AgentResponse>;
}

export interface AgentResponse extends T1CResponse {
    data: Agent[]
}

export class Agent {
    constructor(public hostname: string, public port: number, public last_update: string) {}
}

