/**
 * @author Maarten Somers
 * @since 2017
 */
import { GenericContainer } from '../smartcards/Card';
import { AbstractFileExchange, FileListResponse, ListFilesRequest } from './FileExchangeModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../core/service/CoreModel';
import {Any} from "asn1js";

export { FileExchange };


class FileExchange extends GenericContainer implements AbstractFileExchange {
    static DOWNLOAD = '/download';
    static FOLDER = '/folder';
    static UPLOAD = '/upload';


    public downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse> {
        return this.connection.putFile(this.baseUrl, this.containerSuffix(FileExchange.DOWNLOAD), { path, file, fileName }, undefined);
    }


    public listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), data, undefined, undefined, callback);
    }


    public setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), undefined, undefined, callback);
    }


    public uploadFile(path: string): Promise<ArrayBuffer> {
        return this.connection.requestFile(this.baseUrl, this.containerSuffix(FileExchange.UPLOAD), { path });
    }
}
