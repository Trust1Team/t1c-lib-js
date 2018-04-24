import { BrowserInfo, T1CContainer, T1CResponse } from '../service/CoreModel';
import { RestException } from '../exceptions/CoreExceptions';
export { AbstractDSClient, DSInfoResponse, DownloadLinkResponse, JWTResponse, DSPubKeyResponse, DeviceResponse, DSPlatformInfo, DSDownloadRequest, DSRegistrationOrSyncRequest, DSBrowser, DSOperatingSystem, DSClientInfo, DSContainer, DSStorage };
interface AbstractDSClient {
    getUrl(): string;
    getInfo(callback?: (error: RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    getPubKey(deviceId: string, callback?: (error: RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(downloadData: DSDownloadRequest, callback?: (error: RestException, data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse>;
    register(registrationData: DSRegistrationOrSyncRequest, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    sync(syncData: DSRegistrationOrSyncRequest, callback?: (error: RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}
declare class DSBrowser {
    name: string;
    version: string;
    constructor(name: string, version: string);
}
declare class DSOperatingSystem {
    architecture: number;
    name: string;
    version: string;
    constructor(architecture: number, name: string, version: string);
}
declare class DSClientInfo {
    type: string;
    version: string;
    constructor(type: string, version: string);
}
declare class DSDownloadRequest {
    browser: DSBrowser;
    manufacturer: string;
    os: DSOperatingSystem;
    ua: string;
    proxyDomain: string;
    constructor(browser: DSBrowser, manufacturer: string, os: DSOperatingSystem, ua: string, proxyDomain: string);
}
declare class DSRegistrationOrSyncRequest {
    managed: boolean;
    activated: boolean;
    uuid: string;
    version: string;
    derEncodedPublicKey: string;
    manufacturer: string;
    browser: DSBrowser;
    os: DSOperatingSystem;
    ua: string;
    proxyDomain: string;
    clientInfo: DSClientInfo;
    containerStates: T1CContainer[];
    constructor(managed: boolean, activated: boolean, uuid: string, version: string, derEncodedPublicKey: string, manufacturer: string, browser: DSBrowser, os: DSOperatingSystem, ua: string, proxyDomain: string, clientInfo: DSClientInfo, containerStates?: T1CContainer[]);
}
declare class DSInfoResponse {
    configFile: string;
    build: string;
    version: string;
    environemnt: string;
    storageAppName: string;
    storageServiceAccount: string;
    storageCertPath: string;
    storageBucket: string;
    storageDownloadPrefix: string;
    fileOsx: string;
    fileWin32: string;
    fileWin64: string;
    fileDefaultVersion: string;
    securityEnabled: string;
    securityPrivateKeyAvailable: boolean;
    constructor(configFile: string, build: string, version: string, environemnt: string, storageAppName: string, storageServiceAccount: string, storageCertPath: string, storageBucket: string, storageDownloadPrefix: string, fileOsx: string, fileWin32: string, fileWin64: string, fileDefaultVersion: string, securityEnabled: string, securityPrivateKeyAvailable: boolean);
}
declare class DownloadLinkResponse implements T1CResponse {
    url: string;
    success: boolean;
    constructor(url: string, success: boolean);
}
declare class JWTResponse {
    token: string;
    constructor(token: string);
}
declare class DSPubKeyResponse implements T1CResponse {
    encryptedPublicKey: string;
    encryptedAesKey: string;
    success: boolean;
    constructor(encryptedPublicKey: string, encryptedAesKey: string, success: boolean);
}
declare class DeviceResponse {
    uuid: string;
    activated: boolean;
    atrList: {
        hash: string;
        storagePath: string;
    };
    managed: boolean;
    coreVersion: string;
    contextToken: string;
    containerResponses: DSContainer[];
    constructor(uuid: string, activated: boolean, atrList: {
        hash: string;
        storagePath: string;
    }, managed: boolean, coreVersion: string, contextToken: string, containerResponses: DSContainer[]);
}
declare class DSContainer {
    id: string;
    name: string;
    version: string;
    osStorage: DSStorage[];
    language: string;
    availability: string;
    dependsOn: string[];
    status: string;
    constructor(id: string, name: string, version: string, osStorage: DSStorage[], language: string, availability: string, dependsOn: string[], status: string);
}
declare class DSStorage {
    hash: string;
    storagePath: string;
    os: string;
    constructor(hash: string, storagePath: string, os: string);
}
declare class DSPlatformInfo extends BrowserInfo {
    activated: boolean;
    managed: boolean;
    bi: BrowserInfo;
    core_version: string;
    constructor(activated: boolean, managed: boolean, bi: BrowserInfo, core_version: string);
}
