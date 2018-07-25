import { AbstractDataContainer } from './DataContainerModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import { GenericContainer } from '../GenericContainer';
export declare class DataContainer extends GenericContainer implements AbstractDataContainer {
    create(data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
    read(id?: string, callback?: (error: RestException, data: any) => void): Promise<any>;
    update(id: string, data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
    delete(id: string, callback?: (error: RestException, data: any) => void): Promise<any>;
}
