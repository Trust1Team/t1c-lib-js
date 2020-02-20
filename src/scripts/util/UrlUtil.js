"use strict";
exports.__esModule = true;
var agent_1 = require("../core/agent/agent");
var UrlUtil = /** @class */ (function () {
    // constructor
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
