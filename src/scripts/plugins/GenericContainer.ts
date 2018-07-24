import {LocalConnection} from '../core/client/Connection';
import {GCLClient} from '../core/GCLLib';

export abstract class GenericContainer {

    CONTAINER_NEW_CONTEXT_PATH = '/containers/';

    constructor(protected baseUrl: string,
                protected containerUrl: string,
                protected connection: LocalConnection) {
    }
    // resolves the reader_id in the base URL
    protected containerSuffix(path?: string): string {
        // fetch the latest containerversion and create a containerUrl
        const containername: string = GCLClient.getContainerFor(this.connection.cfg, this.containerUrl.split(new RegExp('([^/]*)$'))[1]);
        this.containerUrl = this.CONTAINER_NEW_CONTEXT_PATH + containername;
        if (path && path.length) { return this.containerUrl + path; }
        else { return this.containerUrl; }
    }
}