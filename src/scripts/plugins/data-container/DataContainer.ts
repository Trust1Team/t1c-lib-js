/**
 * @author Maarten Somers
 * @since 2018
 */

import { AbstractDataContainer } from './DataContainerModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import {GenericContainer} from '../GenericContainer';
import {LocalConnection} from '../../core/client/Connection';


export class DataContainer extends GenericContainer implements AbstractDataContainer {
    // constructor


    constructor(baseUrl: string, containerUrl: string, connection: LocalConnection) {
        super(baseUrl, containerUrl, connection, containerUrl);
    }

    public create(data: any, callback?: (error: RestException, data: any) => void): Promise<any> {
        // put
        return this.connection.put(this.baseUrl, this.containerSuffix(), data, undefined, undefined, callback);
    }

    public read(id?: string, callback?: (error: RestException, data: any) => void): Promise<any> {
        // get
        return this.connection.get(this.baseUrl, this.containerSuffix(id), undefined, undefined, callback);
    }

    public update(id: string, data: any, callback?: (error: RestException, data: any) => void): Promise<any> {
        // post
        return this.connection.post(this.baseUrl, this.containerSuffix(), data, undefined, undefined, callback);
    }

    public delete(id: string, callback?: (error: RestException, data: any) => void): Promise<any> {
        // delete
        return this.connection.delete(this.baseUrl, this.containerSuffix(id), undefined, undefined, callback);
    }
}
