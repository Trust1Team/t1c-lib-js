"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivatedContainerUtil_1 = require("../util/ActivatedContainerUtil");
var GenericContainer = (function () {
    function GenericContainer(baseUrl, containerUrl, connection, containerPrefix) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.containerPrefix = containerPrefix;
        this.CONTAINER_NEW_CONTEXT_PATH = '/containers/';
    }
    GenericContainer.prototype.containerSuffix = function (path) {
        var containername = ActivatedContainerUtil_1.ActivatedContainerUtil.getContainerFor(this.connection.cfg, this.containerPrefix);
        this.containerUrl = this.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) {
            return this.containerUrl + path;
        }
        else {
            return this.containerUrl;
        }
    };
    return GenericContainer;
}());
exports.GenericContainer = GenericContainer;
//# sourceMappingURL=GenericContainer.js.map