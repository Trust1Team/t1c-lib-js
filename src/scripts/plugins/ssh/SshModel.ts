import {DataObjectResponse, T1CLibException} from '../../..';


export interface AbstractSsh {
    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse>;
    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse>;
    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse>;
    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse>;
    openTunnel(request: OpenTunnelRequest, callback?: (error: T1CLibException, data: OpenTunnelResponse) => void): Promise<OpenTunnelResponse>;
    closeTunnel(request: CloseTunnelRequest, callback?: (error: T1CLibException, data: CloseTunnelResponse) => void): Promise<CloseTunnelResponse>;
    freePort(callback?: (error: T1CLibException, data: FreePortResponse) => void): Promise<FreePortResponse>;
}

export class SshKey {
    constructor(public name: string,
                public private_key: string,
                public public_key: string) {}
}

export class RemoveKeyRequest {
    constructor(public name: string) {}
}

export class OpenTunnelRequest {
    constructor(
        public ssh_mediator_host: string,
        public ssh_mediator_username: string,
        public ssh_mediator_port: number,
        public remote_port: number,
        public local_port: number,
        public timeout: number,
        public private_key_path: string
    ) {}
}

export class CloseTunnelRequest {
    constructor(
        public port: number
    ) {}
}

export class GetKeyRequest {
    constructor(public name: string) {}
}


export class CreateKeyRequest {
    constructor(public name: string, public key_size: number) {}
}


export class FreePortResponse {
    constructor(public data: number, public success: boolean) {}
}

export class OpenTunnelResponse {
    constructor(public data: number, public success: boolean) {}
}

export class CloseTunnelResponse {
    constructor(public data: boolean, public success: boolean) {}
}

export class GetAllKeysResponse extends DataObjectResponse {
    constructor(public data: SshKey[], public success: boolean) {
        super(data, success);
    }
}


export class GetUserKeyResponse extends DataObjectResponse {
    constructor(public data: SshKey, public success: boolean) {
        super(data, success);
    }
}

export class CreateKeyResponse extends DataObjectResponse {
    constructor(public data: SshKey, public success: boolean) {
        super(data, success);
    }
}

export class RemoveKeyResponse {
    constructor(public data: boolean, public success: boolean) {
    }
}