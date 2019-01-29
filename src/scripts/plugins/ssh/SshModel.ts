import {DataObjectResponse, T1CLibException} from '../../..';


export interface AbstractSsh {
    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse>;
    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse>;
    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse>;
    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse>;
}

export class SshKey {
    constructor(public name: string,
                public private_key: string,
                public public_key: string) {}
}

export class RemoveKeyRequest {
    constructor(public name: string) {}
}

export class GetKeyRequest {
    constructor(public name: string) {}
}

export class CreateKeyRequest {
    constructor(public name: string, public key_size: number) {}
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