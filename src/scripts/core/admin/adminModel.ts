/**
 * @author Maarten Somers
 * @since 2018
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';
import { T1CResponse } from '../service/CoreModel';

export { AbstractAdmin, PubKeys, PubKeyResponse };


interface AbstractAdmin {
    // async
    // TODO improve data typing
    activate(data: any, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(pubkey: string,
              callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    // TODO improve data typing
    updateContainerConfig(config: any, callback?: (error: CoreExceptions.RestException, data: any) => void): Promise<any>
}

class PubKeyResponse implements T1CResponse {
    constructor(public data: PubKeys, public success: boolean) {}
}

class PubKeys {
    constructor(public device: string, public ssl: string) {}
}