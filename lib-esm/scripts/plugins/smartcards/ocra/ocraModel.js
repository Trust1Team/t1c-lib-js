import { OptionalPin } from '../Card';
import { DataObjectResponse } from '../../../core/service/CoreModel';
export class OcraAllDataResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class OcraAllData {
    constructor(counter) {
        this.counter = counter;
    }
}
export class OcraChallenge extends OptionalPin {
    constructor(challenge, pin, pace) {
        super(pin, pace);
        this.challenge = challenge;
        this.pin = pin;
        this.pace = pace;
    }
}
export class OcraReadCounterResponse {
    constructor(counter, success) {
        this.counter = counter;
        this.success = success;
    }
}
//# sourceMappingURL=ocraModel.js.map