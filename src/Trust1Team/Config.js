/**
 * @author Maarten Casteels
 * @since 2016
 */
var Config = (function () {
    function Config(connectorUrl, distributionUrl, performCheck) {
        this.defConnectorUrl = 'http://localhost:12345/v1';
        this.defDistributionUrl = 'https://dist.t1t.be/gcl-ds/v1';
        this._connectorUrl = connectorUrl || this.defConnectorUrl;
        this._distributionUrl = distributionUrl || this.defDistributionUrl;
        this._performCheck = performCheck || true;
    }
    Config.prototype.connectorUrl = function () {
        return this._connectorUrl;
    };
    Config.prototype.distributionUrl = function () {
        return this._distributionUrl;
    };
    Config.prototype.performCheck = function () {
        return this._performCheck;
    };
    return Config;
})();
exports.Config = Config;
//# sourceMappingURL=Config.js.map