/**
 * @author Maarten Casteels
 * @since 2016
 */

var T1Connector = T1Connector || {};
(function (service) {

    function T1Connector(config, distributionCallback) {
        this.config = config;

        // if perform check == perform the check automatically
        // otherwise it's the developer how has to invoke the check.
        // when invoking we should receive a callback additionally
        // otherwise throw exception
    }

    T1Connector.prototype.checkForConnector = function (callback) {

    };

    var defaultOptions = {
        connectorUrl: 'http://localhost:12345/v1',
        distributionUrl: 'https://dist.t1t.be/gcl-ds/v1',
        performConnectorCheck: true
    };

    service.init = function (options, distributionCallback) {
        options = options || {};
        options.connectorUrl = options.connectorUrl || defaultOptions.connectorUrl;
        options.distributionUrl = options.distributionUrl || defaultOptions.distributionUrl;
        options.performConnectorCheck = options.performConnectorCheck != undefined ? options.performConnectorCheck : defaultOptions.performConnectorCheck;

        return new T1Connector(options, distributionCallback);
    };
}(T1Connector));

module.exports = T1Connector;