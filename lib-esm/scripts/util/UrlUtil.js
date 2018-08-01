import { AgentClient } from '../core/agent/agent';
export { UrlUtil };
class UrlUtil {
    constructor() { }
    static create(base, suffix, config, skipCitrixCheck) {
        if (config.citrix && config.agentPort != null && !skipCitrixCheck) {
            return base + AgentClient.urlPrefix(config.agentPort) + suffix;
        }
        else {
            return base + suffix;
        }
    }
}
//# sourceMappingURL=UrlUtil.js.map