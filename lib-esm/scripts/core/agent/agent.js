export class AgentClient {
    constructor(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    static urlPrefix(port) {
        return AgentClient.AGENT_PATH + '/' + port;
    }
    get(username, callback) {
        let body = { AGENT_MATCH_PARAM: username };
        return this.connection.postSkipCitrix(this.url, AgentClient.AGENT_PATH, undefined, body, undefined, callback);
    }
}
AgentClient.AGENT_PATH = '/agent';
AgentClient.AGENT_MATCH_PARAM = 'username';
//# sourceMappingURL=agent.js.map