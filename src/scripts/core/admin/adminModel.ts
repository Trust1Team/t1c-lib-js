/**
 * @author Maarten Somers
 * @since 2018
 */

import {DataArrayResponse, T1CResponse} from '../service/CoreModel';
import { DSContainer } from '../ds/DSClientModel';
import { RestException } from '../exceptions/CoreExceptions';
import {Agent} from '../agent/agentModel';

export { AbstractAdmin, AtrListRequest, PubKeys, PubKeyResponse, SetPubKeyRequest, ContainerSyncRequest, ResolvedAgent, ResolvedAgentResponse };


interface AbstractAdmin {
    activate(callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    atr(atrList: AtrListRequest, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfile(name: string, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfileList(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    getPubKey(callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest,
              callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest,
                          callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    // resolve agent
    resolveAgent(challenge: string, callback?: (error: RestException, data: ResolvedAgentResponse) => void): Promise<ResolvedAgentResponse>;
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

class ResolvedAgent {
    constructor(public hostname?: string, public challenge?: string, public last_update?: string, public metadata?: any, public port?: number, public type?: string, public username?: string) {}
}

interface ResolvedAgentResponse extends T1CResponse {
    data: ResolvedAgent[]
}
