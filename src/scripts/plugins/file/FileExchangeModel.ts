/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse, T1CResponse } from '../../core/service/CoreModel';

export { AbstractFileExchange, FileListResponse, ListFilesRequest };


interface AbstractFileExchange {
    listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse>;
    uploadFile(path: string): Promise<string>;
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