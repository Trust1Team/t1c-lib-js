import { EidBe } from '../../plugins/smartcards/eid/be/EidBe';
import { ResponseHandler } from '../../util/ResponseHandler';
import * as _ from 'lodash';
import { CardUtil } from '../../util/CardUtil';
import { Aventra } from '../../plugins/smartcards/pki/aventra/Aventra';
import { SyncUtil } from '../../util/SyncUtil';
export class Arguments {
    constructor(client, readerId, container, data, dumpMethod, dumpOptions, reader) {
        this.client = client;
        this.readerId = readerId;
        this.container = container;
        this.data = data;
        this.dumpMethod = dumpMethod;
        this.dumpOptions = dumpOptions;
        this.reader = reader;
    }
}
export class GenericService {
    static containerForReader(client, readerId, callback) {
        return this.checkPrerequisites(client, readerId, {}).then(res => {
            return ResponseHandler.response({ data: res.container, success: true }, callback);
        }).catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static dumpData(client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(this.determineDataDumpMethod)
            .then(GenericService.doDataDump)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static authenticateCapable(client, callback) {
        return client.core().readersCardAvailable()
            .then(this.checkCanAuthenticate)
            .then(res => {
            return { client, readers: res };
        })
            .then(this.filterByAvailableContainers)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static signCapable(client, callback) {
        return client.core().readersCardAvailable()
            .then(this.checkCanSign)
            .then(res => {
            return { client, readers: res };
        })
            .then(this.filterByAvailableContainers)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static verifyPinCapable(client, callback) {
        return client.core().readersCardAvailable()
            .then(this.checkCanVerifyPin)
            .then(res => {
            return { client, readers: res };
        })
            .then(this.filterByAvailableContainers)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static authenticate(client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(this.determineAlgorithm)
            .then(GenericService.doAuthenticate)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static sign(client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(this.determineAlgorithm)
            .then(GenericService.doSign)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static verifyPin(client, readerId, data, callback) {
        return this.checkPrerequisites(client, readerId, data)
            .then(GenericService.doVerifyPin)
            .then(res => {
            return ResponseHandler.response(res, callback);
        })
            .catch(err => {
            return ResponseHandler.error(err, callback);
        });
    }
    static checkPKCS11(client) {
        return new Promise((resolve, reject) => {
            client.pkcs11().slotsWithTokenPresent().then(slots => {
                if (slots && slots.data && slots.data.length) {
                    let validToken = _.find(slots.data, slot => {
                        return _.includes(this.PKCS11_FLAGS, slot.flags);
                    });
                    resolve(!!validToken);
                }
                else {
                    resolve(false);
                }
            }, err => {
                reject(err);
            });
        });
    }
    static checkCanAuthenticate(data) {
        return new Promise((resolve) => {
            data.data = _.filter(data.data, reader => {
                return CardUtil.canAuthenticate(reader.card);
            });
            resolve(data);
        });
    }
    static checkCanSign(data) {
        return new Promise((resolve) => {
            data.data = _.filter(data.data, reader => {
                return CardUtil.canSign(reader.card);
            });
            resolve(data);
        });
    }
    static checkCanVerifyPin(data) {
        return new Promise((resolve) => {
            data.data = _.filter(data.data, reader => {
                return CardUtil.canVerifyPin(reader.card);
            });
            resolve(data);
        });
    }
    static filterByAvailableContainers(args) {
        return args.client.core().info().then(info => {
            return new Promise((resolve) => {
                args.readers.data = _.filter(args.readers.data, reader => {
                    return _.find(info.data.containers, ct => {
                        return ct.name === CardUtil.determineContainer(reader.card);
                    });
                });
                resolve(args.readers);
            });
        });
    }
    static checkPrerequisites(client, readerId, data) {
        return client.core().readersCardAvailable()
            .then(readers => {
            return { readerId, readers };
        })
            .then(this.checkReaderPresent)
            .then(reader => {
            return { reader, client };
        })
            .then(this.determineContainerForCard)
            .then(container => {
            return { client, container };
        })
            .then(this.checkContainerAvailable)
            .then((args) => {
            return new Arguments(args.client, readerId, args.container, data);
        });
    }
    static checkReaderPresent(args) {
        return new Promise((resolve, reject) => {
            let reader = _.find(args.readers.data, rd => {
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
    }
    static checkContainerAvailable(args) {
        return new Promise((resolve, reject) => {
            if (args && args.container) {
                args.client.core().info().then(res => {
                    if (_.find(res.data.containers, ct => {
                        return ct.name === args.container && ct.status === SyncUtil.INSTALLED;
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
    }
    static determineAlgorithm(args) {
        return new Promise((resolve, reject) => {
            if (!args.data.algorithm_reference || !args.data.algorithm_reference.length) {
                args.data.algorithm_reference = CardUtil.defaultAlgo(args.container);
            }
            if (!args.data.algorithm_reference) {
                reject('No algorithm reference provided and cannot determine default algorithm');
            }
            else {
                resolve(args);
            }
        });
    }
    static determineContainerForCard(args) {
        return new Promise((resolve, reject) => {
            if (args.reader && args.reader.card) {
                let container = CardUtil.determineContainer(args.reader.card);
                if (!container) {
                    GenericService.checkPKCS11(args.client).then(pkcs11 => {
                        pkcs11 ? resolve('pkcs11') : resolve(undefined);
                    }, () => {
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
    }
    static determineDataDumpMethod(args) {
        return new Promise((resolve, reject) => {
            args.dumpMethod = CardUtil.dumpMethod(args.container);
            args.dumpOptions = CardUtil.dumpOptions(args.container);
            if (args.dumpMethod) {
                resolve(args);
            }
            else {
                reject('Cannot determine method to use for data dump');
            }
        });
    }
    static doDataDump(args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).allData({ filters: [], parseCerts: true });
        }
        if (args.dumpOptions) {
            return args.client[args.container](args.readerId)[args.dumpMethod](args.dumpOptions, args.data);
        }
        else {
            return args.client[args.container](args.readerId)[args.dumpMethod](args.data);
        }
    }
    static doSign(args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).signData(args.data);
        }
        else {
            return args.client[args.container](args.readerId).signData(args.data);
        }
    }
    static doAuthenticate(args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).authenticate(args.data);
        }
        else {
            return args.client[args.container](args.readerId).authenticate(args.data);
        }
    }
    static doVerifyPin(args) {
        if (args.container === 'luxeid') {
            return args.client.luxeid(args.readerId, args.data.pin).verifyPin(args.data);
        }
        else if (args.container === 'beid') {
            let verifyPinData = {
                pin: args.data.pin,
                private_key_reference: EidBe.VERIFY_PRIV_KEY_REF
            };
            return args.client.beid(args.readerId).verifyPin(verifyPinData);
        }
        else if (args.container === 'aventra') {
            let verifyPinData = {
                pin: args.data.pin,
                private_key_reference: Aventra.DEFAULT_VERIFY_PIN
            };
            return args.client.aventra(args.readerId).verifyPin(verifyPinData);
        }
        else {
            return args.client[args.container](args.readerId).verifyPin(args.data);
        }
    }
}
GenericService.PKCS11_FLAGS = [1, 3, 5, 7];
//# sourceMappingURL=GenericService.js.map