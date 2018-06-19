/**
 * @author Maarten Somers
 * @since 2017
 */
import {GenericPinCard, OptionalPin} from '../Card';
import {DataResponse} from '../../../core/service/CoreModel';
import {RestException} from '../../../core/exceptions/CoreExceptions';
import {AbstractOcra, OcraChallenge, OcraReadCounterResponse} from './ocraModel';
import {PinEnforcer} from '../../../util/PinEnforcer';

export class Ocra extends GenericPinCard implements AbstractOcra {
    static CHALLENGE = '/challenge';
    static READ_COUNTER = '/counter';

    public challenge(body: OcraChallenge, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined));
                }, error => {
                    reject(error);
                });
            });
        }
    }

    public readCounter(body: OptionalPin,
                       callback?: (error: RestException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), {pin: body.pin}, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), {pin: body.pin}, undefined));
                }, error => {
                    reject(error);
                });
            });
        }
    }
}
