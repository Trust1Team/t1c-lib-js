/**
 * @author Maarten Somers
 * @since 2017
 */

import * as CoreExceptions from "../exceptions/CoreExceptions";
import { BrowserInfo, DataResponse, T1CResponse } from '../service/CoreModel';

export { AbstractDSClient, DSInfoResponse, DownloadLinkResponse, JWTResponse, DSPubKeyResponse,
    DeviceResponse, DSPlatformInfo };


interface AbstractDSClient {
    activationRequest(pubKey: string, info: any,
                      callback?: (error: CoreExceptions.RestException, data: DataResponse) => void): Promise<DataResponse>;
    synchronizationRequest(pubKey: string, info: any, proxy: string,
                           callback?: (error: CoreExceptions.RestException, data: DataResponse) => void): Promise<DataResponse>;
    getUrl(): string;
    getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    getDevice(uuid: string, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    refreshJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(infoBrowser: BrowserInfo,
                 callback?: (error: CoreExceptions.RestException,
                             data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse>;
    register(info: DSPlatformInfo,
             device_id: string,
             callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    sync(info: DSPlatformInfo,
         device_id: string,
         callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
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

interface DownloadLinkResponse extends T1CResponse {
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

