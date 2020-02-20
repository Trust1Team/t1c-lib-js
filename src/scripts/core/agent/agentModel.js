"use strict";
/**
 * @author Maarten Somers
 * @since 2017
 */
exports.__esModule = true;
var Agent = /** @class */ (function () {
    function Agent(hostname, port, last_update) {
        this.hostname = hostname;
        this.port = port;
        this.last_update = last_update;
    }
    return Agent;
}());
exports.Agent = Agent;
