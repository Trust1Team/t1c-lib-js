"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AgentClient = (function () {
    function AgentClient(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    AgentClient.urlPrefix = function (port) {
        return AgentClient.AGENT_PATH + '/' + port;
    };
    AgentClient.prototype.get = function (username, callback) {
        var body = { AGENT_MATCH_PARAM: username };
        return this.connection.postSkipCitrix(this.url, AgentClient.AGENT_PATH, undefined, body, undefined, callback);
    };
    AgentClient.AGENT_PATH = '/agent';
    AgentClient.AGENT_MATCH_PARAM = 'username';
    return AgentClient;
}());
exports.AgentClient = AgentClient;
//# sourceMappingURL=agent.js.map