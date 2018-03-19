/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse, T1CResponse } from '../../core/service/CoreModel';
import * as Bluebird from 'bluebird';

export { AbstractFileExchange, FileListResponse, ListFilesRequest };


interface AbstractFileExchange {
    listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Bluebird<FileListResponse>;
    setFolder(callback?: (error: RestException, data: DataResponse) => void): Bluebird<DataResponse>;
    downloadFile(path: string, file: ArrayBuffer, fileName: string): Bluebird<DataResponse>;
    uploadFile(path: string): Bluebird<string>;
}


interface ListFilesRequest {
    path: string,
    extensions: string[]
}

interface File {
    extension: string,
    last_modification_time: string,
    name: string,
    path: string,
    size: number
}

interface FileListResponse extends T1CResponse {
    data: File[]
}