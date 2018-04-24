import { DSPlatformInfo } from '../core/ds/DSClientModel';
import { GCLClient } from '../core/GCLLib';
export { ActivationUtil };
declare class ActivationUtil {
    constructor();
    static unManagedInitialization(client: GCLClient, mergedInfo: DSPlatformInfo, uuid: string): Promise<{}>;
    private static registerDevice(client, mergedInfo, uuid);
    private static activateDevice(args);
}
