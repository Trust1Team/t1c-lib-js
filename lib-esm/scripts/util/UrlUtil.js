import { AgentClient } from '../core/agent/agent';
export { UrlUtil };
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.create = function (base, suffix, config, skipCitrixCheck) {
        if (config.citrix && config.agentPort != null && !skipCitrixCheck) {
            return base + AgentClient.urlPrefix(config.agentPort) + suffix;
        }
        else {
            return base + suffix;
        }
    };
    return UrlUtil;
}());
//# sourceMappingURL=UrlUtil.js.map