/**
 * @author Maarten Somers
 * @since 2018
 */

import {DataArrayResponse, T1CResponse} from '../service/CoreModel';
import { DSContainer } from '../ds/DSClientModel';
import { T1CLibException } from '../exceptions/CoreExceptions';


export interface AbstractAdmin {
    activate(callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    atr(atrList: AtrListRequest, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfile(name: string, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfileList(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest,
              callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest,
                          callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    // resolve agent
    resolveAgent(challenge: string, callback?: (error: T1CLibException, data: ResolvedAgentResponse) => void): Promise<ResolvedAgentResponse>;
}

export class AtrListRequest {
    constructor(public hash: string, public storagePath: string) {}
}

export class SetPubKeyRequest {
    constructor(public encryptedPublicKey: string, public encryptedAesKey: string, public ns: string) {}
}

export class PubKeyResponse implements T1CResponse {
    constructor(public data: PubKeys, public success: boolean) {}
}

// TODO typings for ds
export class PubKeys {
    constructor(public device: string, public ssl: string, public ds?: any) {}
}

export class ContainerSyncRequest {
    constructor(public containerResponses: DSContainer[]) {}
}

export class ResolvedAgent {
    constructor(public hostname?: string, public challenge?: string, public last_update?: string, public metadata?: any, public port?: number, public type?: string, public username?: string) {}
}

export interface ResolvedAgentResponse extends T1CResponse {
    data: ResolvedAgent[]
}
