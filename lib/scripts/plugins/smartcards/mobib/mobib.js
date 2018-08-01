"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
const MOBIB_CARD_ISSUING = '/card-issuing';
const MOBIB_CONTRACTS = '/contracts';
const MOBIB_PHOTO = '/picture';
const MOBIB_STATUS = '/status';
class Mobib extends Card_1.GenericSmartCard {
    constructor(baseUrl, containerUrl, connection, reader_id) {
        super(baseUrl, containerUrl, connection, reader_id, Mobib.CONTAINER_PREFIX);
    }
    cardIssuing(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_CARD_ISSUING), undefined, undefined, callback);
    }
    contracts(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_CONTRACTS), undefined, undefined, callback);
    }
    picture(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_PHOTO), undefined, undefined, callback);
    }
    status(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(MOBIB_STATUS), undefined, undefined, callback);
    }
}
Mobib.CONTAINER_PREFIX = 'mobib';
exports.Mobib = Mobib;
//# sourceMappingURL=mobib.js.map