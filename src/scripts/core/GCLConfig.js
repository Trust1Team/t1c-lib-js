/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
"use strict";
var _ = require("lodash");
var defaultGclUrl = "https://localhost:10443/v1";
var defaultDSUrl = "https://accapim.t1t.be:443";
var defaultDSContextPath = "/trust1team/gclds/v1";
var defaultOCVContextPath = "/trust1team/ocv-api/v1";
var defaultDSContextPathTestMode = "/gcl-ds-web/v1";
var fileDownloadUrlPostfix = "/trust1team/gclds-file/v1";
var defaultAllowAutoUpdate = true;
var defaultImplicitDownload = false;
var defaultLocalTestMode = false;
var GCLConfig = (function () {
    // constructor for DTO
    function GCLConfig(dsUriValue, apiKey) {
        this._gclUrl = defaultGclUrl;
        this._dsUrl = dsUriValue + defaultDSContextPath;
        this._ocvUrl = dsUriValue + defaultOCVContextPath;
        this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
        this._dsUrlBase = dsUriValue;
        this._apiKey = apiKey;
        this._jwt = "none";
        this._allowAutoUpdate = defaultAllowAutoUpdate;
        this._implicitDownload = defaultImplicitDownload;
        this._localTestMode = defaultLocalTestMode;
    }
    Object.defineProperty(GCLConfig.prototype, "ocvUrl", {
        get: function () {
            return this._ocvUrl;
        },
        set: function (value) {
            this._ocvUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "gclUrl", {
        get: function () {
            return this._gclUrl;
        },
        set: function (value) {
            this._gclUrl = value || defaultGclUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "dsUrl", {
        get: function () {
            return this._dsUrl;
        },
        set: function (dsUriValue) {
            if (_.endsWith(dsUriValue, defaultDSContextPath)) {
                this._dsUrlBase = _.replace(dsUriValue, defaultDSContextPath, "");
                this._dsUrl = dsUriValue;
                this._dsFileDownloadUrl = this._dsUrlBase + fileDownloadUrlPostfix;
            }
            else {
                this._dsUrl = dsUriValue + defaultDSContextPath;
                this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
                this._dsUrlBase = dsUriValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "apiKey", {
        get: function () {
            return this._apiKey;
        },
        set: function (value) {
            this._apiKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "allowAutoUpdate", {
        get: function () {
            return this._allowAutoUpdate;
        },
        set: function (value) {
            this._allowAutoUpdate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "client_id", {
        get: function () {
            return this._client_id;
        },
        set: function (value) {
            this._client_id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "client_secret", {
        get: function () {
            return this._client_secret;
        },
        set: function (value) {
            this._client_secret = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "jwt", {
        get: function () {
            return this._jwt;
        },
        set: function (value) {
            this._jwt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "implicitDownload", {
        get: function () {
            return this._implicitDownload;
        },
        set: function (value) {
            this._implicitDownload = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "dsFilDownloadUrl", {
        get: function () {
            return this._dsFileDownloadUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "dsUrlBase", {
        get: function () {
            return this._dsUrlBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GCLConfig.prototype, "localTestMode", {
        get: function () {
            return this._localTestMode;
        },
        set: function (value) {
            this._localTestMode = value;
            if (this._localTestMode) {
                this._dsUrl = this._dsUrlBase + defaultDSContextPathTestMode;
            }
        },
        enumerable: true,
        configurable: true
    });
    return GCLConfig;
}());
exports.GCLConfig = GCLConfig;
