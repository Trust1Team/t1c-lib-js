import { T1CContainer, T1CContainerid } from '../core/service/CoreModel';
import { GCLConfig } from '../core/GCLConfig';
export declare class ActivatedContainerUtil {
    constructor();
    static getContainerFor(cfg: GCLConfig, containerName: string): string;
    static getSortedProvidedContainers(containers: T1CContainerid[]): Map<string, string[]>;
    static getSortedContainers(containers: T1CContainer[]): Map<string, string[]>;
}
