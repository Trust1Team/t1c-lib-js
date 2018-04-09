/**
 * @author Maarten Somers
 * @since 2018
 */
import { RemoteApiKeyConnection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { AbstractAuth } from './AuthModel';
import { JWTResponse } from '../ds/DSClientModel';

export { AuthClient };


const TOKEN = '/login/application/token';
const REFRESH = '/login/token/refresh';

/**
 * Methods for API Gateway JWT token retrieval/refreshing
 */
class AuthClient implements AbstractAuth {
    private url;

    constructor(private cfg: GCLConfig, private connection: RemoteApiKeyConnection) {
        this.url = cfg.authUrl;
    }

    public getJWT(callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse> {
        return this.connection.get(this.url, TOKEN, undefined, undefined, callback);
    }

    public refreshJWT(currentJWT: string,
                      callback?: (error: CoreExceptions.RestException, data: JWTResponse) => void): Promise<JWTResponse> {
        return this.connection.post(this.url, REFRESH, { token: currentJWT }, undefined, undefined, callback);
    }
}
