import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { GCLClient } from '../core/GCLLib';
export declare class ActivationUtil {
    constructor();
    static unManagedInitialization(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string): Promise<{}>;
    private static registerDevice;
    private static activateDevice;
    private static setDsKey;
}
