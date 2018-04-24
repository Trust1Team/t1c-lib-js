import { GenericConnection } from '../core/client/Connection';
export { PinEnforcer, EncryptedOptionalPin };
declare class PinEnforcer {
    static check(connection: GenericConnection, readerId: string, body: {
        pin?: string;
    }): Promise<any>;
    static checkAlreadyEncryptedPin(connection: GenericConnection, readerId: string, pin: string): Promise<any>;
    static encryptPin(pin: string): string;
    private static doPinCheck(cfg, readerId, body);
    private static updateBodyWithEncryptedPin(body);
}
declare class EncryptedOptionalPin {
    os_dialog: boolean;
    pinpad: boolean;
    pin: string;
    pace: string;
    constructor(os_dialog?: boolean, pinpad?: boolean, pin?: string, pace?: string);
}
