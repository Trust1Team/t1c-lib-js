"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class T1CResponse {
    constructor(success, data) {
        this.success = success;
        this.data = data;
    }
}
exports.T1CResponse = T1CResponse;
class BoolDataResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.BoolDataResponse = BoolDataResponse;
class DataResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.DataResponse = DataResponse;
class DataArrayResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.DataArrayResponse = DataArrayResponse;
class DataObjectResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.DataObjectResponse = DataObjectResponse;
class InfoResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.InfoResponse = InfoResponse;
class T1CInfo {
    constructor(activated, citrix, managed, arch, os, uid, containers, version) {
        this.activated = activated;
        this.citrix = citrix;
        this.managed = managed;
        this.arch = arch;
        this.os = os;
        this.uid = uid;
        this.containers = containers;
        this.version = version;
    }
}
exports.T1CInfo = T1CInfo;
class T1CContainer {
    constructor(name, version, status) {
        this.name = name;
        this.version = version;
        this.status = status;
    }
}
exports.T1CContainer = T1CContainer;
class T1CContainerid {
    constructor(name) {
        this.name = name;
    }
}
exports.T1CContainerid = T1CContainerid;
class BrowserInfoResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.BrowserInfoResponse = BrowserInfoResponse;
class BrowserInfo {
    constructor(browser, manufacturer, os, ua) {
        this.browser = browser;
        this.manufacturer = manufacturer;
        this.os = os;
        this.ua = ua;
    }
}
exports.BrowserInfo = BrowserInfo;
class SmartCard {
    constructor(atr, description) {
        this.atr = atr;
        this.description = description;
    }
}
exports.SmartCard = SmartCard;
class CardReader {
    constructor(id, name, pinpad, card) {
        this.id = id;
        this.name = name;
        this.pinpad = pinpad;
        this.card = card;
    }
}
exports.CardReader = CardReader;
class CardReadersResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.CardReadersResponse = CardReadersResponse;
class CertificateResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.CertificateResponse = CertificateResponse;
class CertificatesResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.CertificatesResponse = CertificatesResponse;
class T1CCertificate {
    constructor(base64, id, parsed) {
        this.base64 = base64;
        this.id = id;
        this.parsed = parsed;
    }
}
exports.T1CCertificate = T1CCertificate;
class SingleReaderResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.SingleReaderResponse = SingleReaderResponse;
//# sourceMappingURL=CoreModel.js.map