
import { GCLClient } from '../core/GCLLib';

export class ClientService {
    private static client: GCLClient;

    public static getClient() {
        return ClientService.client;
    }

    public static setClient(newClient: GCLClient) {
        ClientService.client = newClient;
    }
}
