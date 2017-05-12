import * as CoreExceptions from "../exceptions/CoreExceptions";
import { BrowserInfoResponse, T1CResponse } from "../service/CoreModel";
export { AbstractDSClient, DSInfoResponse, DownloadLinkResponse, JWTResponse, DSPubKeyResponse, DeviceResponse, DSPlatformInfo };
interface AbstractDSClient {
    getUrl(): string;
    getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): void | Promise<DSInfoResponse>;
    getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
    getDevice(uuid: string, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): void | Promise<DeviceResponse>;
    refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): void | Promise<DSPubKeyResponse>;
    downloadLink(infoBrowser: BrowserInfoResponse, callback?: (error: CoreExceptions.RestException, data: DownloadLinkResponse) => void): void | Promise<DownloadLinkResponse>;
    register(info: DSPlatformInfo, device_id: string, callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
    sync(info: DSPlatformInfo, device_id: string, callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): void | Promise<JWTResponse>;
}
interface DSInfoResponse {
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
}
interface DownloadLinkResponse {
    url: string;
}
interface JWTResponse {
    token: string;
}
interface DSPubKeyResponse extends T1CResponse {
    pubkey: string;
}
interface DeviceResponse {
    uuid: string;
    activated: boolean;
    managed: boolean;
    coreVersion: string;
}
interface DSPlatformInfo {
    activated: boolean;
    browser: {
        name: string;
        version: string;
    };
    core_version: string;
    manufacturer: string;
    os: {
        architecture: number;
        name: string;
        version: string;
    };
    ua: string;
}
