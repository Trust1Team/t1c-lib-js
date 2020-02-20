import { GCLConfig } from '../GCLConfig';
export interface Connection {
    get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
}
export interface RequestBody {
    [key: string]: any;
}
export interface QueryParams {
    [key: string]: any;
}
export interface RequestHeaders {
    [key: string]: string;
}
export interface RequestCallback {
    (error: any, data: any): void;
}
export interface SecurityConfig {
    sendGwJwt: boolean;
    sendGclJwt: boolean;
    sendApiKey: boolean;
    sendToken: boolean;
    skipCitrixCheck: boolean;
}
export declare abstract class GenericConnection implements Connection {
    cfg: GCLConfig;
    static readonly AUTH_TOKEN_HEADER = "X-Authentication-Token";
    static readonly BROWSER_AUTH_TOKEN = "t1c-js-browser-id-token";
    static readonly RELAY_STATE_HEADER_PREFIX = "X-Relay-State-";
    static readonly HEADER_GCL_LANG = "X-Language-Code";
    constructor(cfg: GCLConfig);
    private static disabledWithoutApiKey;
    private static extractAccessToken;
    get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    protected handleRequest(basePath: string, suffix: string, method: string, gclConfig: GCLConfig, securityConfig: SecurityConfig, body?: RequestBody, params?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
}
export declare class LocalAdminConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getSecurityConfig(): SecurityConfig;
}
export declare class LocalAuthAdminConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any>;
}
export declare class LocalAuthConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    postSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, body?: RequestBody, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    requestLogFile(basePath: string, suffix: string, callback?: RequestCallback): Promise<any>;
}
export declare class LocalConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    getSecurityConfig(): SecurityConfig;
    getSkipCitrix(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    requestFile(basePath: string, suffix: string, body: {
        entity: string;
        type: string;
        filename: string;
        rel_path: string[];
        notify_on_completion: boolean;
    }, callback?: RequestCallback): Promise<any>;
    postFile(basePath: string, suffix: string, body: RequestBody, queryParams: QueryParams, callback?: RequestCallback): Promise<any>;
}
export declare class RemoteApiKeyConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getSecurityConfig(): SecurityConfig;
}
export declare class RemoteJwtConnection extends GenericConnection implements Connection {
    cfg: GCLConfig;
    constructor(cfg: GCLConfig);
    getSecurityConfig(): SecurityConfig;
}
export declare class LocalTestConnection extends GenericConnection implements Connection {
    config: any;
    get(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    post(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    put(basePath: string, suffix: string, body: RequestBody, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    delete(basePath: string, suffix: string, queryParams?: QueryParams, headers?: RequestHeaders, callback?: RequestCallback): Promise<any>;
    getRequestHeaders(headers: RequestHeaders): RequestHeaders;
    private handleTestRequest;
}
