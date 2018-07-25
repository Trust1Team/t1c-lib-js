import { LocalAuthAdminConnection } from '../client/Connection';
import { AbstractAdmin, AtrListRequest, ContainerSyncRequest, PubKeyResponse, ResolvedAgentResponse, SetPubKeyRequest } from './adminModel';
import { DataArrayResponse, T1CResponse } from '../service/CoreModel';
import { RestException } from '../exceptions/CoreExceptions';
export declare class AdminService implements AbstractAdmin {
    private url;
    private connection;
    static JWT_ERROR_CODES: string[];
    constructor(url: string, connection: LocalAuthAdminConnection);
    private static errorHandler;
    activate(callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    atr(atrList: AtrListRequest, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfile(name: string, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfileList(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    getPubKey(callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest, callback?: (error: RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest, callback?: (error: RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    resolveAgent(challenge: string, callback?: (error: RestException, data: ResolvedAgentResponse) => void): Promise<ResolvedAgentResponse>;
    private getLogfiles;
    private getPubKeys;
    private getLogFile;
    private post;
    private put;
}
