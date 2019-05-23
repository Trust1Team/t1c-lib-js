import { GenericContainer } from '../GenericContainer';
import { AbstractWacom, WacomGetDevicesResponse, WacomSignDataRequest, WacomSignDataResponse } from './WacomModel';
export declare class Wacom extends GenericContainer implements AbstractWacom {
    static CONTAINER_PREFIX: string;
    static GET: string;
    static DEVICES: string;
    static SIGN: string;
    getDevices(callback?: () => void): Promise<WacomGetDevicesResponse>;
    signData(body: WacomSignDataRequest, callback?: () => void): Promise<WacomSignDataResponse>;
}
