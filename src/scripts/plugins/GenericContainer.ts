import {LocalConnection} from '../core/client/Connection';
import {ActivatedContainerUtil} from '../util/ActivatedContainerUtil';

export abstract class GenericContainer {

    CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE = '/agent/0/containers/';
    CONTAINER_NEW_CONTEXT_PATH = '/containers/';

    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection,
                protected containerPrefix: string,
                protected runInUserSpace?: boolean) {
    }

    // resolves the reader_id in the base URL
    protected containerSuffix(path?: string): string {
        // fetch the latest containerversion and create a containerUrl
        const containername: string = ActivatedContainerUtil.getContainerFor(this.connection.cfg, this.containerPrefix);
        this.containerUrl = this.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) {
            if (this.runInUserSpace) {
                return this.CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE + containername + path;
            }
            return this.containerUrl + path;
        } else {
            if (this.runInUserSpace) {
                return this.CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE + containername;
            }
            return this.containerUrl;
        }
    }
}
