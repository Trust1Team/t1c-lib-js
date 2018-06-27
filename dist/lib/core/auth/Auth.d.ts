import { RemoteApiKeyConnection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import { AbstractAuth } from './AuthModel';
import { RestException } from '../exceptions/CoreExceptions';
import { DSJWTResponse } from '../ds/DSClientModel';
export declare class AuthClient implements AbstractAuth {
    private cfg;
    private connection;
    private url;
    constructor(cfg: GCLConfig, connection: RemoteApiKeyConnection);
    getJWT(callback?: (error: RestException, data: DSJWTResponse) => void): Promise<DSJWTResponse>;
    refreshJWT(currentJWT: string, callback?: (error: RestException, data: DSJWTResponse) => void): Promise<DSJWTResponse>;
}
