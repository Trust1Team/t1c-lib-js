import { GenericContainer } from '../GenericContainer';
import { AbstractWacom, WacomGetDevicesResponse, WacomSignDataRequest, WacomSignDataResponse, WacomSystemInfoResponse } from './WacomModel';
import { LocalConnection } from '../../..';
export declare class Wacom extends GenericContainer implements AbstractWacom {
    static CONTAINER_PREFIX: string;
    static GET: string;
    static DEVICES: string;
    static SIGN: string;
    static SYSTEM_INFO: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, containerPrefix: string);
    getDevices(callback?: () => void): Promise<WacomGetDevicesResponse>;
    signData(body: WacomSignDataRequest, callback?: () => void): Promise<WacomSignDataResponse>;
    systemInfo(callback?: () => void): Promise<WacomSystemInfoResponse>;
}
