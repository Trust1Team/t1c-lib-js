export class T1CResponse {
    constructor(success, data) {
        this.success = success;
        this.data = data;
    }
}
export class BoolDataResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class DataResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class DataArrayResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class DataObjectResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class InfoResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class T1CInfo {
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
export class T1CContainer {
    constructor(name, version, status) {
        this.name = name;
        this.version = version;
        this.status = status;
    }
}
export class T1CContainerid {
    constructor(name) {
        this.name = name;
    }
}
export class BrowserInfoResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class BrowserInfo {
    constructor(browser, manufacturer, os, ua) {
        this.browser = browser;
        this.manufacturer = manufacturer;
        this.os = os;
        this.ua = ua;
    }
}
export class SmartCard {
    constructor(atr, description) {
        this.atr = atr;
        this.description = description;
    }
}
export class CardReader {
    constructor(id, name, pinpad, card) {
        this.id = id;
        this.name = name;
        this.pinpad = pinpad;
        this.card = card;
    }
}
export class CardReadersResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class CertificateResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class CertificatesResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class T1CCertificate {
    constructor(base64, id, parsed) {
        this.base64 = base64;
        this.id = id;
        this.parsed = parsed;
    }
}
export class SingleReaderResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
//# sourceMappingURL=CoreModel.js.map