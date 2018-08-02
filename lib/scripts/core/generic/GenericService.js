"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EidBe_1 = require("../../plugins/smartcards/eid/be/EidBe");
var ResponseHandler_1 = require("../../util/ResponseHandler");
var _ = require("lodash");
var CardUtil_1 = require("../../util/CardUtil");
var Aventra_1 = require("../../plugins/smartcards/pki/aventra/Aventra");
var SyncUtil_1 = require("../../util/SyncUtil");
var Arguments = (function () {
    function Arguments(client, readerId, container, data, dumpMethod, dumpOptions, reader) {
        this.client = client;
        this.readerId = readerId;
        this.container = container;
        this.data = data;
        this.dumpMethod = dumpMethod;
        this.dumpOptions = dumpOptions;
        this.reader = reader;
    }
    return Arguments;
}());
exports.Arguments = Arguments;
var GenericService = (function () {
    function GenericService() {
    }
    GenericService.containerForReader = function (client, readerId, callback) {
        return this.checkPrerequisites(client, readerId, {}).then(function (res) {
            return ResponseHandler_1.ResponseHandler.response({ data: res.container, success: true }, callback);
        }).catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.dumpData = function (client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(this.determineDataDumpMethod)
            .then(GenericService.doDataDump)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.authenticateCapable = function (client, callback) {
        return client.core().readersCardAvailable()
            .then(this.checkCanAuthenticate)
            .then(function (res) {
            return { client: client, readers: res };
        })
            .then(this.filterByAvailableContainers)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.signCapable = function (client, callback) {
        return client.core().readersCardAvailable()
            .then(this.checkCanSign)
            .then(function (res) {
            return { client: client, readers: res };
        })
            .then(this.filterByAvailableContainers)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.verifyPinCapable = function (client, callback) {
        return client.core().readersCardAvailable()
            .then(this.checkCanVerifyPin)
            .then(function (res) {
            return { client: client, readers: res };
        })
            .then(this.filterByAvailableContainers)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.authenticate = function (client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(this.determineAlgorithm)
            .then(GenericService.doAuthenticate)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.sign = function (client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(this.determineAlgorithm)
            .then(GenericService.doSign)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.verifyPin = function (client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(GenericService.doVerifyPin)
            .then(function (res) {
            return ResponseHandler_1.ResponseHandler.response(res, callback);
        })
            .catch(function (err) {
            return ResponseHandler_1.ResponseHandler.error(err, callback);
        });
    };
    GenericService.checkPKCS11 = function (client) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            client.pkcs11().slotsWithTokenPresent().then(function (slots) {
                if (slots && slots.data && slots.data.length) {
                    var validToken = _.find(slots.data, function (slot) {
                        return _.includes(_this.PKCS11_FLAGS, slot.flags);
                    });
                    resolve(!!validToken);
                }
                else {
                    resolve(false);
                }
            }, function (err) {
                reject(err);
            });
        });
    };
    GenericService.checkCanAuthenticate = function (data) {
        return new Promise(function (resolve) {
            data.data = _.filter(data.data, function (reader) {
                return CardUtil_1.CardUtil.canAuthenticate(reader.card);
            });
            resolve(data);
        });
    };
    GenericService.checkCanSign = function (data) {
        return new Promise(function (resolve) {
            data.data = _.filter(data.data, function (reader) {
                return CardUtil_1.CardUtil.canSign(reader.card);
            });
            resolve(data);
        });
    };
    GenericService.checkCanVerifyPin = function (data) {
        return new Promise(function (resolve) {
            data.data = _.filter(data.data, function (reader) {
                return CardUtil_1.CardUtil.canVerifyPin(reader.card);
            });
            resolve(data);
        });
    };
    GenericService.filterByAvailableContainers = function (args) {
        return args.client.core().info().then(function (info) {
            return new Promise(function (resolve) {
                args.readers.data = _.filter(args.readers.data, function (reader) {
                    return _.find(info.data.containers, function (ct) {
                        return ct.name === CardUtil_1.CardUtil.determineContainer(reader.card);
                    });
                });
                resolve(args.readers);
            });
        });
    };
    GenericService.checkPrerequisites = function (client, readerId, data) {
        return client.core().readersCardAvailable()
            .then(function (readers) {
            return { readerId: readerId, readers: readers };
        })
            .then(this.checkReaderPresent)
            .then(function (reader) {
            return { reader: reader, client: client };
        })
            .then(this.determineContainerForCard)
            .then(function (container) {
            return { client: client, container: container };
        })
            .then(this.checkContainerAvailable)
            .then(function (args) {
            return new Arguments(args.client, readerId, args.container, data);
        });
    };
    GenericService.checkReaderPresent = function (args) {
        return new Promise(function (resolve, reject) {
            var reader = _.find(args.readers.data, function (rd) {
                return rd.id === args.readerId;
            });
            if (reader) {
                resolve(reader);
            }
            else {
                if (args.readerId && args.readerId.length) {
                    reject('No card found for this ID');
                }
                else {
                    reject('Reader ID is required.');
                }
            }
        });
    };
    GenericService.checkContainerAvailable = function (args) {
        return new Promise(function (resolve, reject) {
            if (args && args.container) {
                args.client.core().info().then(function (res) {
                    if (_.find(res.data.containers, function (ct) {
                        return ct.name === args.container && ct.status === SyncUtil_1.SyncUtil.INSTALLED;
                    })) {
                        resolve(args);
                    }
                    else {
                        reject('Container for this card is not available');
                    }
                });
            }
            else {
                reject('Unknown card type');
            }
        });
    };
    GenericService.determineAlgorithm = function (args) {
        return new Promise(function (resolve, reject) {
            if (!args.data.algorithm_reference || !args.data.algorithm_reference.length) {
                args.data.algorithm_reference = CardUtil_1.CardUtil.defaultAlgo(args.container);
            }
            if (!args.data.algorithm_reference) {
                reject('No algorithm reference provided and cannot determine default algorithm');
            }
            else {
                resolve(args);
            }
        });
    };
    GenericService.determineContainerForCard = function (args) {
        return new Promise(function (resolve, reject) {
            if (args.reader && args.reader.card) {
                var container = CardUtil_1.CardUtil.determineContainer(args.reader.card);
                if (!container) {
                    GenericService.checkPKCS11(args.client).then(function (pkcs11) {
                        pkcs11 ? resolve('pkcs11') : resolve(undefined);
                    }, function () {
                        resolve(undefined);
                    });
                }
                else {
                    resolve(container);
                }
            }
            else {
                reject('No card present in reader');
            }
        });
    };
    GenericService.determineDataDumpMethod = function (args) {
        return new Promise(function (resolve, reject) {
            args.dumpMethod = CardUtil_1.CardUtil.dumpMethod(args.container);
            args.dumpOptions = CardUtil_1.CardUtil.dumpOptions(args.container);
            if (args.dumpMethod) {
                resolve(args);
            }
            else {
                reject('Cannot determine method to use for data dump');
            }
        });
    };
    GenericService.doDataDump = function (args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).allData({ filters: [], parseCerts: true });
        }
        if (args.dumpOptions) {
            return args.client[args.container](args.readerId)[args.dumpMethod](args.dumpOptions, args.data);
        }
        else {
            return args.client[args.container](args.readerId)[args.dumpMethod](args.data);
        }
    };
    GenericService.doSign = function (args) {
        //TODO remove
        console.log('signdata args: ', args);
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).signData(args.data);
        }
        else {
            return args.client[args.container](args.readerId).signData(args.data);
        }
    };
    GenericService.doAuthenticate = function (args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).authenticate(args.data);
        }
        else {
            return args.client[args.container](args.readerId).authenticate(args.data);
        }
    };
    GenericService.doVerifyPin = function (args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).verifyPin(args.data);
        }
        else if (args.container === 'beid') {
            var verifyPinData = {
                pin: args.data.pin,
                private_key_reference: EidBe_1.EidBe.VERIFY_PRIV_KEY_REF
            };
            return args.client.beid(args.readerId).verifyPin(verifyPinData);
        }
        else if (args.container === 'aventra') {
            var verifyPinData = {
                pin: args.data.pin,
                private_key_reference: Aventra_1.Aventra.DEFAULT_VERIFY_PIN
            };
            return args.client.aventra(args.readerId).verifyPin(verifyPinData);
        }
        else {
            return args.client[args.container](args.readerId).verifyPin(args.data);
        }
    };
    GenericService.PKCS11_FLAGS = [1, 3, 5, 7];
    return GenericService;
}());
exports.GenericService = GenericService;
//# sourceMappingURL=GenericService.js.map