"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CoreModel_1 = require("../service/CoreModel");
var DSBrowser = (function () {
    function DSBrowser(name, version) {
        this.name = name;
        this.version = version;
    }
    return DSBrowser;
}());
exports.DSBrowser = DSBrowser;
var DSOperatingSystem = (function () {
    function DSOperatingSystem(architecture, name, version) {
        this.architecture = architecture;
        this.name = name;
        this.version = version;
    }
    return DSOperatingSystem;
}());
exports.DSOperatingSystem = DSOperatingSystem;
var DSClientInfo = (function () {
    function DSClientInfo(type, version) {
        this.type = type;
        this.version = version;
    }
    return DSClientInfo;
}());
exports.DSClientInfo = DSClientInfo;
var DSDownloadRequest = (function () {
    function DSDownloadRequest(browser, manufacturer, os, ua, proxyDomain, gclVersion) {
        this.browser = browser;
        this.manufacturer = manufacturer;
        this.os = os;
        this.ua = ua;
        this.proxyDomain = proxyDomain;
        this.gclVersion = gclVersion;
    }
    return DSDownloadRequest;
}());
exports.DSDownloadRequest = DSDownloadRequest;
var DSRegistrationOrSyncRequest = (function () {
    function DSRegistrationOrSyncRequest(activated, uuid, version, derEncodedPublicKey, manufacturer, browser, os, ua, proxyDomain, clientInfo, namespace, containerStates) {
        this.activated = activated;
        this.uuid = uuid;
        this.version = version;
        this.derEncodedPublicKey = derEncodedPublicKey;
        this.manufacturer = manufacturer;
        this.browser = browser;
        this.os = os;
        this.ua = ua;
        this.proxyDomain = proxyDomain;
        this.clientInfo = clientInfo;
        this.namespace = namespace;
        this.containerStates = containerStates;
    }
    return DSRegistrationOrSyncRequest;
}());
exports.DSRegistrationOrSyncRequest = DSRegistrationOrSyncRequest;
var DSInfoResponse = (function () {
    function DSInfoResponse(configFile, build, version, environemnt, storageAppName, storageServiceAccount, storageCertPath, storageBucket, storageDownloadPrefix, fileOsx, fileWin32, fileWin64, fileDefaultVersion, securityEnabled, securityPrivateKeyAvailable) {
        this.configFile = configFile;
        this.build = build;
        this.version = version;
        this.environemnt = environemnt;
        this.storageAppName = storageAppName;
        this.storageServiceAccount = storageServiceAccount;
        this.storageCertPath = storageCertPath;
        this.storageBucket = storageBucket;
        this.storageDownloadPrefix = storageDownloadPrefix;
        this.fileOsx = fileOsx;
        this.fileWin32 = fileWin32;
        this.fileWin64 = fileWin64;
        this.fileDefaultVersion = fileDefaultVersion;
        this.securityEnabled = securityEnabled;
        this.securityPrivateKeyAvailable = securityPrivateKeyAvailable;
    }
    return DSInfoResponse;
}());
exports.DSInfoResponse = DSInfoResponse;
var DSDownloadLinkResponse = (function () {
    function DSDownloadLinkResponse(url, success) {
        this.url = url;
        this.success = success;
    }
    return DSDownloadLinkResponse;
}());
exports.DSDownloadLinkResponse = DSDownloadLinkResponse;
var DSJWTResponse = (function () {
    function DSJWTResponse(token) {
        this.token = token;
    }
    return DSJWTResponse;
}());
exports.DSJWTResponse = DSJWTResponse;
var DSPubKeyResponse = (function () {
    function DSPubKeyResponse(encryptedPublicKey, encryptedAesKey, ns, success) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
        this.success = success;
    }
    return DSPubKeyResponse;
}());
exports.DSPubKeyResponse = DSPubKeyResponse;
var DeviceResponse = (function () {
    function DeviceResponse(uuid, activated, atrList, coreVersion, contextToken, containerResponses) {
        this.uuid = uuid;
        this.activated = activated;
        this.atrList = atrList;
        this.coreVersion = coreVersion;
        this.contextToken = contextToken;
        this.containerResponses = containerResponses;
    }
    return DeviceResponse;
}());
exports.DeviceResponse = DeviceResponse;
var DSContainer = (function () {
    function DSContainer(id, name, version, osStorage, language, availability, dependsOn, status) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.osStorage = osStorage;
        this.language = language;
        this.availability = availability;
        this.dependsOn = dependsOn;
        this.status = status;
    }
    return DSContainer;
}());
exports.DSContainer = DSContainer;
var DSStorage = (function () {
    function DSStorage(hash, storagePath, os) {
        this.hash = hash;
        this.storagePath = storagePath;
        this.os = os;
    }
    return DSStorage;
}());
exports.DSStorage = DSStorage;
var DSPlatformInfo = (function (_super) {
    __extends(DSPlatformInfo, _super);
    function DSPlatformInfo(activated, bi, core_version, namespace) {
        var _this = _super.call(this, bi.browser, bi.manufacturer, bi.os, bi.ua) || this;
        _this.activated = activated;
        _this.bi = bi;
        _this.core_version = core_version;
        _this.namespace = namespace;
        return _this;
    }
    return DSPlatformInfo;
}(CoreModel_1.BrowserInfo));
exports.DSPlatformInfo = DSPlatformInfo;
//# sourceMappingURL=DSClientModel.js.map