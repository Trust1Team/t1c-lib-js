import { T1CLibException } from '../../core/exceptions/CoreExceptions';


export interface AbstractDataContainer {
    // support all CRUD operations
    create(data: any, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
    read(id?: string, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
    update(id: string, data: any, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
    delete(id: string, callback?: (error: T1CLibException, data: any) => void): Promise<any>;
}
