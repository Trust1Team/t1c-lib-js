import { RemoteApiKeyConnection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { AbstractAuth } from './AuthModel';
import { JWTResponse } from '../ds/DSClientModel';
export { AuthClient };
declare class AuthClient implements AbstractAuth {
    private cfg;
    private connection;
    private url;
    constructor(cfg: GCLConfig, connection: RemoteApiKeyConnection);
    getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    refreshJWT(currentJWT: string, callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse>;
}
