import { GCLConfig } from '../GCLConfig';
export { GenericConnection, LocalConnection, LocalAuthConnection, RemoteApiKeyConnection, RemoteJwtConnection, Connection, LocalTestConnection, RequestBody, RequestHeaders, RequestCallback, SecurityConfig, QueryParams };
interface Connection {
    get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
}
interface RequestBody {
    [key: string]: any;
}
interface QueryParams {
    [key: string]: any;
}
interface RequestHeaders {
    [key: string]: string;
}
interface RequestCallback {
    (error: any, data: any): void;
}
interface SecurityConfig {
    sendGwJwt: boolean;
    sendGclJwt: boolean;
    sendApiKey: boolean;
    sendToken: boolean;
    skipCitrixCheck: boolean;
}
declare abstract class GenericConnection implements Connection {
    cfg: GCLConfig;
    static readonly AUTH_TOKEN_HEADER: string;
    static readonly BROWSER_AUTH_TOKEN: string;
    static readonly RELAY_STATE_HEADER_PREFIX: string;
    constructor(cfg: GCLConfig);
    private static disabledWithoutApiKey(callback);
    private static extractAccessToken(headers, config);
    get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    protected handleRequest(basePath: string, suffix: string, method: string, gclConfig: GCLConfig, securityConfig: SecurityConfig, body?: RequestBody, params?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
}
declare class LocalAuthConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getSecurityConfig(): SecurityConfig;
    getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any>;
}
declare class LocalConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    requestFile(basePath: string, suffix: string, body: {
        path: string;
    }, callback?: RequestCallback): Promise<any>;
    putFile(basePath: string, suffix: string, body: RequestBody, queryParams: QueryParams, callback?: RequestCallback): Promise<any>;
}
declare class RemoteApiKeyConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getSecurityConfig(): SecurityConfig;
}
declare class RemoteJwtConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getSecurityConfig(): SecurityConfig;
}
declare class LocalTestConnection extends GenericConnection implements Connection {
    config: any;
    get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    private handleTestRequest(basePath, suffix, method, gclConfig, body?, params?, headers?, callback?);
}
