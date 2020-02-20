"use strict";
exports.__esModule = true;
var ActivatedContainerUtil_1 = require("../util/ActivatedContainerUtil");
var GenericContainer = /** @class */ (function () {
    function GenericContainer(baseUrl, containerUrl, connection, containerPrefix, runInUserSpace) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.containerPrefix = containerPrefix;
        this.runInUserSpace = runInUserSpace;
        this.CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE = '/agent/0/containers/';
        this.CONTAINER_NEW_CONTEXT_PATH = '/containers/';
    }
    // resolves the reader_id in the base URL
    GenericContainer.prototype.containerSuffix = function (path) {
        // fetch the latest containerversion and create a containerUrl
        var containername = ActivatedContainerUtil_1.ActivatedContainerUtil.getContainerFor(this.connection.cfg, this.containerPrefix);
        this.containerUrl = this.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) {
            if (this.runInUserSpace) {
                return this.CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE + containername + path;
            }
            return this.containerUrl + path;
        }
        else {
            if (this.runInUserSpace) {
                return this.CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE + containername;
            }
            return this.containerUrl;
        }
    };
    return GenericContainer;
}());
exports.GenericContainer = GenericContainer;
