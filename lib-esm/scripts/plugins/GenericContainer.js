import { ActivatedContainerUtil } from '../util/ActivatedContainerUtil';
export class GenericContainer {
    constructor(baseUrl, containerUrl, connection, containerPrefix) {
        this.baseUrl = baseUrl;
        this.containerUrl = containerUrl;
        this.connection = connection;
        this.containerPrefix = containerPrefix;
        this.CONTAINER_NEW_CONTEXT_PATH = '/containers/';
    }
    containerSuffix(path) {
        const containername = ActivatedContainerUtil.getContainerFor(this.connection.cfg, this.containerPrefix);
        this.containerUrl = this.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) {
            return this.containerUrl + path;
        }
        else {
            return this.containerUrl;
        }
    }
}
//# sourceMappingURL=GenericContainer.js.map