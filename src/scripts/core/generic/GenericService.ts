/**
 * @author Maarten Somers
 */

import { Promise } from "es6-promise";
import { GCLClient } from "../GCLLib";
import { AuthenticateOrSignData, OptionalPin, VerifyPinData } from "../../plugins/smartcards/Card";
import { EidBe } from "../../plugins/smartcards/eid/be/EidBe";
import { RestException } from "../exceptions/CoreExceptions";
import { CardReader, CardReadersResponse, DataResponse } from "../service/CoreModel";
import { ResponseHandler } from "../../util/ResponseHandler";
import * as _ from "lodash";
import { CardUtil } from "../../util/CardUtil";
import { Aventra } from "../../plugins/smartcards/pki/aventra/Aventra";
import { Options } from "../../util/RequestHandler";

export { GenericService };

interface Arguments {
    client: GCLClient,
    readerId: string,
    container: string,
    data: OptionalPin,
    dumpMethod?: string
    dumpOptions?: Options
}


class GenericService {

    public static containerForReader(client: GCLClient,
                                     readerId: string,
                                     callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.checkPrerequisites(client, readerId, {}).then(res => {
            return ResponseHandler.response({ data: res.container, success: true }, callback);
        }).catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static dumpData(client: GCLClient,
                           readerId: string,
                           data: OptionalPin,
                           callback?: (error: ResponseHandler, data: DataResponse) => void): Promise<DataResponse> {
        return this.checkPrerequisites(client, readerId, data)
                   .then(this.determineDataDumpMethod)
                   .then(GenericService.doDataDump)
                   .then(res => { return ResponseHandler.response(res, callback); })
                   .catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static authenticateCapable(client: GCLClient, callback?: (error: RestException, data: CardReadersResponse) => void) {
        return client.core().readersCardAvailable()
                     .then(this.checkCanAuthenticate)
                     .then(res => { return { client, readers: res }; })
                     .then(this.filterByAvailableContainers)
                     .then(res => { return ResponseHandler.response(res, callback); })
                     .catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static signCapable(client: GCLClient, callback?: (error: RestException, data: CardReadersResponse) => void) {
        return client.core().readersCardAvailable()
                     .then(this.checkCanSign)
                     .then(res => { return { client, readers: res }; })
                     .then(this.filterByAvailableContainers)
                     .then(res => { return ResponseHandler.response(res, callback); })
                     .catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static verifyPinCapable(client: GCLClient, callback?: (error: RestException, data: CardReadersResponse) => void) {
        return client.core().readersCardAvailable()
                     .then(this.checkCanVerifyPin)
                     .then(res => { return { client, readers: res }; })
                     .then(this.filterByAvailableContainers)
                     .then(res => { return ResponseHandler.response(res, callback); })
                     .catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static authenticate(client: GCLClient,
                               readerId: string,
                               data: AuthenticateOrSignData,
                               callback?: (error: RestException, data: DataResponse) => void) {

        return this.checkPrerequisites(client, readerId, data)
                   .then(this.determineAlgorithm)
                   .then(GenericService.doAuthenticate)
                   .then(res => { return ResponseHandler.response(res, callback); })
                   .catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static sign(client: GCLClient,
                       readerId: string,
                       data: AuthenticateOrSignData,
                       callback?: (error: RestException, data: DataResponse) => void) {

        return this.checkPrerequisites(client, readerId, data)
                   .then(this.determineAlgorithm)
                   .then(GenericService.doSign)
                   .then(res => { return ResponseHandler.response(res, callback); })
                   .catch(err => { return ResponseHandler.error(err, callback); });
    }

    public static verifyPin(client: GCLClient,
                            readerId: string,
                            data: OptionalPin,
                            callback?: (error: RestException, data: DataResponse) => void) {

        return this.checkPrerequisites(client, readerId, data)
                   .then(GenericService.doVerifyPin)
                   .then(res => { return ResponseHandler.response(res, callback); })
                   .catch(err => { return ResponseHandler.error(err, callback); });
    }

    private static checkCanAuthenticate(data: CardReadersResponse) {
        return new Promise((resolve) => {
            data.data = _.filter(data.data, reader => { return CardUtil.canAuthenticate(reader.card); });
            resolve(data);
        });
    }

    private static checkCanSign(data: CardReadersResponse) {
        return new Promise((resolve) => {
            data.data = _.filter(data.data, reader => { return CardUtil.canSign(reader.card); });
            resolve(data);
        });
    }

    private static checkCanVerifyPin(data: CardReadersResponse) {
        return new Promise((resolve) => {
            data.data = _.filter(data.data, reader => { return CardUtil.canVerifyPin(reader.card); });
            resolve(data);
        });
    }

    private static filterByAvailableContainers(args: { client: GCLClient, readers: CardReadersResponse }): Promise<CardReadersResponse> {
        return args.client.core().plugins().then(plugins => {
            return new Promise((resolve) => {
                args.readers.data = _.filter(args.readers.data, reader => {
                    // TODO optimize
                    return _.find(plugins.data, ct => { return ct.id === CardUtil.determineContainer(reader.card); });
                });
                resolve(args.readers);
            });
        });
    }

    private static checkPrerequisites(client: GCLClient, readerId: string, data: OptionalPin) {
        return client.core().readersCardAvailable()
                     .then(readers => { return { readerId, readers }; })
                     .then(this.checkReaderPresent)
                     .then(this.determineContainerForCard)
                     .then(container => { return { client, container }; })
                     .then(this.checkContainerAvailable)
                     .then((args: { client: GCLClient, container: string }) => {
                         return { client: args.client, readerId, container: args.container, data };
                     });
    }

    private static checkReaderPresent(args: { readerId: string, certificateId: string, readers: CardReadersResponse }) {
        return new Promise((resolve, reject) => {
            let reader = _.find(args.readers.data, rd => { return rd.id === args.readerId; });
            if (reader) {
                resolve(reader);
            } else {
                if (args.readerId && args.readerId.length) { reject("No card found for this ID"); }
                else { reject("Reader ID is required."); }
            }
        });
    }

    private static checkContainerAvailable(args: { client: GCLClient, container: string }) {
        return new Promise((resolve, reject) => {
            if (args && args.container) {
                args.client.core().plugins().then(res => {
                    if (_.find(res.data, ct => { return ct.id === args.container; })) {
                        resolve(args);
                    } else {
                        reject("Container for this card is not available");
                    }
                });
            } else { reject("Unknown card type"); }
        });
    }

    private static determineAlgorithm(args: { client: GCLClient, readerId: string, container: string, data: AuthenticateOrSignData }) {
        return new Promise((resolve, reject) => {
            if (!args.data.algorithm_reference || !args.data.algorithm_reference.length) {
                args.data.algorithm_reference = CardUtil.defaultAlgo(args.container);
            }
            if (!args.data.algorithm_reference) { reject("No algorithm reference provided and cannot determine default algorithm"); }
            else { resolve(args); }
        });
    }

    private static determineContainerForCard(reader: CardReader) {
        return new Promise((resolve, reject) => {
            if (reader && reader.card) {
                resolve(CardUtil.determineContainer(reader.card));
            } else { reject("No card present in reader"); }
        });
    }

    private static determineDataDumpMethod(args: Arguments) {
        return new Promise((resolve, reject) => {
            args.dumpMethod = CardUtil.dumpMethod(args.container);
            args.dumpOptions = CardUtil.dumpOptions(args.container);
            if (args.dumpMethod) { resolve(args); }
            else { reject("Cannot determine method to use for data dump"); }
        });
    }

    private static doDataDump(args: Arguments) {
        if (args.container === "luxeid") {
            return args.client.luxeid(args.readerId, args.data.pin).allData({ filters: [], parseCerts: true}, args.data);
        }
        if (args.dumpOptions) { return args.client[args.container](args.readerId)[args.dumpMethod](args.dumpOptions, args.data); }
        else { return args.client[args.container](args.readerId)[args.dumpMethod](args.data); }
    }

    private static doSign(args: Arguments) {
        if (args.container === "luxeid") {
            return args.client.luxeid(args.readerId, args.data.pin).signData(args.data);
        } else {
            return args.client[args.container](args.readerId).signData(args.data);
        }
    }

    private static doAuthenticate(args: Arguments) {
        if (args.container === "luxeid") {
            return args.client.luxeid(args.readerId, args.data.pin).authenticate(args.data);
        } else {
            return args.client[args.container](args.readerId).authenticate(args.data);
        }
    }

    private static doVerifyPin(args: Arguments) {
        if (args.container === "luxeid") {
            return args.client.luxeid(args.readerId, args.data.pin).verifyPin(args.data);
        } else if (args.container === "beid") {
            let verifyPinData: VerifyPinData = {
                pin: args.data.pin,
                private_key_reference: EidBe.VERIFY_PRIV_KEY_REF
            };
            return args.client.beid(args.readerId).verifyPin(verifyPinData);
        } else if (args.container === "aventra") {
            let verifyPinData: VerifyPinData = {
                pin: args.data.pin,
                private_key_reference: Aventra.DEFAULT_VERIFY_PIN
            };
            return args.client.aventra(args.readerId).verifyPin(verifyPinData);
        } else {
            return args.client[args.container](args.readerId).verifyPin(args.data);
        }
    }
}
