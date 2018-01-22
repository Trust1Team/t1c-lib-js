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


class ListFilesRequest {
    constructor(public path: string, public extensions: string[]) {}
}

class File {
    constructor(public extension: string,
                public name: string,
                public path: string,
                public size: number,
                public last_modification_time: string) {}
}

class FileListResponse extends T1CResponse {
    constructor(public data: File[], public success: boolean) {
        super(success, data);
    }
}