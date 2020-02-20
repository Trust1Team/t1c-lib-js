import { T1CResponse } from '../service/CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export interface AbstractAdmin {
    getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
}
export declare class PubKeyResponse implements T1CResponse {
    data: PubKeys;
    success: boolean;
    constructor(data: PubKeys, success: boolean);
}
export declare class PubKeys {
    device: string;
    ssl: string;
    ds?: any;
    constructor(device: string, ssl: string, ds?: any);
}
