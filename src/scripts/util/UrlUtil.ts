/**
 * @author Maarten Somers
 */
import { GCLConfig } from "../core/GCLConfig";
import { AgentClient } from "../core/agent/agent";

export { UrlUtil };

class UrlUtil {
    // constructor
    constructor() {}

    public static create(base: string, suffix: string, config: GCLConfig) {
        if (config.citrix) {
            return base + AgentClient.urlPrefix(config.agentPort) + suffix;
        } else {
            return base + suffix;
        }
    }
}
