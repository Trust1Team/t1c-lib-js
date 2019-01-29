import { LocalConnection, T1CLibException } from '../../..';
import { GenericContainer } from '../GenericContainer';
import { AbstractSsh, CreateKeyRequest, CreateKeyResponse, GetAllKeysResponse, GetKeyRequest, GetUserKeyResponse, RemoveKeyRequest, RemoveKeyResponse } from './SshModel';
export declare class Ssh extends GenericContainer implements AbstractSsh {
    static CONTAINER_PREFIX: string;
    static ALL: string;
    static GET: string;
    static ADD: string;
    static REMOVE: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, containerPrefix: string);
    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse>;
    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse>;
    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse>;
    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse>;
}
