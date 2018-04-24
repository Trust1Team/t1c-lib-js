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
    setPubKey(keys: SetPubKeyRequest, callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
}
declare class AtrListRequest {
    hash: string;
    storagePath: string;
    constructor(hash: string, storagePath: string);
}
declare class SetPubKeyRequest {
    encryptedPublicKey: string;
    encryptedAesKey: string;
    constructor(encryptedPublicKey: string, encryptedAesKey: string);
}
declare class PubKeyResponse implements T1CResponse {
    data: PubKeys;
    success: boolean;
    constructor(data: PubKeys, success: boolean);
}
declare class PubKeys {
    device: string;
    ssl: string;
    ds: string;
    constructor(device: string, ssl: string, ds?: string);
}
declare class ContainerSyncRequest {
    containerResponses: DSContainer[];
    constructor(containerResponses: DSContainer[]);
}
