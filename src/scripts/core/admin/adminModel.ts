/**
 * @author Maarten Somers
 * @since 2018
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';
import { T1CResponse } from '../service/CoreModel';

export { AbstractAdmin, PubKeyResponse };


interface AbstractAdmin {
    // async
    activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    // TODO improve data typing
    activateGcl(data: any, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(pubkey: string,
              callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    // TODO improve data typing
    updateContainerConfig(config: any, callback?: (error: CoreExceptions.RestException, data: any) => void): Promise<any>
}

interface PubKeyResponse extends T1CResponse {
    data: string
}
