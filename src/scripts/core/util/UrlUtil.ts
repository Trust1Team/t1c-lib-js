/**
 * @author Maarten Somers
 */


import { AgentClient } from "../agent/agent";
import * as _ from "lodash";
export { UrlUtil };

class UrlUtil {

    // constructor
    constructor() {
        // no-op
    }

    public static create(base: string, suffix: string, agentPort?: number) {
        if (agentPort) {
            // let components = _.split(base, "/v1");
            // let agentString = AgentClient.urlPrefix(agentPort);
            // let url = _.join(components, "/v1" + agentString) + suffix;
            // return url;
            return _.join(_.split(base, "/v1"), "/v1" + AgentClient.urlPrefix(agentPort)) + suffix;
        } else {
            return base + suffix;
        }
    }
}
