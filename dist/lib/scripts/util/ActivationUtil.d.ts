import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { GCLClient } from '../core/GCLLib';
export declare class ActivationUtil {
    constructor();
    static managedInitialization(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string): Promise<{}>;
    static unManagedInitialization(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string): Promise<{}>;
    private static registerDevice(client, mergedInfo, uuid);
    private static activateDevice(args);
    private static setDsKey(args);
}
