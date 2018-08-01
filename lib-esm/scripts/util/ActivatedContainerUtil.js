export class ActivatedContainerUtil {
    constructor() {
    }
    static getContainerFor(cfg, containerName) {
        return cfg.activeContainers.get(containerName)[0];
    }
    static getSortedProvidedContainers(containers) {
        let containerHashmap = new Map();
        for (let i = 0; i < containers.length; i++) {
            let prefix = containers[i].name.substr(0, containers[i].name.search('-'));
            let name = containers[i].name.replace(/\./g, '-');
            let container = containerHashmap.get(prefix);
            if (container) {
                container.push(...[name]);
                container.sort(function (first, last) {
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
    static getSortedContainers(containers) {
        let containerHashmap = new Map();
        for (let i = 0; i < containers.length; i++) {
            let name = containers[i].name;
            let version = containers[i].version.replace(/\./g, '-');
            let container = containerHashmap.get(name);
            if (container) {
                container.push(...[name + '-' + version]);
                container.sort(function (first, last) {
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
//# sourceMappingURL=ActivatedContainerUtil.js.map