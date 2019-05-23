import {GenericContainer} from '../GenericContainer';
import {AbstractWacom, WacomDevice, WacomGetDevicesResponse, WacomSignDataRequest, WacomSignDataResponse} from './WacomModel';
import {LocalConnection} from '../../..';

export class Wacom extends GenericContainer implements AbstractWacom {
    static CONTAINER_PREFIX = 'ssh';
    static GET = '/get-key';
    static DEVICES = '/devices';
    static SIGN = '/sign';

    getDevices(callback?: () => void): Promise<WacomGetDevicesResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(Wacom.DEVICES), undefined, undefined, callback);
    }

    signData(body: WacomSignDataRequest, callback?: () => void): Promise<WacomSignDataResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Wacom.SIGN), body, undefined, undefined, callback);
    }
}
