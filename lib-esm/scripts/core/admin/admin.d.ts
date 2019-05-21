import { LocalAdminConnection, LocalAuthAdminConnection } from '../client/Connection';
import { AbstractAdmin, AtrListRequest, ContainerSyncRequest, PubKeyResponse, ResolvedAgentResponse, SetPubKeyRequest } from './adminModel';
import { DataArrayResponse, T1CResponse } from '../service/CoreModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export declare class AdminService implements AbstractAdmin {
    private url;
    private connection;
    private noAuthConnection;
    static JWT_ERROR_CODES: string[];
    constructor(url: string, connection: LocalAuthAdminConnection, noAuthConnection: LocalAdminConnection);
    private static errorHandler;
    activate(callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    atr(atrList: AtrListRequest, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfile(name: string, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfileList(callback?: (error: T1CLibException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest, callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest, callback?: (error: T1CLibException, data: T1CResponse) => void): Promise<T1CResponse>;
    resolveAgent(challenge: string, callback?: (error: T1CLibException, data: ResolvedAgentResponse) => void): Promise<ResolvedAgentResponse>;
    private getLogfiles;
    private getPubKeys;
    private getLogFile;
    private post;
    private put;
}
