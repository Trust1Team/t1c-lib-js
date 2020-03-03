import { T1CResponse } from '../service/CoreModel';
import { DSContainer } from '../ds/DSClientModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export interface AbstractAdmin {
    getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest, callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
}
export declare class AtrListRequest {
    hash: string;
    storagePath: string;
    constructor(hash: string, storagePath: string);
}
export declare class SetPubKeyRequest {
    encryptedPublicKey: string;
    encryptedAesKey: string;
    ns: string;
    constructor(encryptedPublicKey: string, encryptedAesKey: string, ns: string);
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
export declare class ContainerSyncRequest {
    containerResponses: DSContainer[];
    constructor(containerResponses: DSContainer[]);
}
export declare class ResolvedAgent {
    hostname?: string;
    challenge?: string;
    last_update?: string;
    metadata?: any;
    port?: number;
    type?: string;
    username?: string;
    constructor(hostname?: string, challenge?: string, last_update?: string, metadata?: any, port?: number, type?: string, username?: string);
}
export interface ResolvedAgentResponse extends T1CResponse {
    data: ResolvedAgent[];
}
