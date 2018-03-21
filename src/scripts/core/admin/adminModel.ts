/**
 * @author Maarten Somers
 * @since 2018
 */

import { DataArrayResponse, T1CResponse } from '../service/CoreModel';
import { DSContainer } from '../ds/DSClientModel';
import { RestException } from '../exceptions/CoreExceptions';

export { AbstractAdmin, AtrListRequest, PubKeys, PubKeyResponse, SetPubKeyRequest, ContainerSyncRequest };


interface AbstractAdmin {
    activate(callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    atr(atrList: AtrListRequest, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfile(name: string, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfileList(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    getPubKey(callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest,
              callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest,
                          callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>
}

class AtrListRequest {
    constructor(public hash: string, public storagePath: string) {}
}

class SetPubKeyRequest {
    constructor(public encryptedPublicKey: string, public encryptedAesKey: string) {}
}

class PubKeyResponse implements T1CResponse {
    constructor(public data: PubKeys, public success: boolean) {}
}

class PubKeys {
    constructor(public device: string, public ssl: string, public ds?: string) {}
}

class ContainerSyncRequest {
    constructor(public containerResponses: DSContainer[]) {}
}