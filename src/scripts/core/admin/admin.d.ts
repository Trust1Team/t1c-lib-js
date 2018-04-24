import { LocalAuthConnection } from '../client/Connection';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { AbstractAdmin, AtrListRequest, ContainerSyncRequest, PubKeyResponse, SetPubKeyRequest } from './adminModel';
import { DataArrayResponse, T1CResponse } from '../service/CoreModel';
export { AdminService };
declare class AdminService implements AbstractAdmin {
    private url;
    private connection;
    static JWT_ERROR_CODES: string[];
    constructor(url: string, connection: LocalAuthConnection);
    private static errorHandler(error);
    activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    atr(atrList: AtrListRequest, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfile(name: string, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    getLogfileList(callback?: (error: CoreExceptions.RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
    getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest, callback?: (error: CoreExceptions.RestException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    updateContainerConfig(containers: ContainerSyncRequest, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse>;
    private get(url, suffix, callback?);
    private getLogFile(url, suffix, callback?);
    private post(url, suffix, body, callback?);
    private put(url, suffix, body, callback?);
}
