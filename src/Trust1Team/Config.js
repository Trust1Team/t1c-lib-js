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
    Object.defineProperty(Config.prototype, "connectorUrl", {
        get: function () {
            return this._connectorUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "distributionUrl", {
        get: function () {
            return this._distributionUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "performCheck", {
        get: function () {
            return this._performCheck;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
})();
exports.Config = Config;
//# sourceMappingURL=Config.js.map