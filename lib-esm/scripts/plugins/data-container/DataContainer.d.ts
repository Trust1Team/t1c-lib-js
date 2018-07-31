import { AbstractDataContainer } from './DataContainerModel';
import { T1CLibException } from '../../core/exceptions/CoreExceptions';
import { GenericContainer } from '../GenericContainer';
import { LocalConnection } from '../../core/client/Connection';
export declare class DataContainer extends GenericContainer implements AbstractDataContainer {
    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection);
    create(data: any, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
    read(id?: string, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
    update(id: string, data: any, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
    delete(id: string, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
}
