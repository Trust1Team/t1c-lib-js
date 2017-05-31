/**
 * @author Maarten Somers
 */


import { AgentClient } from "../agent/agent";
export { UrlUtil };

class UrlUtil {

    // constructor
    constructor() {
        // no-op
    }

    public static create(base: string, suffix: string, agentPort?: number) {
        if (agentPort) { return base + AgentClient.urlPrefix(agentPort) + suffix; }
        else { return base + suffix; }
    }
}
