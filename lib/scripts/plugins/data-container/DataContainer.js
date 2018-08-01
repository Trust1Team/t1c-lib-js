"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericContainer_1 = require("../GenericContainer");
class DataContainer extends GenericContainer_1.GenericContainer {
    constructor(baseUrl, containerUrl, connection) {
        super(baseUrl, containerUrl, connection, containerUrl);
    }
    create(data, callback) {
        return this.connection.put(this.baseUrl, this.containerSuffix(), data, undefined, undefined, callback);
    }
    read(id, callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(id), undefined, undefined, callback);
    }
    update(id, data, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(), data, undefined, undefined, callback);
    }
    delete(id, callback) {
        return this.connection.delete(this.baseUrl, this.containerSuffix(id), undefined, undefined, callback);
    }
}
exports.DataContainer = DataContainer;
//# sourceMappingURL=DataContainer.js.map