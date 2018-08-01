import { GenericPinCard } from '../Card';
import { PinEnforcer } from '../../../util/PinEnforcer';
export class Ocra extends GenericPinCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, Ocra.CONTAINER_PREFIX);
    }
    challenge(body, callback) {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.post(this.baseUrl, this.containerSuffix(Ocra.CHALLENGE), body, undefined));
                }, error => {
                    reject(error);
                });
            });
        }
    }
    readCounter(body, callback) {
        if (callback && typeof callback === 'function') {
            PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                return this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin }, undefined, callback);
            }, error => {
                return callback(error, null);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                PinEnforcer.check(this.connection, this.reader_id, body).then(() => {
                    resolve(this.connection.get(this.baseUrl, this.containerSuffix(Ocra.READ_COUNTER), { pin: body.pin }, undefined));
                }, error => {
                    reject(error);
                });
            });
        }
    }
}
Ocra.CONTAINER_PREFIX = 'ocra';
Ocra.CHALLENGE = '/challenge';
Ocra.READ_COUNTER = '/counter';
//# sourceMappingURL=ocra.js.map