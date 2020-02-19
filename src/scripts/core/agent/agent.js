"use strict";
exports.__esModule = true;
/**
 * Provides access to the /agent endpoint and a URL prefixing utility method
 */
var AgentClient = /** @class */ (function () {
    // constructor
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
