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