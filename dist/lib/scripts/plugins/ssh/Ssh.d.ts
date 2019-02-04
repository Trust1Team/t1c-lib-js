import { CloseTunnelRequest, CloseTunnelResponse, LocalConnection, OpenTunnelRequest, OpenTunnelResponse, T1CLibException } from '../../..';
import { GenericContainer } from '../GenericContainer';
import { AbstractSsh, CreateKeyRequest, CreateKeyResponse, GetAllKeysResponse, GetKeyRequest, GetUserKeyResponse, RemoveKeyRequest, RemoveKeyResponse } from './SshModel';
export declare class Ssh extends GenericContainer implements AbstractSsh {
    static CONTAINER_PREFIX: string;
    static ALL: string;
    static GET: string;
    static ADD: string;
    static REMOVE: string;
    static OPEN_TUNNEL: string;
    static CLOSE_TUNNEL: string;
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, containerPrefix: string);
    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse>;
    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse>;
    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse>;
    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse>;
    closeTunnel(request: CloseTunnelRequest, callback?: (error: T1CLibException, data: CloseTunnelResponse) => void): Promise<CloseTunnelResponse>;
    openTunnel(request: OpenTunnelRequest, callback?: (error: T1CLibException, data: OpenTunnelResponse) => void): Promise<OpenTunnelResponse>;
}
