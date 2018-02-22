/**
 * @author Maarten Somers
 * @since 2018
 */

import * as CoreExceptions from '../exceptions/CoreExceptions';
import { T1CResponse } from '../service/CoreModel';
import { DSContainer } from '../ds/DSClientModel';

export { AbstractAdmin, PubKeys, PubKeyResponse, SetPubKeyRequest, ContainerSyncRequest };


interface AbstractAdmin {
    activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest,
              callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest,
                          callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>
}

class SetPubKeyRequest {
    constructor(public encryptedPublicKey: string, public encryptedAesKey: string) {}
}

class PubKeyResponse implements T1CResponse {
    constructor(public data: PubKeys, public success: boolean) {}
}

class PubKeys {
    constructor(public device: string, public ssl: string) {}
}

class ContainerSyncRequest {
    constructor(public containerResponses: DSContainer[]) {}
}