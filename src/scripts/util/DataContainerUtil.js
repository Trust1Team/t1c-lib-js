"use strict";
/**
 * @author Maarten Somers
 * @since 2018
 */
exports.__esModule = true;
var ClientService_1 = require("./ClientService");
var DataContainerUtil = /** @class */ (function () {
    // constructor
    function DataContainerUtil() {
    }
    // TODO switch to DSContainer[]
    DataContainerUtil.setupDataContainers = function (containers) {
        // go through list and find data containers
        // for each container found, spin up data container handler and attach to client
        var client = ClientService_1.ClientService.getClient();
        containers.forEach(function (ct) {
            // detect data containers
            if (ct.type === 'data') {
                // make sure the path starts with a slash
                ct.path = '/' + ct.name;
                client[ct.name] = client.pf().createDataContainer(ct.path);
            }
        });
    };
    return DataContainerUtil;
}());
exports.DataContainerUtil = DataContainerUtil;
