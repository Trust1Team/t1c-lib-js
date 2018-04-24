import { RestException } from '../../core/exceptions/CoreExceptions';
export { AbstractDataContainer };
interface AbstractDataContainer {
    create(data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
    read(id?: string, callback?: (error: RestException, data: any) => void): Promise<any>;
    update(id: string, data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
    delete(id: string, callback?: (error: RestException, data: any) => void): Promise<any>;
}
