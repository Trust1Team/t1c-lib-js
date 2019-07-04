import { LocalConnection } from '../core/client/Connection';
export declare abstract class GenericContainer {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    protected containerPrefix: string;
    protected runInUserSpace?: boolean;
    CONTAINER_NEW_CONTEXT_PATH_IN_USERSPACE: string;
    CONTAINER_NEW_CONTEXT_PATH: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, containerPrefix: string, runInUserSpace?: boolean);
    protected containerSuffix(path?: string): string;
}
