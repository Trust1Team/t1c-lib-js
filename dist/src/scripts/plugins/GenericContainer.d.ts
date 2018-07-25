import { LocalConnection } from '../core/client/Connection';
export declare abstract class GenericContainer {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    CONTAINER_NEW_CONTEXT_PATH: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    protected containerSuffix(path?: string): string;
}
