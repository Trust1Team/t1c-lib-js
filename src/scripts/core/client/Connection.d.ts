/// <reference path="../../../../typings/index.d.ts" />
import { GCLConfig } from "../GCLConfig";
import { RestException } from "../exceptions/CoreExceptions";
export { LocalConnection, LocalAuthConnection, RemoteConnection, Connection, LocalTestConnection };
interface Connection {
    get(url: string, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    post(url: string, body: {
        [key: string]: any;
    }, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    put(url: string, body: {
        [key: string]: any;
    }, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
}
declare class LocalAuthConnection implements Connection {
    private cfg;
    constructor(cfg: GCLConfig);
    get(url: string, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    post(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    put(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
}
declare class LocalConnection implements Connection {
    private cfg;
    constructor(cfg: GCLConfig);
    get(url: string, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    post(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    put(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
}
declare class RemoteConnection implements Connection {
    private cfg;
    constructor(cfg: GCLConfig);
    get(url: string, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    post(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    put(url: string, body: any, callback: (error: any, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
}
declare class LocalTestConnection implements Connection {
    private cfg;
    constructor(cfg: GCLConfig);
    get(url: string, callback: (error: RestException, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    post(url: string, body: any, callback: (error: RestException, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
    put(url: string, body: any, callback: (error: RestException, data: any) => void, queryParams?: {
        [key: string]: string;
    }): void;
}
