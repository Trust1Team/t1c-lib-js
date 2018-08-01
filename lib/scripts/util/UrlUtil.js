"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("../core/agent/agent");
class UrlUtil {
    constructor() { }
    static create(base, suffix, config, skipCitrixCheck) {
        if (config.citrix && config.agentPort != null && !skipCitrixCheck) {
            return base + agent_1.AgentClient.urlPrefix(config.agentPort) + suffix;
        }
        else {
            return base + suffix;
        }
    }
}
exports.UrlUtil = UrlUtil;
//# sourceMappingURL=UrlUtil.js.map