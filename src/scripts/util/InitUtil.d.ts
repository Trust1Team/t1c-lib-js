import { GCLClient } from '../core/GCLLib';
export { InitUtil };
declare class InitUtil {
    constructor();
    static initializeLibrary(client: GCLClient): Promise<{}>;
    private static coreV2Compatible(version);
    private static checkTokenCompatible(version);
}
