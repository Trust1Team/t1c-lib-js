/**
 * @author Maarten Somers
 * @since 2017
 */
import { GenericContainer } from '../smartcards/Card';
import { AbstractFileExchange, FileListResponse, ListFilesRequest } from './FileExchangeModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../core/service/CoreModel';
import * as Bluebird from 'bluebird';

export { FileExchange };


class FileExchange extends GenericContainer implements AbstractFileExchange {
    static DOWNLOAD = '/download';
    static FOLDER = '/folder';
    static UPLOAD = '/upload';


    public downloadFile(path: string, file: ArrayBuffer, fileName: string): Bluebird<DataResponse> {
        return this.connection.putFile(this.baseUrl, this.containerSuffix(FileExchange.DOWNLOAD), { path, file, fileName }, undefined);
    }


    public listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Bluebird<FileListResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), data, undefined, callback);
    }


    public setFolder(callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), undefined, callback);
    }


    public uploadFile(path: string): Bluebird<string> {
        return this.connection.requestFile(this.baseUrl, this.containerSuffix(FileExchange.UPLOAD), { path });
    }
}
