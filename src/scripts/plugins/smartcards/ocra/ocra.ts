/**
 * @author Maarten Somers
 * @since 2017
 */
import {GenericPinCard, OptionalPin} from '../Card';
import {DataResponse} from '../../../core/service/CoreModel';
import {T1CLibException} from '../../../core/exceptions/CoreExceptions';
import {AbstractOcra, OcraChallenge, OcraReadCounterResponse} from './ocraModel';
import {PinEnforcer} from '../../../util/PinEnforcer';
import {LocalConnection} from '../../../core/client/Connection';

export class Ocra extends GenericPinCard implements AbstractOcra {
    static CONTAINER_PREFIX = 'ocra';
    static CHALLENGE = '/challenge';
    static READ_COUNTER = '/counter';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, reader_id: string) {
        super(baseUrl, containerUrl, connection, reader_id, Ocra.CONTAINER_PREFIX);
    }

    public challenge(body: OcraChallenge, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
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

    public challengeWithEncryptedPin(body: OcraChallenge, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined));
                }, error => {
                    reject(error);
                });
            });
        }
    }

    public readCounter(body: OptionalPin,
                       callback?: (error: T1CLibException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse> {
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

    public readCounterWithEncryptedPin(body: OptionalPin,
                                       callback?: (error: T1CLibException, data: OcraReadCounterResponse) => void): Promise<OcraReadCounterResponse> {
        if (callback && typeof callback === 'function') {
            PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
                return this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), {pin: body.pin}, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        } else {
            return new Promise((resolve, reject) => {
                PinEnforcer.checkAlreadyEncryptedPin(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), {pin: body.pin}, undefined));
                }, error => {
                    reject(error);
                });
            });
        }
    }
}
