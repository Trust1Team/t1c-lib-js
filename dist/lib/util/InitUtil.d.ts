import { GCLClient } from '../core/GCLLib';
export declare class InitUtil {
    constructor();
    static initializeLibrary(client: GCLClient): Promise<GCLClient>;
    private static coreV2Compatible(version);
    private static checkTokenCompatible(version);
}
