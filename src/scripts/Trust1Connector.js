/**
 * @author Maarten Casteels
 * @since 2016
 */
var Trust1Team_1 = require('./Trust1Team');
var Trust1Connector = (function () {
    function Trust1Connector(config) {
        this.config = new Trust1Team_1.Config(config);
        this.connection = new Trust1Team_1.Connection(this.config);
    }
    Trust1Connector.prototype.checkForConnector = function (callback) {
        var p = this.connection.get('https://localhost:12345/v1/info');
        p.then(function (result) {
            return callback(result);
        });
    };
    // Card Types
    // Card Readers
    Trust1Connector.prototype.beid = function () {
        var url = this.config.connectorUrl();
        return new Trust1Team_1.BeIDCard(url, this.connection);
    };
    return Trust1Connector;
})();
exports.Trust1Connector = Trust1Connector;
//# sourceMappingURL=Trust1Connector.js.map