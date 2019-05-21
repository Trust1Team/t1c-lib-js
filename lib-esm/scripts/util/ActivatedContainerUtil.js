var ActivatedContainerUtil = (function () {
    function ActivatedContainerUtil() {
    }
    ActivatedContainerUtil.getContainerFor = function (cfg, containerName) {
        try {
            return cfg.activeContainers.get(containerName)[0];
        }
        catch (e) {
            console.log(e);
        }
    };
    ActivatedContainerUtil.getSortedProvidedContainers = function (containers) {
        var containerHashmap = new Map();
        for (var i = 0; i < containers.length; i++) {
            var prefix = containers[i].name.substr(0, containers[i].name.search('-'));
            var name_1 = containers[i].name.replace(/\./g, '-');
            var container = containerHashmap.get(prefix);
            if (container) {
                container.push.apply(container, [name_1]);
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
                containerHashmap.set(prefix, [name_1]);
            }
        }
        return containerHashmap;
    };
    ActivatedContainerUtil.getSortedContainers = function (containers) {
        var containerHashmap = new Map();
        for (var i = 0; i < containers.length; i++) {
            var name_2 = containers[i].name;
            var version = containers[i].version.replace(/\./g, '-');
            var container = containerHashmap.get(name_2);
            if (container) {
                container.push.apply(container, [name_2 + '-' + version]);
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
                containerHashmap.set(name_2, [name_2 + '-' + version]);
            }
        }
        return containerHashmap;
    };
    return ActivatedContainerUtil;
}());
export { ActivatedContainerUtil };
//# sourceMappingURL=ActivatedContainerUtil.js.map