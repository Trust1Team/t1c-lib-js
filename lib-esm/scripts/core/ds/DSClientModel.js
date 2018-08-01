import { BrowserInfo } from '../service/CoreModel';
export class DSBrowser {
    constructor(name, version) {
        this.name = name;
        this.version = version;
    }
}
export class DSOperatingSystem {
    constructor(architecture, name, version) {
        this.architecture = architecture;
        this.name = name;
        this.version = version;
    }
}
export class DSClientInfo {
    constructor(type, version) {
        this.type = type;
        this.version = version;
    }
}
export class DSDownloadRequest {
    constructor(browser, manufacturer, os, ua, proxyDomain) {
        this.browser = browser;
        this.manufacturer = manufacturer;
        this.os = os;
        this.ua = ua;
        this.proxyDomain = proxyDomain;
    }
}
export class DSRegistrationOrSyncRequest {
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
export class DSInfoResponse {
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
export class DSDownloadLinkResponse {
    constructor(url, success) {
        this.url = url;
        this.success = success;
    }
}
export class DSJWTResponse {
    constructor(token) {
        this.token = token;
    }
}
export class DSPubKeyResponse {
    constructor(encryptedPublicKey, encryptedAesKey, ns, success) {
        this.encryptedPublicKey = encryptedPublicKey;
        this.encryptedAesKey = encryptedAesKey;
        this.ns = ns;
        this.success = success;
    }
}
export class DeviceResponse {
    constructor(uuid, activated, atrList, coreVersion, contextToken, containerResponses) {
        this.uuid = uuid;
        this.activated = activated;
        this.atrList = atrList;
        this.coreVersion = coreVersion;
        this.contextToken = contextToken;
        this.containerResponses = containerResponses;
    }
}
export class DSContainer {
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
export class DSStorage {
    constructor(hash, storagePath, os) {
        this.hash = hash;
        this.storagePath = storagePath;
        this.os = os;
    }
}
export class DSPlatformInfo extends BrowserInfo {
    constructor(activated, bi, core_version, namespace) {
        super(bi.browser, bi.manufacturer, bi.os, bi.ua);
        this.activated = activated;
        this.bi = bi;
        this.core_version = core_version;
        this.namespace = namespace;
    }
}
//# sourceMappingURL=DSClientModel.js.map