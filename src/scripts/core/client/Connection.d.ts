/// <reference path="../../../../typings/index.d.ts" />
import { GCLConfig } from "../GCLConfig";
export { GenericConnection, LocalConnection, LocalAuthConnection, RemoteConnection, Connection, LocalTestConnection };
interface Connection {
    get(url: string, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
    post(url: string, body: {
        [key: string]: any;
    }, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
    put(url: string, body: {
        [key: string]: any;
    }, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
}
declare abstract class GenericConnection implements Connection {
    abstract config: any;
    constructor(cfg: GCLConfig);
    get(url: string, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
    post(url: string, body: any, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
    put(url: string, body: any, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
}
declare class LocalAuthConnection extends GenericConnection implements Connection {
    config: any;
    constructor(cfg: GCLConfig);
}
declare class LocalConnection extends GenericConnection implements Connection {
    protected cfg: GCLConfig;
    config: any;
    constructor(cfg: GCLConfig);
}
declare class RemoteConnection extends GenericConnection implements Connection {
    protected cfg: GCLConfig;
    config: any;
    constructor(cfg: GCLConfig);
}
declare class LocalTestConnection extends GenericConnection implements Connection {
    config: any;
    get(url: string, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
    post(url: string, body: any, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
    put(url: string, body: any, queryParams?: {
        [key: string]: string;
    }, callback?: (error: any, data: any) => void): void | Promise<any>;
}
