"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agent_1 = require("../core/agent/agent");
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.create = function (base, suffix, config, skipCitrixCheck) {
        if (config.citrix && config.agentPort != null && !skipCitrixCheck) {
            return base + agent_1.AgentClient.urlPrefix(config.agentPort) + suffix;
        }
        else {
            return base + suffix;
        }
    };
    return UrlUtil;
}());
exports.UrlUtil = UrlUtil;
//# sourceMappingURL=UrlUtil.js.map