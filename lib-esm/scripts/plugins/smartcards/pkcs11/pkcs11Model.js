var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CertificatesResponse, DataObjectResponse, T1CCertificate } from '../../../core/service/CoreModel';
import { AuthenticateOrSignData } from '../Card';
var Pkcs11InfoResponse = (function (_super) {
    __extends(Pkcs11InfoResponse, _super);
    function Pkcs11InfoResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return Pkcs11InfoResponse;
}(DataObjectResponse));
export { Pkcs11InfoResponse };
var Pkcs11Info = (function () {
    function Pkcs11Info(cryptoki_version, manufacturer_id, flags, library_description, library_version) {
        this.cryptoki_version = cryptoki_version;
        this.manufacturer_id = manufacturer_id;
        this.flags = flags;
        this.library_description = library_description;
        this.library_version = library_version;
    }
    return Pkcs11Info;
}());
export { Pkcs11Info };
var Pkcs11Slot = (function () {
    function Pkcs11Slot(slot_id, description, flags, hardware_version, firmware_version) {
        this.slot_id = slot_id;
        this.description = description;
        this.flags = flags;
        this.hardware_version = hardware_version;
        this.firmware_version = firmware_version;
    }
    return Pkcs11Slot;
}());
export { Pkcs11Slot };
var Pkcs11SlotsResponse = (function (_super) {
    __extends(Pkcs11SlotsResponse, _super);
    function Pkcs11SlotsResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return Pkcs11SlotsResponse;
}(DataObjectResponse));
export { Pkcs11SlotsResponse };
var Pkcs11Certificate = (function (_super) {
    __extends(Pkcs11Certificate, _super);
    function Pkcs11Certificate(id, base64, parsed) {
        var _this = _super.call(this, base64, id, parsed) || this;
        _this.id = id;
        _this.base64 = base64;
        _this.parsed = parsed;
        return _this;
    }
    return Pkcs11Certificate;
}(T1CCertificate));
export { Pkcs11Certificate };
var Pkcs11CertificatesResponse = (function (_super) {
    __extends(Pkcs11CertificatesResponse, _super);
    function Pkcs11CertificatesResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return Pkcs11CertificatesResponse;
}(CertificatesResponse));
export { Pkcs11CertificatesResponse };
var Pkcs11SignData = (function (_super) {
    __extends(Pkcs11SignData, _super);
    function Pkcs11SignData(slot_id, cert_id, algorithm_reference, data, pin, pace) {
        var _this = _super.call(this, pin, pace) || this;
        _this.slot_id = slot_id;
        _this.cert_id = cert_id;
        _this.algorithm_reference = algorithm_reference;
        _this.data = data;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return Pkcs11SignData;
}(AuthenticateOrSignData));
export { Pkcs11SignData };
var Pkcs11VerifySignedData = (function (_super) {
    __extends(Pkcs11VerifySignedData, _super);
    function Pkcs11VerifySignedData(slot_id, cert_id, algorithm_reference, data, signature, pin, pace) {
        var _this = _super.call(this, slot_id, cert_id, algorithm_reference, data, pin, pace) || this;
        _this.slot_id = slot_id;
        _this.cert_id = cert_id;
        _this.algorithm_reference = algorithm_reference;
        _this.data = data;
        _this.signature = signature;
        _this.pin = pin;
        _this.pace = pace;
        return _this;
    }
    return Pkcs11VerifySignedData;
}(Pkcs11SignData));
export { Pkcs11VerifySignedData };
var Pkcs11TokenInfo = (function () {
    function Pkcs11TokenInfo(slot_id, label, manufacturer_id, model, serial_number, flags, max_session_count, session_count, max_rw_session_count, rw_session_count, max_pin_length, min_pin_length, total_public_memory, free_public_memory, total_private_memory, free_private_memory, hardware_version, firmware_version) {
        this.slot_id = slot_id;
        this.label = label;
        this.manufacturer_id = manufacturer_id;
        this.model = model;
        this.serial_number = serial_number;
        this.flags = flags;
        this.max_session_count = max_session_count;
        this.session_count = session_count;
        this.max_rw_session_count = max_rw_session_count;
        this.rw_session_count = rw_session_count;
        this.max_pin_length = max_pin_length;
        this.min_pin_length = min_pin_length;
        this.total_public_memory = total_public_memory;
        this.free_public_memory = free_public_memory;
        this.total_private_memory = total_private_memory;
        this.free_private_memory = free_private_memory;
        this.hardware_version = hardware_version;
        this.firmware_version = firmware_version;
    }
    return Pkcs11TokenInfo;
}());
export { Pkcs11TokenInfo };
var Pkcs11TokenResponse = (function (_super) {
    __extends(Pkcs11TokenResponse, _super);
    function Pkcs11TokenResponse(data, success) {
        var _this = _super.call(this, data, success) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return Pkcs11TokenResponse;
}(DataObjectResponse));
export { Pkcs11TokenResponse };
var Pkcs11ModuleConfig = (function () {
    function Pkcs11ModuleConfig(linux, mac, win) {
        this.linux = linux;
        this.mac = mac;
        this.win = win;
    }
    return Pkcs11ModuleConfig;
}());
export { Pkcs11ModuleConfig };
//# sourceMappingURL=pkcs11Model.js.map