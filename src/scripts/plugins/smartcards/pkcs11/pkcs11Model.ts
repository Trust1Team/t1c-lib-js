/**
 * @author Maarten Somers
 */

import { RestException } from "../../../core/exceptions/CoreExceptions";
import { CertificatesResponse, T1CResponse } from "../../../core/service/CoreModel";

export { AbstractPkcs11, Pin, SlotAndPin, InfoResponse, Slot, SlotsResponse };

interface AbstractPkcs11 {
    certificates(body: SlotAndPin,
                 callback?: (error: RestException, data: CertificatesResponse) => void): Promise<CertificatesResponse>;
    info(body: Pin, callback: (error: RestException, data: InfoResponse) => void): Promise<InfoResponse>;
    slots(body: Pin, callback: (error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
    slotsWithTokenPresent(body: Pin, callback:(error: RestException, data: SlotsResponse) => void): Promise<SlotsResponse>;
}

interface Pin {
    pin: string
}
interface SlotAndPin {
    slot_id: string,
    pin: string
}

interface InfoResponse extends T1CResponse {
    data: {
        cryptoki_version: string
        manufacturer_id: string
        flags: string
        library_description: string
        library_version: string
    }
}

interface Slot {
    slot_id: string
    description: string
    flags: string
    hardware_version: string
    firmware_version: string
}

interface SlotsResponse extends T1CResponse {
    data: Slot[]
}