import { GCLConfig } from "../core/GCLConfig";
export { UrlUtil };
declare class UrlUtil {
    constructor();
    static create(base: string, suffix: string, config: GCLConfig, skipCitrixCheck: boolean): string;
}
