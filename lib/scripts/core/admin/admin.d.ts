import { LocalAdminConnection, LocalAuthAdminConnection } from '../client/Connection';
import { AbstractAdmin, PubKeyResponse, SetPubKeyRequest } from './adminModel';
import { T1CLibException } from '../exceptions/CoreExceptions';
export declare class AdminService implements AbstractAdmin {
    private url;
    private connection;
    private noAuthConnection;
    static JWT_ERROR_CODES: string[];
    constructor(url: string, connection: LocalAuthAdminConnection, noAuthConnection: LocalAdminConnection);
    private static errorHandler;
    getPubKey(callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    setPubKey(keys: SetPubKeyRequest, callback?: (error: T1CLibException, data: PubKeyResponse) => void): Promise<PubKeyResponse>;
    private getPubKeys;
    private post;
    private put;
}
