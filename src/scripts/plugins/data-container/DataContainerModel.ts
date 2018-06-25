/**
 * @author Maarten Somers
 * @since 2018
 */

import { RestException } from '../../core/exceptions/CoreExceptions';


export interface AbstractDataContainer {
    // support all CRUD operations
    create(data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
    read(id?: string, callback?: (error: RestException, data: any) => void): Promise<any>;
    update(id: string, data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
    delete(id: string, callback?: (error: RestException, data: any) => void): Promise<any>;
}