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
export { ClientService };
//# sourceMappingURL=ClientService.js.map