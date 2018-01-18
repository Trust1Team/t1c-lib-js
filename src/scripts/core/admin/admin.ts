/**
 * @author Maarten Somers
 * @since 2018
 */
import { LocalAuthConnection } from '../client/Connection';
import * as CoreExceptions from '../exceptions/CoreExceptions';
import { Promise } from 'es6-promise';
import { AbstractAdmin, PubKeyResponse } from './adminModel';
import { T1CResponse } from '../service/CoreModel';

export { AdminService };


const CORE_ACTIVATE = '/admin/activate';
const CORE_PUB_KEY = '/admin/certificate';
const CORE_CONTAINERS = '/admin/containers';

class AdminService implements AbstractAdmin {
    // constructor
    constructor(private url: string, private connection: LocalAuthConnection) {}

    // async
    public activate(callback?: (error: CoreExceptions.RestException, data: T1CResponse)
        => void): Promise<T1CResponse> {
        return this.connection.post(this.url, CORE_ACTIVATE, {}, undefined, callback);
    }

    public activateGcl(data: any, callback?: (error: CoreExceptions.RestException, data: T1CResponse) => void): Promise<T1CResponse> {
        return this.connection.post(this.url, CORE_ACTIVATE, data, undefined, callback);
    }

    public getPubKey(callback?: (error: CoreExceptions.RestException, data: PubKeyResponse)
        => void): Promise<PubKeyResponse> {
        return this.connection.get(this.url, CORE_PUB_KEY, undefined, callback);
    }

    public setPubKey(pubkey: string,
                     callback?: (error: CoreExceptions.RestException, data: PubKeyResponse)
                         => void): Promise<PubKeyResponse> {
        return this.connection.put(this.url, CORE_PUB_KEY, { certificate: pubkey }, undefined, callback);
    }

    // TODO implementation check
    public updateContainerConfig(config: any, callback?: (error: CoreExceptions.RestException, data: any) => void): Promise<any> {
        return this.connection.post(this.url, CORE_CONTAINERS, config, undefined, callback);
    }}
