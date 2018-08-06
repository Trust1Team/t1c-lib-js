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
        var body = { 'username': username };
        return this.connection.postSkipCitrix(this.url, AgentClient.AGENT_PATH, undefined, body, undefined, callback);
    };
    AgentClient.AGENT_PATH = '/agent';
    return AgentClient;
}());
exports.AgentClient = AgentClient;
//# sourceMappingURL=agent.js.map