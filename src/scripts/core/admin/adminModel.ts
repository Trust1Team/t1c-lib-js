
import { T1CResponse } from '../service/CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';


export interface AbstractAdmin {
    getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
}

export class PubKeyResponse implements T1CResponse {
    constructor(public data: PubKeys, public success: boolean) {}
}

// TODO typings for ds
export class PubKeys {
    constructor(public device: string, public ssl: string, public ds?: any) {}
}
