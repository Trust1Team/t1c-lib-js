"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../service/CoreModel");
class DSBrowser {
    constructor(name, version) {
        this.name = name;
        this.version = version;
    }
}
exports.DSBrowser = DSBrowser;
class DSOperatingSystem {
    constructor(architecture, name, version) {
        this.architecture = architecture;
        this.name = name;
        this.version = version;
    }
}
exports.DSOperatingSystem = DSOperatingSystem;
class DSClientInfo {
    constructor(type, version) {
        this.type = type;
        this.version = version;
    }
}
exports.DSClientInfo = DSClientInfo;
class DSDownloadRequest {
    constructor(browser, manufacturer, os, ua, proxyDomain) {
        this.browser = browser;
        this.manufacturer = manufacturer;
        this.os = os;
        this.ua = ua;
        this.proxyDomain = proxyDomain;
    }
}
exports.DSDownloadRequest = DSDownloadRequest;
class DSRegistrationOrSyncRequest {
    constructor(activated, uuid, version, derEncodedPublicKey, manufacturer, browser, os, ua, proxyDomain, clientInfo, namespace, containerStates) {
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
}
exports.DSRegistrationOrSyncRequest = DSRegistrationOrSyncRequest;
class DSInfoResponse {
    constructor(configFile, build, version, environemnt, storageAppName, storageServiceAccount, storageCertPath, storageBucket, storageDownloadPrefix, fileOsx, fileWin32, fileWin64, fileDefaultVersion, securityEnabled, securityPrivateKeyAvailable) {
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
}
exports.DSInfoResponse = DSInfoResponse;
class DSDownloadLinkResponse {
    constructor(url, success) {
        this.url = url;
        this.success = success;
    }
}
exports.DSDownloadLinkResponse = DSDownloadLinkResponse;
class DSJWTResponse {
    constructor(token) {
        this.token = token;
    }
}
exports.DSJWTResponse = DSJWTResponse;
class DSPubKeyResponse {
    constructor(encryptedPublicKey, encryptedAesKey, ns, success) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
        this.success = success;
    }
}
exports.DSPubKeyResponse = DSPubKeyResponse;
class DeviceResponse {
    constructor(uuid, activated, atrList, coreVersion, contextToken, containerResponses) {
        this.uuid = uuid;
        this.activated = activated;
        this.atrList = atrList;
        this.coreVersion = coreVersion;
        this.contextToken = contextToken;
        this.containerResponses = containerResponses;
    }
}
exports.DeviceResponse = DeviceResponse;
class DSContainer {
    constructor(id, name, version, osStorage, language, availability, dependsOn, status) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.osStorage = osStorage;
        this.language = language;
        this.availability = availability;
        this.dependsOn = dependsOn;
        this.status = status;
    }
}
exports.DSContainer = DSContainer;
class DSStorage {
    constructor(hash, storagePath, os) {
        this.hash = hash;
        this.storagePath = storagePath;
        this.os = os;
    }
}
exports.DSStorage = DSStorage;
class DSPlatformInfo extends CoreModel_1.BrowserInfo {
    constructor(activated, bi, core_version, namespace) {
        super(bi.browser, bi.manufacturer, bi.os, bi.ua);
        this.activated = activated;
        this.bi = bi;
        this.core_version = core_version;
        this.namespace = namespace;
    }
}
exports.DSPlatformInfo = DSPlatformInfo;
//# sourceMappingURL=DSClientModel.js.map