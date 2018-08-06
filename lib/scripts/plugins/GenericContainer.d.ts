import { LocalConnection } from '../core/client/Connection';
export declare abstract class GenericContainer {
    protected baseUrl: string;
    protected containerUrl: string;
    protected connection: LocalConnection;
    protected containerPrefix: string;
    CONTAINER_NEW_CONTEXT_PATH: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, containerPrefix: string);
    protected containerSuffix(path?: string): string;
}
