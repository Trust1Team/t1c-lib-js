import {RemoteApiKeyConnection} from '../client/Connection';
import {GCLConfig} from '../GCLConfig';
import {AbstractAuth} from './AuthModel';
import {T1CLibException} from '../exceptions/CoreExceptions';
import {DSJWTResponse} from '../ds/DSClientModel';


const TOKEN = '/login/application/token';
const REFRESH = '/login/token/refresh';

/**
 * Methods for API Gateway JWT token retrieval/refreshing
 */
export class AuthClient implements AbstractAuth {
    private url;

    constructor(private cfg: GCLConfig, private connection: RemoteApiKeyConnection) {
        this.url = cfg.authUrl;
    }

    public getJWT(callback?: (error: T1CLibException, data: DSJWTResponse) => void): Promise<DSJWTResponse> {
        return this.connection.get(this.url, TOKEN, undefined, undefined, callback);
    }

    public refreshJWT(currentJWT: string,
                      callback?: (error: T1CLibException, data: DSJWTResponse) => void): Promise<DSJWTResponse> {
        return this.connection.post(this.url, REFRESH, {token: currentJWT}, undefined, undefined, callback);
    }
}
