import { DataObjectResponse, T1CLibException } from '../../..';
export interface AbstractSsh {
    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse>;
    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse>;
    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse>;
    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse>;
    openTunnel(request: OpenTunnelRequest, callback?: (error: T1CLibException, data: OpenTunnelResponse) => void): Promise<OpenTunnelResponse>;
    closeTunnel(request: CloseTunnelRequest, callback?: (error: T1CLibException, data: CloseTunnelResponse) => void): Promise<CloseTunnelResponse>;
    freePort(callback?: (error: T1CLibException, data: FreePortResponse) => void): Promise<FreePortResponse>;
}
export declare class SshKey {
    name: string;
    private_key: string;
    public_key: string;
    constructor(name: string, private_key: string, public_key: string);
}
export declare class RemoveKeyRequest {
    name: string;
    constructor(name: string);
}
export declare class OpenTunnelRequest {
    ssh_mediator_host: string;
    ssh_mediator_username: string;
    ssh_mediator_port: number;
    remote_port: number;
    local_port: number;
    timeout: number;
    private_key_path: string;
    constructor(ssh_mediator_host: string, ssh_mediator_username: string, ssh_mediator_port: number, remote_port: number, local_port: number, timeout: number, private_key_path: string);
}
export declare class CloseTunnelRequest {
    port: number;
    constructor(port: number);
}
export declare class GetKeyRequest {
    name: string;
    constructor(name: string);
}
export declare class CreateKeyRequest {
    name: string;
    key_size: number;
    constructor(name: string, key_size: number);
}
export declare class FreePortResponse {
    data: number;
    success: boolean;
    constructor(data: number, success: boolean);
}
export declare class OpenTunnelResponse {
    data: number;
    success: boolean;
    constructor(data: number, success: boolean);
}
export declare class CloseTunnelResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
export declare class GetAllKeysResponse extends DataObjectResponse {
    data: SshKey[];
    success: boolean;
    constructor(data: SshKey[], success: boolean);
}
export declare class GetUserKeyResponse extends DataObjectResponse {
    data: SshKey;
    success: boolean;
    constructor(data: SshKey, success: boolean);
}
export declare class CreateKeyResponse extends DataObjectResponse {
    data: SshKey;
    success: boolean;
    constructor(data: SshKey, success: boolean);
}
export declare class RemoveKeyResponse {
    data: boolean;
    success: boolean;
    constructor(data: boolean, success: boolean);
}
