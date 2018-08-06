"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientService = (function () {
    function ClientService() {
    }
    ClientService.getClient = function () {
        return ClientService.client;
    };
    ClientService.setClient = function (newClient) {
        ClientService.client = newClient;
    };
    return ClientService;
}());
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map