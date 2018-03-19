/**
 * @author Maarten Somers
 * @since 2017
 */
import { GenericPinCard, OptionalPin } from '../Card';
import { DataResponse } from '../../../core/service/CoreModel';
import { RestException } from '../../../core/exceptions/CoreExceptions';
import { AbstractOcra, ChallengeData, ReadCounterResponse } from './ocraModel';
import { PinEnforcer } from '../../../util/PinEnforcer';
import * as Bluebird from 'bluebird';

export { Ocra };


class Ocra extends GenericPinCard implements AbstractOcra {
    static CHALLENGE = '/challenge';
    static READ_COUNTER = '/counter';

    public challenge(body: ChallengeData, callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Bluebird<DataResponse>((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined));
                }, error => { reject(error); });
            });
        }
    }

    public readCounter(body: OptionalPin,
                       callback?: (error: RestException, data: ReadCounterResponse) => void): Bluebird<ReadCounterResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                return this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin}, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Bluebird<ReadCounterResponse>((resolve, reject) => {
                PinEnforcer.check(this.connection, this.baseUrl, this.reader_id, body.pin).then(() => {
                    resolve(this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin}, undefined));
                }, error => { reject(error); });
            });
        }
    }
}
