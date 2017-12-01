/**
 * @author Maarten Somers
 * @since 2017
 */
import { GenericContainer } from '../smartcards/Card';
import { AbstractFileExchange, FileListResponse, ListFilesRequest } from './FileExchangeModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../core/service/CoreModel';

export { FileExchange };


class FileExchange extends GenericContainer implements AbstractFileExchange {
    static FOLDER = '/folder';
    static LIST = '/list';


    public listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.LIST), data, undefined, callback);
    }


    public setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), undefined, callback);
    }
}
