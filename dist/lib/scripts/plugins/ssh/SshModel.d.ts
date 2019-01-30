import { DataObjectResponse, T1CLibException } from '../../..';
export interface AbstractSsh {
    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse>;
    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse>;
    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse>;
    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse>;
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
export declare class GetKeyRequest {
    name: string;
    constructor(name: string);
}
export declare class CreateKeyRequest {
    name: string;
    key_size: number;
    constructor(name: string, key_size: number);
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
