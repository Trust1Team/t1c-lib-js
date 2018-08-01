"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientService {
    static getClient() {
        return ClientService.client;
    }
    static setClient(newClient) {
        ClientService.client = newClient;
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map