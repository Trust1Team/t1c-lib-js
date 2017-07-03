/**
 * @author Maarten Somers
 * @since 2017
 */
import { GenericPinCard, OptionalPin } from "../Card";
import { DataResponse } from "../../../core/service/CoreModel";
import { RestException } from "../../../core/exceptions/CoreExceptions";
import { AbstractOcra, ChallengeData, ReadCounterResponse } from "./ocraModel";
import { PinEnforcer } from "../../../util/PinEnforcer";
import { Promise } from "es6-promise";

export { Ocra };


class Ocra extends GenericPinCard implements AbstractOcra {
    static CHALLENGE = "/challenge";
    static READ_COUNTER = "/read-counter";

    public challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.resolvedReaderURI() + Ocra.CHALLENGE, body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.resolvedReaderURI() + Ocra.CHALLENGE, body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public readCounter(body: OptionalPin,
                       callback?: (error: RestException, data: ReadCounterResponse) => void): Promise<ReadCounterResponse> {
        if (callback && typeof callback === "function") {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.resolvedReaderURI() + Ocra.READ_COUNTER, body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.resolvedReaderURI() + Ocra.READ_COUNTER, body, undefined));
                }, error => { reject(error); });
            });
        }
    }
}
