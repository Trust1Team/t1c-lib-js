import {CloseTunnelRequest, CloseTunnelResponse, FreePortResponse, LocalConnection, OpenTunnelRequest, OpenTunnelResponse, T1CLibException} from '../../..';
import {GenericContainer} from '../GenericContainer';
import {AbstractSsh, CreateKeyRequest, CreateKeyResponse, GetAllKeysResponse, GetKeyRequest, GetUserKeyResponse, RemoveKeyRequest, RemoveKeyResponse} from './SshModel';


export class Ssh extends GenericContainer implements AbstractSsh {
    static CONTAINER_PREFIX = 'ssh';
    static ALL = '/get-keys';
    static GET = '/get-key';
    static ADD = '/create-key';
    static REMOVE = '/remove-key';
    static OPEN_TUNNEL = '/open-ssh-tunnel';
    static CLOSE_TUNNEL = '/close-ssh-tunnel';
    static FREE_PORT = '/free-port';


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection, containerPrefix: string) {
        super(baseUrl, containerUrl, connection, containerPrefix);
    }

    add(request: CreateKeyRequest, callback?: (error: T1CLibException, data: CreateKeyResponse) => void): Promise<CreateKeyResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.ADD), request , undefined, undefined, callback);
    }

    all(callback?: (error: T1CLibException, data: GetAllKeysResponse) => void): Promise<GetAllKeysResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(Ssh.ALL), undefined, undefined, callback);
    }

    get(request: GetKeyRequest, callback?: (error: T1CLibException, data: GetUserKeyResponse) => void): Promise<GetUserKeyResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.GET), request , undefined, undefined, callback);
    }

    remove(request: RemoveKeyRequest, callback?: (error: T1CLibException, data: RemoveKeyResponse) => void): Promise<RemoveKeyResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.REMOVE), request , undefined, undefined, callback);
    }

    closeTunnel(request: CloseTunnelRequest, callback?: (error: T1CLibException, data: CloseTunnelResponse) => void): Promise<CloseTunnelResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.CLOSE_TUNNEL), request , undefined, undefined, callback);
    }

    openTunnel(request: OpenTunnelRequest, callback?: (error: T1CLibException, data: OpenTunnelResponse) => void): Promise<OpenTunnelResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(Ssh.OPEN_TUNNEL), request , undefined, undefined, callback);
    }

    freePort(callback?: (error: T1CLibException, data: FreePortResponse) => void): Promise<FreePortResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(Ssh.FREE_PORT), undefined, undefined, callback);
    }
}
