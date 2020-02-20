"use strict";
exports.__esModule = true;
var ClientService = /** @class */ (function () {
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
