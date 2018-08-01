import { CertificatesResponse, DataObjectResponse, T1CCertificate } from '../../../core/service/CoreModel';
import { AuthenticateOrSignData } from '../Card';
export class Pkcs11InfoResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class Pkcs11Info {
    constructor(cryptoki_version, manufacturer_id, flags, library_description, library_version) {
        this.cryptoki_version = cryptoki_version;
        this.manufacturer_id = manufacturer_id;
        this.flags = flags;
        this.library_description = library_description;
        this.library_version = library_version;
    }
}
export class Pkcs11Slot {
    constructor(slot_id, description, flags, hardware_version, firmware_version) {
        this.slot_id = slot_id;
        this.description = description;
        this.flags = flags;
        this.hardware_version = hardware_version;
        this.firmware_version = firmware_version;
    }
}
export class Pkcs11SlotsResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class Pkcs11Certificate extends T1CCertificate {
    constructor(id, base64, parsed) {
        super(base64, id, parsed);
        this.id = id;
        this.base64 = base64;
        this.parsed = parsed;
    }
}
export class Pkcs11CertificatesResponse extends CertificatesResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class Pkcs11SignData extends AuthenticateOrSignData {
    constructor(slot_id, cert_id, algorithm_reference, data, pin, pace) {
        super(pin, pace);
        this.slot_id = slot_id;
        this.cert_id = cert_id;
        this.algorithm_reference = algorithm_reference;
        this.data = data;
        this.pin = pin;
        this.pace = pace;
    }
}
export class Pkcs11VerifySignedData extends Pkcs11SignData {
    constructor(slot_id, cert_id, algorithm_reference, data, signature, pin, pace) {
        super(slot_id, cert_id, algorithm_reference, data, pin, pace);
        this.slot_id = slot_id;
        this.cert_id = cert_id;
        this.algorithm_reference = algorithm_reference;
        this.data = data;
        this.signature = signature;
        this.pin = pin;
        this.pace = pace;
    }
}
export class Pkcs11TokenInfo {
    constructor(slot_id, label, manufacturer_id, model, serial_number, flags, max_session_count, session_count, max_rw_session_count, rw_session_count, max_pin_length, min_pin_length, total_public_memory, free_public_memory, total_private_memory, free_private_memory, hardware_version, firmware_version) {
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
}
export class Pkcs11TokenResponse extends DataObjectResponse {
    constructor(data, success) {
        super(data, success);
        this.data = data;
        this.success = success;
    }
}
export class Pkcs11ModuleConfig {
    constructor(linux, mac, win) {
        this.linux = linux;
        this.mac = mac;
        this.win = win;
    }
}
//# sourceMappingURL=pkcs11Model.js.map