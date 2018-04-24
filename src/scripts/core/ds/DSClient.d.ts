import { Connection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { AbstractDSClient, DeviceResponse, DownloadLinkResponse, DSDownloadRequest, DSInfoResponse, DSPubKeyResponse, DSRegistrationOrSyncRequest } from './DSClientModel';
export { DSClient };
declare class DSClient implements AbstractDSClient {
    private url;
    private connection;
    private cfg;
    constructor(url: string, connection: Connection, cfg: GCLConfig);
    getUrl(): string;
    getInfo(callback?: (error: CoreExceptions.RestException, data: DSInfoResponse) => void): Promise<DSInfoResponse>;
    getDevice(uuid: string, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    getPubKey(uuid: string, callback?: (error: CoreExceptions.RestException, data: DSPubKeyResponse) => void): Promise<DSPubKeyResponse>;
    downloadLink(downloadData: DSDownloadRequest, callback?: (error: CoreExceptions.RestException, data: DownloadLinkResponse) => void): Promise<DownloadLinkResponse>;
    register(registrationData: DSRegistrationOrSyncRequest, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
    sync(syncData: DSRegistrationOrSyncRequest, callback?: (error: CoreExceptions.RestException, data: DeviceResponse) => void): Promise<DeviceResponse>;
}
