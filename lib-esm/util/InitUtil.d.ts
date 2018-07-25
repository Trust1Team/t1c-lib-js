import { GCLClient } from '../core/GCLLib';
export declare class InitUtil {
    constructor();
    static initializeLibrary(client: GCLClient): Promise<GCLClient>;
    private static extractHostname;
    private static coreV2Compatible;
    private static checkTokenCompatible;
}
