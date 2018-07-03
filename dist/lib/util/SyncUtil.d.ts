import { DeviceResponse, DSPlatformInfo } from '../core/ds/DSClientModel';
import { GCLClient } from '../core/GCLLib';
import { T1CContainer } from '../core/service/CoreModel';
export declare class SyncUtil {
    static readonly DOWNLOAD_ERROR: string;
    static readonly GENERIC_ERROR: string;
    static readonly ERROR_STATES: string[];
    static readonly INIT: string;
    static readonly DOWNLOADING: string;
    static readonly ONGOING_STATES: string[];
    static readonly INSTALLED: string;
    constructor();
    static managedSynchronisation(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string, containers: T1CContainer[]): Promise<{}>;
    static unManagedSynchronization(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string, containers: T1CContainer[]): Promise<{}>;
    static syncDevice(client: GCLClient, pubKey: string, info: DSPlatformInfo, deviceId: string, containers: T1CContainer[]): Promise<DeviceResponse>;
    private static doSyncFlow(client, mergedInfo, uuid, containers, isRetry);
    private static pollDownloadCompletion(client, containerConfig, isRetry);
}
