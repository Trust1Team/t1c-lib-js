"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
const CoreModel_1 = require("../../../core/service/CoreModel");
class OcraAllDataResponse extends CoreModel_1.DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
exports.OcraAllDataResponse = OcraAllDataResponse;
class OcraAllData {
    constructor(counter) {
        this.counter = counter;
    }
}
exports.OcraAllData = OcraAllData;
class OcraChallenge extends Card_1.OptionalPin {
    constructor(challenge, pin, pace) {
        super(pin, pace);
        this.challenge = challenge;
        this.pin = pin;
        this.pace = pace;
    }
}
exports.OcraChallenge = OcraChallenge;
class OcraReadCounterResponse {
    constructor(counter, success) {
        this.counter = counter;
        this.success = success;
    }
}
exports.OcraReadCounterResponse = OcraReadCounterResponse;
//# sourceMappingURL=ocraModel.js.map