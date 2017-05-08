/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";
import { BrowserInfoResponse, T1CResponse } from "../service/CoreModel";


interface AbstractDSClient {
    getUrl(): string;
    getInfo(callback: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): void;
    getJWT(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
    getDevice(uuid: string, callback: (error: CoreExceptions.RestException, data: DeviceResponse) => void): void;
    refreshJWT(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
    getPubKey(callback: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): void;
    downloadLink(infoBrowser: BrowserInfoResponse,
                 callback: (error: CoreExceptions.RestException, data: DownloadLinkResponse) => void): void;
    register(info: DSPlatformInfo, device_id: string, callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
    sync(info: DSPlatformInfo, device_id: string, callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
}

interface DSInfoResponse {
    configFile: string
    build: string
    version: string
    environemnt: string // TODO fix typo in DS
    storageAppName: string
    storageServiceAccount: string
    storageCertPath: string
    storageBucket: string
    storageDownloadPrefix: string
    fileOsx: string
    fileWin32: string
    fileWin64: string
    fileDefaultVersion: string
    securityEnabled: string // TODO should really be a boolean, needs fix in DS!
    securityPrivateKeyAvailable: boolean
}

interface DownloadLinkResponse {
    url: string
}

interface JWTResponse {
    token: string
}

interface DSPubKeyResponse extends T1CResponse {
    pubkey: string
}

interface DeviceResponse {
    uuid: string,
    activated: boolean,
    managed: boolean,
    coreVersion: string
}

interface DSPlatformInfo {
    activated: boolean
    browser: {
        name: string
        version: string
    }
    core_version: string
    manufacturer: string
    os: {
        architecture: number
        name: string
        version: string
    }
    ua: string
}

export { AbstractDSClient, DSInfoResponse, DownloadLinkResponse, JWTResponse, DSPubKeyResponse,
    DeviceResponse, DSPlatformInfo };
