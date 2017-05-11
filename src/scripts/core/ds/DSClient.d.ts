import { Connection } from "../client/Connection";
import { GCLConfig } from "../GCLConfig";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import { BrowserInfoResponse } from "../service/CoreModel";
import { AbstractDSClient, DeviceResponse, DownloadLinkResponse, DSInfoResponse, DSPlatformInfo, DSPubKeyResponse, JWTResponse } from "./DSClientModel";
export { DSClient };
declare class DSClient implements AbstractDSClient {
    private url;
    private connection;
    private cfg;
    constructor(url: string, connection: Connection, cfg: GCLConfig);
    getUrl(): string;
    getInfo(callback: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): void;
    getDevice(uuid: string, callback: (error: CoreExceptions.RestException, data: DeviceResponse) => void): void;
    getJWT(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
    refreshJWT(callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
    getPubKey(callback: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): void;
    downloadLink(infoBrowser: BrowserInfoResponse, callback: (error: CoreExceptions.RestException, data: DownloadLinkResponse) => void): void;
    register(info: DSPlatformInfo, device_id: string, callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
    sync(info: DSPlatformInfo, device_id: string, callback: (error: CoreExceptions.RestException, data: JWTResponse) => void): void;
}
