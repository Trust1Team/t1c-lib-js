/**
 * @author Maarten Somers
 * @since 2018
 */
import { RemoteJwtConnection } from '../client/Connection';
import { GCLConfig } from '../GCLConfig';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { Promise } from 'es6-promise';
import { AbstractAuth } from './AuthModel';
import { JWTResponse } from '../ds/DSClientModel';

export { AuthClient };


const TOKEN = '/login/application/token';
const REFRESH = '/login/token/refresh';


class AuthClient implements AbstractAuth {
    private url;

    constructor(private cfg: GCLConfig, private connection: RemoteJwtConnection) {
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
