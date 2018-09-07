import { GCLClient } from '../core/GCLLib';
export declare class ClientService {
    private static client;
    static getClient(): GCLClient;
    static setClient(newClient: GCLClient): void;
}
