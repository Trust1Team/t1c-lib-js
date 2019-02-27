import {T1CContainer, T1CContainerid} from '../core/service/CoreModel';
import {GCLConfig} from '../core/GCLConfig';

export class ActivatedContainerUtil {


    constructor() {
    }

    public static getContainerFor(cfg: GCLConfig, containerName: string): string {
        try {
            return cfg.activeContainers.get(containerName)[0];
        } catch (e) {
            console.log(e);
        }
    }

    /*
    // static function that receives a list of containers and returns a hashmap with all the containers grouped with their versions
    // this sorts the versions so the 1st is the latest version
    */
    public static getSortedProvidedContainers(containers: T1CContainerid[]): Map<string, string[]> {
        let containerHashmap = new Map<string, string[]>();
        for (let i = 0; i < containers.length; i++) {
            let prefix = containers[i].name.substr(0, containers[i].name.search('-'));
            let name = containers[i].name.replace(/\./g, '-');

            let container = containerHashmap.get(prefix);
            if (container) {
                container.push(...[name]);
                container.sort(function(first: string, last: string) { // check if basic sort exists
                    if (first > last) {
                        return -1;
                    }
                    if (first < last) {
                        return 1;
                    }
                    return 0;
                });
            }
            else {
                containerHashmap.set(prefix, [name]);
            }
        }

        return containerHashmap;
    }
    /*
   // static function that receives a list of containers and returns a hashmap with all the containers grouped with their versions
   // this sorts the versions so the 1st is the latest version
   */
    public static getSortedContainers(containers: T1CContainer[]): Map<string, string[]> {
        let containerHashmap = new Map<string, string[]>();
        for (let i = 0; i < containers.length; i++) {
            let name = containers[i].name;
            let version = containers[i].version.replace(/\./g, '-');

            let container = containerHashmap.get(name);
            if (container) {
                container.push(...[name + '-' + version]);
                container.sort(function(first: string, last: string) { // check if basic sort exists
                    if (first > last) {
                        return -1;
                    }
                    if (first < last) {
                        return 1;
                    }
                    return 0;
                });
            }
            else {
                containerHashmap.set(name, [name + '-' + version]);
            }
        }

        return containerHashmap;
    }
}
